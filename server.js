console.log("[BOT] Starting...");

// Import modules
const discord = require('discord.js');
const discordClient = new discord.Client();

const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const math = require('mathjs');
const ytdl = require('ytdl-core');

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
let recievedCommandInTheLastMinute = false;
const WEEK_DAYS = ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"];
const WEEK_DAYS_SHORT = ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"];
const RED = 16720418;
const BLUE = 1616639;
const GREEN = 4521796;

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
            usersObj[author_id].username = author; // Set the username jic it changed...
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
            recievedCommandInTheLastMinute = true;

            let commandMessageArray = msg.content.split(" "); // Split words of the message into an array

            let command = commandMessageArray[0].slice(1); // Extracts the command from the message

            console.log(`[COMMAND] Recieved command COMMAND(${command}) ARRAY(${JSON.stringify(commandMessageArray)})`);

            if (msg.content.slice(1).match(/^\d/)) { // If the command is: !(0123456789) take it as a math problem
                try {
                    let problem = msg.content.slice(1);
                    let result = math.eval(problem);
                    msg.reply({
                        "embed": {
                            "title": "Vypočítaný príkad",
                            "color": BLUE,
                            "fields": [
                                {
                                    "name": "Príklad: " + problem,
                                    "value": "Výsledok: **" + result + "**"
                                }
                            ]
                        }
                    });
                }catch(e){
                    msg.reply({
                        "embed": {
                            "title": "Nesprávny príklad",
                            "color": RED,
                            "description": 'Neviem vypočítať tento príklad :('
                        }
                    });
                }
                return; // We don't need anything else.
            }

            switch (command) {
                case "ping":
                    msg.reply("Pong!");
                    break;
                case "info":
                case "about":
                    msg.reply(`
                        Čaj-ministrátor - Bot ktorý sa stará o adlerákov\n
                        Serverový čas: ${new Date().toString()}
                    `);
                    break;
                case "spravnyprikaz":
                    msg.reply({
                        "embed": {
                            "title": "Si myslíš, že si múdry, čo?",
                            "color": RED,
                            "description": 'Hahahahahahahahahahahahaha...strašne vtipné normálne sa smejem XD'
                        }
                    });
                    break;
                case "excuse":
                case "excuseme":
                case "excusewtf":
                case "wtf":
                    msg.reply({
                        "files": ["https://i.kym-cdn.com/entries/icons/original/000/026/913/excuse.jpg"]
                    });
                    break;
                case "help":
                case "pomoc":
                case "prikazy":
                    helpCommand(msg, commandMessageArray);
                    break;

                case "alecau":
                    if (new Date().getDay() == 3) {
                        msg.reply(`AAALLEEE ČAAAAAUUU!!! Dneska je **Streda zaMEMOVAŤ TREBA**`);
                    }else{
                        msg.reply(`AAALLEEE ČAAAAAUUU!!! Dneska je **${WEEK_DAYS[new Date().getDay()]}**`);
                    }
                    break;
                case "pridat":
                case "add":
                    if (!commandMessageArray[1] || !commandMessageArray[2]) {
                        msg.reply({
                            "embed": {
                                "title": "Nesprávny formát príkazu !pridat",
                                "color": RED,
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
                                "color": RED,
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
                            "color": GREEN,
                            "description": `**${WEEK_DAYS_SHORT[dateObj.getDay()]} ${dateObj.getDate()}.${dateObj.getMonth()+1}** - ${eventName}\n`
                        }
                    });
                    break;
                case "eventy":
                case "events":
                    events.sort(compare);
                    let oldEventContentToDelete = false;

                    let todayDateString = `${new Date().getDate()}.${new Date().getMonth()+1}.${new Date().getFullYear()}`;
                    
                    let tomorrowDateObj = new Date(new Date().getTime() + 86400000);
                    let tomorrowDateString = `${tomorrowDateObj.getDate()}.${tomorrowDateObj.getMonth()+1}.${tomorrowDateObj.getFullYear()}`;
                    
                    let eventsFields = [
                        {
                            name: `***Dnes (${todayDateString})***`,
                            value: "Nič"
                        },
                        {
                            name: `***Zajtra (${tomorrowDateString})***`,
                            value: "Nič"
                        }
                    ];

                    events.forEach((e)=>{
                        if (e.time < new Date().getTime()) { // If the event is in the past
                            oldEventContentToDelete = e.content
                            return;
                        }
                        let eventDate = new Date(e.time);

                        let eventDateString = `${eventDate.getDate()}.${eventDate.getMonth()+1}.${eventDate.getFullYear()}`;

                        if (eventDateString == todayDateString) {
                            if (eventsFields[0].value == "Nič") {
                                eventsFields[0].value = "";
                            }
                            eventsFields[0].value += `• ${e.content}\n`;

                        }else if (eventDateString == tomorrowDateString) {
                            if (eventsFields[1].value == "Nič") {
                                eventsFields[1].value = "";
                            }
                            eventsFields[1].value += `• ${e.content}\n`;

                        }else{
                            let eventFieldDate = `***${WEEK_DAYS[eventDate.getDay()]} ${eventDateString}***`;

                            let eventField = eventsFields.find(obj => obj.name == eventFieldDate);

                            if (eventField) {
                                eventField.value += `• ${e.content}\n`;
                            }else{
                                eventsFields.push({
                                    name: eventFieldDate,
                                    value: "• " + e.content + "\n"
                                })
                            }
                        }
                    });
                    
                    msg.reply({
                        "embed": {
                            "title": "Nasledujúce eventy",
                            "color": BLUE,
                            "fields": eventsFields
                        }
                    });

                    if (oldEventContentToDelete) {
                        events = events.filter((obj)=>{
                            return obj.content !== oldEventContentToDelete
                        });
                        saveData();
                    }

                    break;
                case "vymazat":
                case "remove":
                case "delete":
                    let allowed = true;
                    try{
                        if (!(msg.channel.name == "admin-commandy")) {
                            allowed = false;
                            msg.reply({
                                "embed": {
                                    "title": "Tento príkaz sa môže vykonávať len v #admin-commandy",
                                    "color": RED
                                }
                            });
                            return;
                        }
                    }catch(e){
                        allowed = false;
                        msg.reply({
                            "embed": {
                                "title": "Tento príkaz sa môže vykonávať len v #admin-commandy",
                                "color": RED
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
                                "color": GREEN
                            }
                        });
                        setTimeout(()=>{
                            loadData();
                        }, 2500) // Update data in 5 seconds
                    }else{
                        msg.reply({
                            "embed": {
                                "title": "Event sa nenašiel",
                                "color": RED
                            }
                        });
                    }
                    break;

                case "testread":
                    switch (commandMessageArray[1]) {
                        case "events":
                            loadData();
                            msg.reply({
                                "embed": {
                                    "title": "JSON dump of events object",
                                    "color": BLUE,
                                    "description": JSON.stringify(events) + "\n**Warning! Event data will load after this message!**"
                                }
                            });
                            break;
                        case "users":
                            msg.reply({
                                "embed": {
                                    "title": "JSON dump of users object",
                                    "color": BLUE,
                                    "description": JSON.stringify(usersObj)
                                }
                            });
                            break;
                        default:
                            msg.reply({
                                "embed": {
                                    "title": "Invalid attr",
                                    "color": RED,
                                    "description": "Enter valid attr for testread command."
                                }
                            });
                    }
                    break;

                default: // If there is a command sent but it is invalid fall back to this
                    msg.reply({
                        "embed": {
                            "title": "Nesprávny príkaz",
                            "color": RED,
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
    
        console.log("[INTERVAL_MINUTE] Setting activity...");
        if (recievedCommandInTheLastMinute) {
            discordClient.user.setStatus('online');
            recievedCommandInTheLastMinute = false;
        }else{
            discordClient.user.setStatus('idle');
        }

        console.log("[INTERVAL_MINUTE] Complete.");
    }, 60000);
});

let helpCommand = (msg, commandMessageArray)=> {
    if (commandMessageArray[1]) {
        switch (commandMessageArray[1]) {
            case "ping":
                msg.reply({
                    "embed": {
                        "title": "!ping",
                        "color": BLUE,
                        "description": "Odpovie Pong!\nNemá žiadny iný účel ako len testovať či bot funguje a príjma príkazy."
                    }
                });
                break;

            case "info":
            case "about":
                msg.reply({
                    "embed": {
                        "title": "!info/about",
                        "color": BLUE,
                        "description": "Odpovie základnými údajmi o sebe."
                    }
                });
                break;

            case "help":
            case "pomoc":
            case "prikazy":
                msg.reply({
                    "embed": {
                        "title": "!help/pomoc/prikazy [príkaz]",
                        "color": BLUE,
                        "description": "Zobrazí príkazy ktoré bot príjma.\nPokiaľ sa použije *!help [príkaz]* tak sa zobrazia informácie o tom príkaze\n\n**Príklady**\n*!help pridat*\n*!help eventy*\n*!help ping*"
                    }
                });
                break;

            case "pridat":
            case "add":
                msg.reply({
                    "embed": {
                        "title": "!pridat/add <dátum> <event>",
                        "color": BLUE,
                        "description": "Pridá event na dátum.\n\n**Príklady**\n*!pridat 23.10  Pisomka z matiky z mnozin*\n*!pridat 6.4.2018 Adlerka day*\n*!pridat 09.08 Ja nevim co*"
                    }
                });
                break;

            case "vymazat":
            case "remove":
            case "delete":
                msg.reply({
                    "embed": {
                        "title": "!vymazat/remove/delete <event>",
                        "color": BLUE,
                        "description": "Vymaže daný event.\n*Zatiaľ ho môžu používať len admini ale plánujem pridať možnosť vymazať svoj vlastný event.*\n\n**Príklady**\n*!vymazat Pisomka z matiky z mnozin*\n*!remove Adlerka day*\n*!delete Ja nevim co*"
                    }
                });
                break;

            case "eventy":
            case "events":
                msg.reply({
                    "embed": {
                        "title": "!eventy/events",
                        "color": BLUE,
                        "description": "Zobrazí následujúce eventy.\n*Plánujem pridat nieco ako !eventy zajtra' aby vypísalo eventy len na zajtra ale zatial to funguje ok aj bez toho takžeee....*"
                    }
                });
                break;
        }
    }else{
        msg.reply({
            "embed": {
                "title": "Čaj-ministrátor príkazy:",
                "color": BLUE,
                "description": `
                    **!ping** - Odpovie Pong!
                    **!info** - Odpovie základnými údajmi o sebe
                    **!help [príkaz]** - Zobrazí príkazy ktoré bot príjma
                    **!pridat/add <dátum> <event>** - Pridá event
                    **!vymazat/remove/delete** - Odstráni event
                    **!eventy/events** - Vypíše nasledujúce eventy
                    **!<príklad>** - Vpočíta príklad

                    *Pre viac informácií o príkaze napíšte napr.: !help eventy*
                    *Ak chcete niečo pridať/zmeniť napíšte do bot-testing*
                `
            }
        });
    }
}

// ED
discordClient.login(discordBotCongig.token);
console.log("[BOT] Started.");