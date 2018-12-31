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

discordClient.on('presenceUpdate', (oldMember, newMember)=>{
    if (newMember.presence.game) {
        console.log(`[PRESENCE_UPDATE] ${newMember.user.username}#${newMember.user.discriminator} [${newMember.presence.status}] - Playing ${newMember.presence.game.toString()}`);
    }else{
        console.log(`[PRESENCE_UPDATE] ${newMember.user.username}#${newMember.user.discriminator} [${newMember.presence.status}] - Playing nothing`);
    }
    
});

let setStatus = ()=>{
    if (starting) {
        console.warn("[SET_STATUS] Bot starting. ABORT!");
        return;
    }

    console.log("[SET_STATUS] Setting activity...");
    
    let hours = new Date().getHours();

    let statusText = "your messages. ";
    let statusType = "WATCHING";

    if (hours < 5) {
        statusText = "you sleep. ";
    }

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

setInterval(()=>{
    currentStamp = new Date().getTime();
    // endStamp = new Date("Tue Jan 01 2019 00:00:01 GMT+0100").getTime();
    endStamp = new Date("Mon Dec 31 2018 14:25:01 GMT+0100").getTime();
    deltaStamp = endStamp - currentStamp;

    if(0 < deltaStamp < 1000) {
        discordClient.channels.get("527170494613422092 ").send(":confetti_ball: :confetti_ball: :confetti_ball: Šťastný nový rok! :confetti_ball: :confetti_ball: :confetti_ball:");
    }

    console.log("[NY] DS: " + deltaStamp);
}, 1000)

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
