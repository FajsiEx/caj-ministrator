/*

    Handles onmessage event of the discordClient

*/

//const spamProtect = require("./spamProtect"); // Disabled
const jffModule = require("./jffModule");
const globalVariables = require("./globalVariables");
const eventsModule = require("./events");
const smallFunctions = require("./smallFunctions");
const infoCommands = require("./infoCommands");
const modCommands = require("./modCommands");
const devCommands = require("./devCommands");
const botCommands = require("./botCommands");

const mathHandler = require("./mathHandler");

const COLORS = require("./consts").COLORS;
const JOKES = require("./consts").JOKES;
const OWO_DM_REPLY_MSGS = require("./consts").OWO_DM_REPLY_MSGS;

const discordBotConfig = require("./consts").discordBotConfig;

module.exports = (msg, discordClient)=>{
    let usersObj = globalVariables.get("usersObj");
    let events = globalVariables.get("events");

    if (msg.author.bot) { // We check if the author of the message isn't a bot
        console.log("[IGNORE] Bot message has been ignored.");
        return; // If they are, we just ignore them.
    }

    if (!msg.channel) { // Because the bot uses the msg.channel.send function to reply in most cases we check if that channel exists
        console.log("[ERR] Not a msg in a channel.");
        msg.reply({
            "embed": {
                "title": "Prosím napíšte mi do nejakého kanálu alebo DM.",
                "color": COLORS.RED
            }
        });
    }

    // Get some shit from the msg object
    let author_id = msg.author.id; // Discord user ID of the author user
    let author = msg.author.username + "#" + msg.author.discriminator; // User#1337
    let message = msg.content; // Actual content of the message

    if(!usersObj[author_id]) {
        usersObj[author_id] = {
            username: author,
            mpm: 1, // Messages per minute [LEGACY]
            timeOfFirstMinuteMessage: 0, // [LEGACY]
            warned: 0, // And increment their timeout [LEGACY]
            timeout: 0, // And set their timeout [LEGACY]
            commandTimeout: 0, // And set their command timeout
            alreadyReportedTimeout: 0, // 0=not reported yet. [LEGACY]
            alreadyWishedGN: 0, // 0=not wished GN yet. [LEGACY]
            muteTimeout: 0, // 0=not timeouted.
            agreedWarning: false // Agreed? Better not.
        };
        globalVariables.set("usersObj", usersObj)
    }

    // Things for the spam protection
    // As per request this is now disabled.
    //spamProtect(msg, author_id, author);

    console.log(`[MESSAGE] Recieved message. AUTHOR(${author} /// ${author_id}) CONTENT(${message})`);
    
    // Good night wishing thing
    jffModule.goodNightWisher(msg, author_id, discordClient);

    // Various easter eggs
    jffModule.msgEaterEggReply(msg, message);

    // OwO what's this (may have God mercy on this world)
    if(jffModule.owoReplier(msg, discordClient)) {
        sendDM = (Math.round(Math.random() * 5) == 3);
        if (sendDM) {
            let DMMsg = OWO_DM_REPLY_MSGS[Math.floor(Math.random() * OWO_DM_REPLY_MSGS.length + 1)-1]; // Gets a random msg from the array (SB baka lol)
            msg.author.send(DMMsg); // And finally sends it as an DM (hopeflly ;])
        }
        return;
    }
    // Success.

    // Detect if the message is a bot command
    if (message.startsWith(discordBotConfig.prefix)) { // If the message starts with !, take it as a command
        botCommands.handleBotCommand(msg, discordClient);

        return;
        
        /* Normal commands */
        switch (command) {

            case "nick":
                // TODO: Finish him!
                break;

            case "st":
                break;

            case "testread":
                break;

            case "testpp":
                break;

            case "mod":
                
                break;

            case "snap":
            case "thanos":
                
                break;

            default: // If there is a command sent but it is invalid fall back to this
                msg.channel.send({
                    "embed": {
                        "title": "Nesprávny príkaz",
                        "color": COLORS.RED,
                        "description": `${discordBotConfig.prefix + command} je niečo ako správny príkaz, ale nie.\nPre list príkazov **!help**`,
                        "footer": {
                            "text": "Pôvodne som si myslel že to je meme pre všetkých, ako za starého dobrého komunizmu. Ale mílil som sa. Článok 13 Európskej únie mi prikazuje creditovat autora tohto memu (Davida Magyerku) od ktorého som tento meme bezočividne ukradol. Týmto by som sa chcel osobne a úprimne ospravedlniť Davidovi Magyerkovi za moju sebeckosť a idiotskosť pri používaní tohto memu bez jeho autorskeho súhlasu. Ďakujem. #saveTheInternet #article13"
                        }
                    }
                });

                break;
        }
    }

    globalVariables.set("usersObj", usersObj);
    globalVariables.set("events", events);
}