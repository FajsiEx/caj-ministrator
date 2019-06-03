/*

    Tea-bot
    © FajsiEx 2018-2019
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
    interval: 'magenta',
    event: 'cyan',
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
    console.log(`[EVENT] Ready`.event);

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

    starting = false;
    setStatus();
});

discordClient.on('message', (msg)=>{
    console.log(`[EVENT] Message: ${msg.author.username + "#" + msg.author.discriminator}: ${msg.content}`.event);
    msgHandler(msg, discordClient);
});

discordClient.on('presenceUpdate', (oldMember, newMember)=>{
    if (newMember.presence.game) {
        console.log(`[EVENT] Presence update: ${newMember.user.username}#${newMember.user.discriminator} [${newMember.presence.status}] - Playing ${newMember.presence.game.toString()}`.event);
    }else{
        console.log(`[EVENT] Presence update: ${newMember.user.username}#${newMember.user.discriminator} [${newMember.presence.status}] - Playing nothing`.event);
    }
    
});

// TODO: move this to it's own module
let setStatus = ()=>{
    console.log("[SET_STATUS] Setting activity...".interval);

    if (globalVariables.get('disableStatus')) {
        console.warn("[SET_STATUS] Status disabled. ABORT!".warn);
        return;
    }
    if (starting) {
        console.warn("[SET_STATUS] Bot starting. ABORT!".warn);
        return;
    }
    
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

    
    //nowStamp = new Date("Sun Apr 11 2019 10:00:00 GMT+0100").getTime();
    endStamp = new Date("Sun Jul 28 2019 20:00:00 GMT+0100").getTime();
    //endStamp = new Date("Sun Jun 31 2019 12:00:00 GMT+0100").getTime();
    nowStamp = new Date().getTime();
    deltaStamp = endStamp - nowStamp;

    deltaDate = new Date(deltaStamp);
    console.log(deltaDate);
    console.log(deltaDate.getDate() - 1);
    console.log(deltaDate.getHours() - 1);
    console.log(deltaDate.getMinutes());

    l_months = deltaDate.getMonth() - 1;
    l_days = deltaDate.getDate() - 1 + (l_months*30);
    l_hours = deltaDate.getHours() - 1;
    l_minutes = deltaDate.getMinutes();
/*
    days = Math.floor(deltaStamp / 86400000);
    deltaStamp -= days * 86400000;

    hours = Math.floor(deltaStamp / 3600000);
    deltaStamp -= hours * 3600000;      
    minutes = Math.floor(deltaStamp / 60000);
    deltaStamp -= minutes * 60000;

    seconds = Math.floor(deltaStamp / 1000);
*/
    if (l_days < 1) {
        if (l_hours < 1) {
            statusText = `${l_minutes} minutes until my deadline`;
            if (l_minutes == 1) {
                statusText = `1 minute until my deadline`;
            }
            if (l_minutes == 0) {
                statusText = `a few seconds until my deadline`;
            }
        }else{
            statusText = `${l_hours} hours until my deadline`;
            if (l_hours == 1) {
                statusText = `${l_hours} hour until my deadline`;
            }
        }
    }else{
        if (l_days == 69) {
            l_days = "69 ( ͡° ͜ʖ ͡°) ";
        }
        statusText = `${l_days} days until my deadline`;
        if (l_minutes == 1) {
            statusText = `${l_days} day until my deadline`;
        }
    }

    if (nowStamp > endStamp) {
        statusText = "Congratulations on ending the year";
    }

    console.log(nowStamp);
    console.log(endStamp);

    statusType = "PLAYING";

    let commsServed = globalVariables.get("commandsServed");
    if (!commsServed) {
        commsServed = "loading number of";
    }
    
    discordClient.user.setStatus(statusStatus).then(()=>{
        discordClient.user.setActivity(statusText + " | !help | v." + VERSION + " | " + commsServed + " commands served | ST: " + `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, { type: statusType }).then(()=>{
            console.log("[SET_STATUS] Completed.".success);
        });
    });
};

let request = require("request");

// Set intervals
setInterval(setStatus, 15000);

// Sets startup time
globalVariables.set("startTime", new Date().getTime());

// Login to discord
discordClient.login(discordBotCongig.token);

console.log("[BOT] Started.".success);
