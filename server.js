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
        console.log("[BOT] Fetched the admin user");
    });

    if(!onlineMsgSent) {
        onlineMsgSent = true;
        console.log("[BOT] Sending online msg...");
        discordClient.channels.get('514873440159793167').send({
            "embed": {
                "title": "Čaj-bot je online:",
                "color": COLORS.GREEN,
                "description": `
                    **Serverový čas:** ${new Date().toString()}
                `
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

        if ( (hours <= 3 && isWorkDay) || (hours >= 22 && (day==0||day==1||day==2||day==3||day==4)) ) { // in our time (+1GMT) 23h-4h
            discordClient.user.setActivity('you sleep. BTW Čo robíš hore zajtra je škola lol.', { type: 'WATCHING' });
        }else if ((hours >= 7 && hours <= 13) && isWorkDay) { // in our time (+1GMT) 8h-14h
            discordClient.user.setActivity('the teachers.', { type: 'LISTENING' });
        }else{
            if (Math.random() < 0.05) { // Small chance (1/20 minutes)
                discordClient.user.setActivity('your every move', { type: 'WATCHING' });
            }else{
                discordClient.user.setActivity('your every message', { type: 'WATCHING' });
            }
        }
    }
    console.log("[INTERVAL_MINUTE] Complete.");
}, 60000);

// ED
discordClient.login(discordBotCongig.token);
console.log("[BOT] Started.");
