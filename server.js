/*

    Caj-bot
    Licensed under MIT license
    For a full license, go to LICENSE file.
    TL;DR of license: use this as you want just include the license somewhere.

*/

// As soon as the bot starts up we print a message so we know at least it's working
console.log("[BOT] Starting...");

// Import modules
const discord = require('discord.js');
const discordClient = new discord.Client(); // Creates a discordClient

// Configuration
const discordBotCongig = {
    token: process.env.DISCORD_BOT_TOKEN // Gets discord bot token from the enviromental variables
};

// Global veriables definition
let starting = true;

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
    starting = false;
    setStatus();
});

discordClient.on('message', (msg)=>{
    msgHandler(msg, discordClient);
});

let setStatus = ()=>{ // TODO: fix this thing jesus this is fucking ugly as fuck...h-h-how did I even write this shit...
    if (starting) {
        console.warn("[SET_STATUS] Bot starting. ABORT!");
        return;
    }

    console.log("[SET_STATUS] Setting activity...");
    
    let hours = new Date().getHours();
    let day = new Date().getDay();
    let isWorkDay = false;

    if (day==1||day==2||day==3||day==4||day==5) {isWorkDay = true;}

    let statusText = "your messages. ";
    let statusType = "WATCHING";

    if ( (hours <= 3 && isWorkDay) || (hours >= 22 && (day==0||day==1||day==2||day==3||day==4)) ) { // in our time (+1GMT) 23h-4h
        statusText = "you sleep. ";
    }else if ((hours >= 7 && hours <= 13) && isWorkDay) { // in our time (+1GMT) 8h-14h
        statusText = "the teachers. ";
        statusType = "LISTENING";
    }
/*
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
*/

    endStamp = new Date("Sun Jan 08 2019 08:00:00 GMT+0100").getTime();
    nowStamp = new Date().getTime();
    deltaStamp = endStamp - nowStamp;

    days = Math.floor(deltaStamp / 86400000);
    deltaStamp -= days * 86400000;

    hours = Math.floor(deltaStamp / 3600000);
    deltaStamp -= hours * 3600000;      
    minutes = Math.floor(deltaStamp / 60000);
    deltaStamp -= minutes * 60000;

    seconds = Math.floor(deltaStamp / 1000);

    statusText += `${days} dní, ${hours} hodín, ${minutes} minút do konca prázdnin`

    discordClient.user.setActivity(statusText, { type: statusType });

    console.log("[SET_STATUS] Completed");
}

setInterval(setStatus, 60000);

var express = require("express");
var app = express();

app.get("/logs", (req, res)=>{
    let logData = globalVariables.get("logData");
    let logString = "";

    logData.forEach(e => {
        console.log("[DEBUG] getLogs route E:" + JSON.stringify(e))
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
