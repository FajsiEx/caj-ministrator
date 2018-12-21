console.log("[BOT] Starting...");

// Import modules
const discord = require('discord.js');
const discordClient = new discord.Client();

// Configuration
const discordBotCongig = {
    token: process.env.DISCORD_BOT_TOKEN,
    prefix: "!" // Prefix for the bot commands
};
const ADMIN_USERID = process.env.ADMIN_USERID; // User id of the admin user...
const DEV_USERID = 342227744513327107;

// Global veriables definition
let starting = true;
let onlineMsgSent = false;

const COLORS = require("./modules/consts").COLORS

require('./modules/globalVariables').init();

const msgHandler = require('./modules/msgHandler');
const globalVariables = require("./modules/globalVariables");

discordClient.on('error', console.error);

// GREETING
discordClient.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find(ch => ch.name === 'talk');
    if (!channel) {return;}
    channel.send(`Vítaj, ${member}! Nezabudni si dať svoje IRL meno ako nickname.`);
});

// Discord client init
discordClient.on('ready', ()=>{
    console.log("[READY] Ready.");
    
    discordClient.fetchUser(ADMIN_USERID).then((user)=>{ // Fetch the admin user
        adminUser = user; // Set the admin user as an...emm...admin user?
        console.log("[BOT] Fetched the admin user");
    });

    discordClient.fetchUser(DEV_USERID).then((user)=>{ // Fetch the admin user
        devUser = user; // Set the admin user as an...emm...admin user?
        console.log("[BOT] Fetched the dev user");
    });

    if(!onlineMsgSent) {
        onlineMsgSent = true;
        console.log("[BOT] Sending online msg...");
        discordClient.channels.get('514873440159793167').send({
            "embed": {
                "title": "Čaj-bot je online",
                "color": COLORS.GREEN
            }
        });
    }
});

discordClient.on('message', (msg)=>{
    msgHandler(msg, discordClient);
});


// Status message.
setTimeout(()=>{
    starting = false;
    discordClient.user.setStatus('online');
    discordClient.user.setActivity('your every message', { type: 'WATCHING' });
}, 15000);

setInterval(()=>{ // Does this every minute
    console.log("[INTERVAL_MINUTE] Started.");

    console.log("[INTERVAL_MINUTE] Setting activity...");
    if (!starting) {
        let hours = new Date().getHours();
        let day = new Date().getDay();
        let isWorkDay = false;

        if (day==1||day==2||day==3||day==4||day==5) {isWorkDay = true;}

        let statusText = "your messages. ";
        let statusType = "WATCHING";

        if ( (hours <= 3 && isWorkDay) || (hours >= 22 && (day==0||day==1||day==2||day==3||day==4)) ) { // in our time (+1GMT) 23h-4h
            statusText = "your sleep. ";
        }else if ((hours >= 7 && hours <= 13) && isWorkDay) { // in our time (+1GMT) 8h-14h
            statusText = "the teachers. ";
            statusType = "LISTENING";
        }

        currentDate = new Date();
        currentDateTS = new Date().getTime();

        let addDay = 0;
        if (currentDate.getHours() > 14) {
            addDay = 1;
        }
        let countDownDateTS = new Date(currentDate.setHours(7,0,0,0)).setDate(currentDate.getDate()+addDay);

        let deltaTS = countDownDateTS - currentDateTS;

        let deltaDate = new Date(deltaTS);

        statusText += ` School in ${deltaDate.getHours()}h ${deltaDate.getMinutes()}m`;

        discordClient.user.setActivity(statusText, { type: statusType });
    }
    console.log("[INTERVAL_MINUTE] Complete.");
}, 60000);

var express = require("express");
var app = express();

app.get("/logs", (req, res)=>{
    let logData = globalVariables.get("logData");
    let logString = "";

    logData.forEach(e => {
        logString+=`[${new Date(e.time).toString()}] <b>${e.type}</b> - ${e.data} <br>`
    });

    res.send("<h1>Logs</h1>" + logString);
})

globalVariables.set("startTime", new Date().getTime());

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("[WEB_SERVER] Listening. Port:" + port);
});

// ED
discordClient.login(discordBotCongig.token);
console.log("[BOT] Started.");
