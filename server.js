console.log("[BOT] Starting...");

// Import modules
const discord = require('discord.js');
const discordClient = new discord.Client();
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

// Configuration
const discordBotCongig = {
    token: process.env.DISCORD_BOT_TOKEN,
    prefix: "!" // Prefix for the bot commands
};
const TIMEOUT_INCREMENT = 6.5; // Amount to increment by when the user sends a message
const TIMEOUT_DIVIDER = 1.1; // Each second : [user's timeout / TIMEOUT_DIVIDER]
const TIMEOUT_TRIGGER = 25; // When timeout reaches this amount, bot gets triggered and sends message to the admin
const TIMEOUT_BEFORE_REREPORT = 5 // How many minutes must elapse before the user can be reported again
const ADMIN_USERID = process.env.ADMIN_USERID; // User id of the admin user...
const EVENT_FILENAME = "events.json";

const DATABASE_URI = process.env.DATABASE_URI;



// Global veriables definition
let usersObj = {};
let adminUser;
let events = [];

// Function delcarations
let loadData = ()=>{ // Loads data from the DB to the memory
    MongoClient.connect(DATABASE_URI, (err, client) => {
        console.log("[LOAD] Loading events...");
        if (err) return console.error(err)
        let database = client.db('caj-ministrator');
        database.collection("data").find({}).toArray((err, docs)=> {
            if (err) {console.log(err); return;}
            console.log(`[DEBUG] DOCS(${JSON.stringify(docs)})`);
            let doc = docs[0];
            console.log(`[DEBUG] DOC(${JSON.stringify(doc)})`);
            events = doc.events; 
            console.log(`[DEBUG] DOCS(${JSON.stringify(events)})`);
            console.log("[LOAD] Events loaded.");
            client.close();
        });
    });
}
let saveData = ()=>{
    console.log("[SAVE] Saving events...");
    MongoClient.connect(DATABASE_URI, (err, client) => {
        if (err) return console.error(err)
        let database = client.db('caj-ministrator');
        
        // Replace the object with your field objectid...because it won't work otherwise...
        database.collection("data").update({_id: ObjectId("5bf58c9f42400f046cb2d2c1")}, {
            $set: {
                "events": events
            }
        });
        console.log("[SAVE] Events saved.");
    });
}


// Discord client init
discordClient.on('ready', ()=>{
    console.log("[BOT] Ready.");
    console.log("[BOT] Calling loadData...");

    loadData();

    discordClient.fetchUser(ADMIN_USERID).then((user)=>{ // Fetch the admin user
        adminUser = user; // Set the admin user as an...emm...admin user?
        console.log("[BOT] Fetched the admin user");
    });

    discordClient.on('message', (msg)=> { // When there is any message the bot can see
        if (msg.author.bot) { // We check if the author of the message isn't a bot
            console.log("[IGNORE] Bot message has been ignored.");
            return; // If they are, we just ignore them.
        }

        // Get some shit from the msg object
        let author_id = msg.author.id;
        let author = msg.author.username + "#" + msg.author.discriminator;
        let message = msg.content;

        let userObj = usersObj[author_id]; // Get the author from the usersObj

        if (userObj) { // If the author is already in the usersObj
            usersObj[author_id].author = author; // Set the username jic it changed...
            usersObj[author_id].timeout += TIMEOUT_INCREMENT; // We just increment the timeout
            usersObj[author_id].mpm++; // and also increment the messages per minute

            if (usersObj[author_id].timeOfFirstMinuteMessage < 1) {
                usersObj[author_id].timeOfFirstMinuteMessage = new Date().getTime();
            }
        }else{ // If not we create an object with author's id inside the usersObj
            usersObj[author_id] = {
                username: author,
                mpm: 1, // Messages per minute
                timeOfFirstMinuteMessage: 0,
                timeout: TIMEOUT_INCREMENT, // And increment their timeout
                alreadyReportedTimeout: 0 // 0=not reported yet.
            };
        }

        console.log(`[MESSAGE] Recieved message. AUTHOR(${author} ### ${author_id}) CONTENT(${message}) TIMEOUT(${usersObj[author_id].timeout})`);

        // Detect if the message is a bot command
        if (message.startsWith(discordBotCongig.prefix)) {
            let commandMessageArray = msg.content.split(" "); // Split words of the message into an array

            let command = commandMessageArray[0].slice(1); // Extracts the command from the message

            console.log(`[COMMAND] Recieved command COMMAND(${command}) ARRAY(${JSON.stringify(commandMessageArray)})`)
            switch (command) {
                case "ping":
                    msg.reply("Pong!");
                    break;
                case "info":
                    msg.reply("Čaj-ministrátor - Bot ktorý sa stará o adlerákov");
                    break;
                case "pridat":
                    if (!commandMessageArray[1] || !commandMessageArray[2]) {
                        msg.reply("**Nesprávny formát príkazu.** Použitie: !pridat [datum] [nazov eventu]\n[datum] 12.09 / 12.9 / 12.09.2018 / 12.9.2018");
                        break;
                    }

                    let dateObj = new Date(commandMessageArray[1] + " 12:00:00");
                    if (dateObj == "Invalid Date") {
                        msg.reply("**Nesprávny formát dátumu.** Správny formát: 12.09 / 12.9 / 12.09.2018 / 12.9.2018");
                        break;
                    }
                    if (dateObj.getFullYear() == 2001) {
                        let currentYear = new Date().getFullYear();
                        dateObj = new Date(commandMessageArray[1] + currentYear + " 12:00:00");
                    }

                    // This is ugly. Yes, I know. Don't judge me.
                    let eventName = commandMessageArray.slice(commandMessageArray.indexOf(commandMessageArray.split(" ", 2)[1]) + commandMessageArray.split(" ", 2)[1].length + 1);

                    events.push({
                        time: dateObj.getTime(),
                        content: eventName
                    });

                    saveData();

                    msg.reply("Event bol pridaný.");
                    break;
                case "testread":
                    loadData();
                    msg.reply("JSON dump of events file:" + JSON.stringify(events));
                    break;
                case "testwrite":
                    events.push(new Date().getTime());
                    saveData();
                    msg.reply("File written.");
                    break;
                case "nukethefile":
                    if (commandMessageArray[1] == ADMIN_USERID) {
                        events = {};
                        saveData();
                        msg.reply("Events file reset.");
                    }else{
                        msg.reply("Not gonna do that.");
                    }
                    break;
            }

        }
    });

    console.log("[BOT] Setting activity...");
    discordClient.user.setActivity('your every message', { type: 'WATCHING' });

    setInterval(()=>{ // Does this every second
        let users = Object.keys(usersObj); // Gets keys (users) of the usersObj
        for (user of users) { // For each user
            if (usersObj[user].timeout > TIMEOUT_TRIGGER) {
                if(!usersObj[user].alreadyReportedTimeout > 0) { // If the user is not already to be reported AND is not already reported
                    let username = usersObj[user].username;
    
                    console.log(`[ADMIN_SEND] Reported user (${username}).`);
                    adminUser.send(`U **${username}** bolo detekované spamovanie. Odoslal **${usersObj[user].mpm}** správ za posledných ${Math.floor((new Date().getTime() - usersObj[user].timeOfFirstMinuteMessage) / 1000)} sekúnd.`);
    
                    usersObj[user].alreadyReportedTimeout = TIMEOUT_BEFORE_REREPORT;
                }
            }
            usersObj[user].timeout = usersObj[user].timeout / TIMEOUT_DIVIDER // Divides their timeout by const TIMEOUT_DIVIDER
        }
    }, 1000);
    
    setInterval(()=>{ // Does this every minute
        console.log("[INTERVAL_MINUTE] Started.");
    
        let users = Object.keys(usersObj); // Gets keys (users) of the usersObj
    
        console.log("[INTERVAL_MINUTE] Setting MPMs and TOLMMs to 0...");
        // Take care of resetting all MPMs TOLMMs to 0
        for (user of users) { // For each user
            usersObj[user].mpm = 0 // Sets their mpm back to 0
            usersObj[user].timeOfFirstMinuteMessage = 0;
        }
    
        console.log("[INTERVAL_MINUTE] Decrementing already reported timeouts...");
        // Decrement the timeout of each user in alreadyReported. Remove if < 1
        for (user of users) { // For each user
            if (usersObj[user].alreadyReportedTimeout < 1) {continue;}
            let username = usersObj[user].username;
    
            console.log(`[INTERVAL_MINUTE] Decreased report timeout for user (${username}) from (${usersObj[user].alreadyReportedTimeout}).`);
    
            usersObj[user].alreadyReportedTimeout--; // Decrement report timeout
    
            if (usersObj[user].alreadyReportedTimeout < 1) {
                console.log(`[INTERVAL_MINUTE] Report timeout expired for user (${username}).`);
            }
        }
    
        console.log("[INTERVAL_MINUTE] Complete.");
    }, 60000);
});

// ED
discordClient.login(discordBotCongig.token);
console.log("[BOT] Started.");