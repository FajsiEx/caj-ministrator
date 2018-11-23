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
const WEEK_DAYS = ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"];
const WEEK_DAYS_SHORT = ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"];

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

function compare(a,b) {
    if (a.time < b.time) {return -1;}
    if (a.time > b.time) {return 1;}
    return 0;
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

            console.log(`[COMMAND] Recieved command COMMAND(${command}) ARRAY(${JSON.stringify(commandMessageArray)})`);

            if (msg.content.slice(1).match(/^\d/)) { // If the command is: !(0123456789) take it as a math problem
                msg.reply({
                    "embed": {
                        "title": "Vypočítaný príkad",
                        "color": 1616639,
                        "fields": [
                            {
                                "name": "Príklad: " + msg.content.slice(1),
                                "value": "Výsledok: **" + eval(msg.content.slice(1)) + "**"
                            }
                        ]
                    }
                });
                return; // We don't need anything else.
            }

            switch (command) {
                case "ping":
                    msg.reply("Pong!");
                    break;
                case "info":
                    msg.reply(`
                        Čaj-ministrátor - Bot ktorý sa stará o adlerákov\n
                        Serverový čas: ${new Date().toString()}
                    `);
                    break;
                case "spravnyprikaz":
                    msg.reply({
                        "embed": {
                            "title": "Si myslíš, že si múdry, čo?",
                            "color": 16720418,
                            "description": 'Hahahahahahahahahahahahaha...strašne vtipné normálne sa smejem :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand: :smile~1: :ok_hand:'
                        }
                    });
                case "help":
                    msg.reply({
                        "embed": {
                            "title": "Čaj-ministrátor príkazy:",
                            "color": 1616639,
                            "fields": [
                                {
                                    "name": "**!ping**",
                                    "value": "Odpovie Pong! (pre testy či je bot funguje)"
                                },
                                {
                                    "name": "**!info**",
                                    "value": "Odpovie základnými údajmi o sebe"
                                },
                                {
                                    "name": "**!pridat <dátum> <event>**",
                                    "value": "Pridá event\n*Príklady použitia:*\n!pridat 23.10 Pisomka z matiky z mnozin\n!pridat 6.4.2018 Adlerka day\n!pridat 09.08 Ja nevim co"
                                },
                                {
                                    "name": "**!eventy**",
                                    "value": "Vypíše nasledujúce eventy\n*Poznámka: Plánujem pridat nieco ako '!eventy zajtra' aby vypisalo eventy len na zajtra ale zatial to funguje ok aj bez toho takžeee....*"
                                },
                                {
                                    "name": "**!<príklad>**",
                                    "value": "Vypočíta príklad\n*Príklady použitia:*\n!2+2 (4)\n!6*6 (36)\n!33432*63437+53434-16434/22 (2120878471)"
                                },
                                {
                                    "name": "**!alecau**",
                                    "value": "AAALLEEE ČAAAAAUUU!!!"
                                },
                                {
                                    "name": "**Nejaky další príkaz ktorý chcete**",
                                    "value": "Napíšte to do #bot-testing"
                                }
                            ]
                        }
                    });



                    break;
                case "alecau":
                    if (new Date().getDay() == 3) {
                        msg.reply(`AAALLEEE ČAAAAAUUU!!! Dneska je **Streda zaMEMOVAŤ TREBA**`);
                    }else{
                        msg.reply(`AAALLEEE ČAAAAAUUU!!! Dneska je **${WEEK_DAYS[new Date().getDay()]}**`);
                    }
                    break;
                case "pridat":
                    if (!commandMessageArray[1] || !commandMessageArray[2]) {
                        msg.reply({
                            "embed": {
                                "title": "Nesprávny formát príkazu !pridat",
                                "color": 16720418,
                                "description": 'Použitie: !pridat [datum] [nazov eventu]\n**Príklady:**\n!pridat 23.10 Pisomka z matiky z mnozin\n!pridat 6.4.2018 Adlerka day\n!pridat 09.08 Ja nevim co'
                            }
                        });

                        break;
                    }
                    

                    let dateParameter = commandMessageArray[1].split(".").reverse().join(".");
                    let dateObj = new Date(dateParameter + " 20:00:00");
                    if (dateObj == "Invalid Date") {
                        msg.reply({
                            "embed": {
                                "title": "Nesprávny formát dátumu",
                                "color": 16720418,
                                "description": 'Použitie: !pridat [datum] [nazov eventu]\n**Príklady:**\n!pridat 23.10 Pisomka z matiky z mnozin\n!pridat 6.4.2018 Adlerka day\n!pridat 09.08 Ja nevim co'
                            }
                        });

                        break;
                    }
                    if (dateObj.getFullYear() == 2001) {
                        let currentYear = new Date().getFullYear();
                        dateObj = new Date(dateParameter + "." + currentYear + " 20:00:00");
                    }

                    // This is ugly. Yes, I know. Don't judge me.
                    let eventName = msg.content.slice(msg.content.indexOf(msg.content.split(" ", 2)[1]) + msg.content.split(" ", 2)[1].length + 1);

                    events.push({
                        time: dateObj.getTime(),
                        user_id: author_id,
                        user: author,
                        content: eventName
                    });

                    saveData();

                    msg.reply({
                        "embed": {
                            "title": "Event bol pridaný",
                            "color": 4521796,
                            "description": `**${WEEK_DAYS_SHORT[dateObj.getDay()]} ${dateObj.getDate()}.${dateObj.getMonth()+1}** - ${eventName}\n`
                        }
                    });
                    break;
                case "eventy":
                    events.sort(compare);
                    let eventsTodayString = "Nič";
                    let eventsTomorrowString = "Nič";
                    let eventsString = "Nič";

                    
                    let todayDateString = `${new Date().getDate()}.${new Date().getMonth()+1}.${new Date().getFullYear()}`;
                    
                    let tomorrowDateObj = new Date(new Date().getTime() + 86400000);
                    let tomorrowDateString = `${tomorrowDateObj.getDate()}.${tomorrowDateObj.getMonth()+1}.${tomorrowDateObj.getFullYear()}`;
                    
                    let eventsFields = [
                        {
                            name: `Dnes (${todayDateString})`,
                            value: ""
                        },
                        {
                            name: `Zajtra (${tomorrowDateString})`,
                            value: ""
                        }
                    ];

                    events.forEach((e)=>{
                        if (e < new Date().getTime()) { // If the event is in the past
                            delete e;
                            return;
                        }
                        let eventDate = new Date(e.time);

                        let eventDateString = `${eventDate.getDate()}.${eventDate.getMonth()+1}.${eventDate.getFullYear()}`;

                        if (eventDateString == todayDateString) {
                            if (eventsTodayString == "Nič") {
                                eventsTodayString = "";
                            }
                            eventsTodayString += `**${WEEK_DAYS_SHORT[eventDate.getDay()]} ${eventDate.getDate()}.${eventDate.getMonth()+1}** - ${e.content}\n`;
                        }else if (eventDateString == tomorrowDateString) {
                            if (eventsTomorrowString == "Nič") {
                                eventsTomorrowString = "";
                            }
                            eventsTomorrowString += `**${WEEK_DAYS_SHORT[eventDate.getDay()]} ${eventDate.getDate()}.${eventDate.getMonth()+1}** - ${e.content}\n`;
                        }else{
                            if (eventsString == "Nič") {
                                eventsString = "";
                            }
                            eventsString += `**${WEEK_DAYS_SHORT[eventDate.getDay()]} ${eventDate.getDate()}.${eventDate.getMonth()+1}** - ${e.content}\n`;
                        }
                    });

                    msg.reply({
                        "embed": {
                            "title": "Nasledujúce eventy",
                            "color": 1616639,
                            "fields": [
                                {
                                    "name": "***Dnes***",
                                    "value": eventsTodayString
                                },
                                {
                                    "name": "***Zajtra***",
                                    "value": eventsTomorrowString
                                },
                                {
                                    "name": "***Ostatné***",
                                    "value": eventsString
                                },
                            ]
                        }
                    });

                    break;
                case "vymazat":
                    let allowed = true;
                    try{
                        if (!(msg.channel.name == "admin-commandy")) {
                            allowed = false;
                            msg.reply({
                                "embed": {
                                    "title": "Tento príkaz sa môže vykonávať len v #admin-commandy",
                                    "color": 16720418
                                }
                            });
                            return;
                        }
                    }catch(e){
                        allowed = false;
                        msg.reply({
                            "embed": {
                                "title": "Tento príkaz sa môže vykonávať len v #admin-commandy",
                                "color": 16720418
                            }
                        });
                        return;
                    }
                    if (!allowed) {return;} // JIC
                    
                    loadData();
                    let i=0;
                    let eventContentToDelete = msg.content.slice(9); // gets rid of the !vymazat
                    let eventIndexToDelete = false;

                    console.log(`[DEBUG] ECTD(${eventContentToDelete})`);

                    events.forEach((e)=>{
                        if (eventIndexToDelete) {
                            return; // If the index of the wannabe deleted event is found we just skip past the other events
                        }
                        console.log(`[DEBUG] EC(${e.content}) i(${i}) EQ(${e.content == eventContentToDelete})`);
                        if (e.content == eventContentToDelete) {
                            eventIndexToDelete = i;
                        }
                        i++;
                    });

                    console.log(`[DEBUG] EITD${eventIndexToDelete})`);
                    if (!(eventIndexToDelete === false)) { // If the index was not not found
                        events.splice(eventIndexToDelete,1);
                        saveData();
                        msg.reply({
                            "embed": {
                                "title": "Event bol vymazaný. Zmeny sa môžu prejaviť až o pár sekúnd!",
                                "color": 4521796
                            }
                        });
                        setTimeout(()=>{
                            loadData();
                        }, 2500) // Update data in 5 seconds
                    }else{
                        msg.reply({
                            "embed": {
                                "title": "Event sa nenašiel",
                                "color": 16720418
                            }
                        });
                    }
                    break;
                case "testread":
                    loadData();
                    msg.reply("JSON dump of events file:" + JSON.stringify(events) + "\n**Warning! Event data will load after this message!**");
                    break;
                default: // If there is a command sent but it is invalid fall back to this
                    msg.reply({
                        "embed": {
                            "title": "Nesprávny príkaz",
                            "color": 16720418,
                            "description": `${discordBotCongig.prefix + command} je niečo ako správny príkaz, ale nie.\nPre list príkazov **!help**`
                        }
                    });

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