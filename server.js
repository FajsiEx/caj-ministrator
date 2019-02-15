/*

    Tea-bot
    © Fajsiex 2018-2019
    Licensed under MIT license
    For a full license, go to LICENSE file.
    TL;DR of license: use this as you want just include the license somewhere.
    
*/

// As soon as the bot starts up we print a message so we know at least it's working
console.log("Tea-bot project");
console.log("Copyright 2018-2019 FajsiEx (Licensed under MIT license - see LICENSE.md for more information)");
console.log("[BOT] Starting...");

// Import modules

const colors = require('colors');
const discord = require('discord.js');
const discordClient = new discord.Client(); // Creates a discordClient

// Configuration
const discordBotCongig = {
    token: process.env.DISCORD_BOT_TOKEN // Gets discord bot token from the enviromental variables
};
colors.setTheme({
    debug: 'grey',
    info: 'blue',
    success: 'green',
    important: 'magenta',
    warn: ['bgYellow', 'black'],
    error: 'bgRed'
});

// Global veriables definition
let starting = true;

require('./modules/globalVariables').init();

const msgHandler = require('./modules/msgHandler');
const globalVariables = require("./modules/globalVariables");
const COLORS = require("./modules/consts").COLORS;
const VERSION = require("./modules/consts").VERSION;

const startupTest = require("./modules/tests/startup");
if (!startupTest()) {
    console.error("[TEST_FAIL] Startup test failed. Exiting.");
    process.exit(201);
}

discordClient.on('error', console.error);

// GREETING
discordClient.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find(ch => ch.name === 'talk');
    if (!channel) {return;}
    channel.send(`Vítaj, ${member}! Nezabudni si dať svoje IRL meno ako nickname.`);
});

// Discord client init
discordClient.on('ready', ()=>{
    console.log("[READY] discordClient ready.".info);

    if (process.env.DISABLE_SAVE != "yes") {
        discordClient.fetchUser("342227744513327107").then((user)=>{ // Fetch the admin user
            user.send({
                "embed": {
                    "title": "Bot launched",
                    "color": COLORS.GREEN,
                    "description": `
                        Tea-bot (version ${VERSION}) has been launched and is ready for use.
                    `
                }
            });
        });
    }
    
    if (process.env.DISABLE_SAVE == "yes") {
        discordClient.channels.get("527170494613422092").send({
            "embed": {
                "title": "Bot launched",
                "color": COLORS.YELLOW,
                "description": `
                    Tea-bot launched in beta mode.
                    Saving is therefore disabled.
                `
            }
        });
    }

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

// TODO: move this to it's own module
let setStatus = ()=>{
    if (globalVariables.get('disableStatus')) {
        console.warn("[SET_STATUS] Status disabled. ABORT!".warn);
        return;
    }
    if (starting) {
        console.warn("[SET_STATUS] Bot starting. ABORT!".warn);
        return;
    }

    console.log("[SET_STATUS] Setting activity...".debug);
    
    let hours = new Date().getHours();

    let statusText = "your messages";
    let statusType = "WATCHING";
    let statusStatus = "online";

    if (hours < 5) {
        statusText = "you sleep";
    }

    let modModeOn = globalVariables.get("modModeOn");

    if (modModeOn) {
        statusStatus = "dnd";
        statusText = "nothing";
    }

    /*
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
    */

    let commsServed = globalVariables.get("commandsServed");
    if (!commsServed) {
        commsServed = "loading number of";
    }
    
    discordClient.user.setStatus(statusStatus).then(()=>{
        discordClient.user.setActivity(statusText + " | !help | v." + VERSION + " | " + commsServed + " commands served", { type: statusType }).then(()=>{
            console.log("[SET_STATUS] Completed.".success);
        });
    });
};

setInterval(setStatus, 15000);

let express = require("express");
let app = express();

app.get("/logs", (req, res)=>{
    let logData = globalVariables.get("logData");
    let logString = "";

    logData.forEach(e => {
        console.log("D: [EXPRESS] getLogs route E:" + JSON.stringify(e));
        logString+=`[${new Date(e.time).toString()}] <b>${e.type}</b> - ${e.data} <br>`;
    });

    res.send("<h1>Logs</h1>" + logString);
});

globalVariables.set("startTime", new Date().getTime());

let port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(("[WEB_SERVER] Listening. Port:" + port).success);
});

// ED
discordClient.login(discordBotCongig.token);
console.log("[BOT] Started.".success);
