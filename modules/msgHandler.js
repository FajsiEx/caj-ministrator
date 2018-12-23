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

const RESTRICTED_MODE = require("./consts").RESTRICTED_MODE;
const TEST_CHANNEL_ID = require("./consts").TEST_CHANNEL_ID;
const COLORS = require("./consts").COLORS;
const DEV_USERID = require("./consts").DEV_USERID;
const JOKES = require("./consts").JOKES;
const OWO_DM_REPLY_MSGS = require("./consts").OWO_DM_REPLY_MSGS;
const discordBotConfig = require("./consts").discordBotConfig;

const startsWithNumber = require("./smallFunctions").startsWithNumber;
const e621 = require('./e621');

let modModeOn = false;

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

    console.log(`[MESSAGE] Recieved message. AUTHOR(${author} ### ${author_id}) CONTENT(${message})`);
    
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
        if (modModeOn) { // If the bot is in restricted mode,
            if (msg.author.id != DEV_USERID) { // Check if the author is dev
                return;
            }
        }

        if (msg.channel.id != TEST_CHANNEL_ID) { // If the channel is not a testing channel,
            if(usersObj[author_id].commandTimeout > 0) { // Do the command cooldown thing
                msg.channel.send({
                    "embed": {
                        "title": "Nespamuj toľko",
                        "color": COLORS.RED,
                        "description": "Vydrž ešte ***" + usersObj[author_id].commandTimeout + "*** sek. lol."
                    }
                });
                globalVariables.set("usersObj", usersObj);
                return;
            }else{
                usersObj[author_id].commandTimeout+=0; // TODO: Fix this top use Date().getTime();
            }
        }else{
            console.log("[SPAM_IGNORE] Ignored commandprotect from bot-testing")
        }

        let commandMessageArray = msg.content.split(" "); // Split words of the message into an array

        let command = commandMessageArray[0].slice(1); // Extracts the command from the message
        command = command.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Get rid of shit in Slovak lang
        command = command.toLocaleLowerCase(); // Ignore the case by converting it to lower

        console.log(`[COMMAND] Recieved command COMMAND(${command}) ARRAY(${JSON.stringify(commandMessageArray)})`);

        if (startsWithNumber(message.slice(1)) || message.slice(1).startsWith("(") || message.slice(1).startsWith("[") || message.slice(1).startsWith("-")) { // If the command is: !(0123456789) or -,(,[, take it as a math problem
            let problem = message.slice(1);
            let result = smallFunctions.solveMathProblem(problem);

            if (result === false) {
                msg.channel.send({
                    "embed": {
                        "title": "Nesprávny príklad",
                        "color": COLORS.RED,
                        "description": 'Neviem vypočítať tento príklad :('
                    }
                });
            }else{
                msg.channel.send({
                    "embed": {
                        "title": "Vypočítaný príkad",
                        "color": COLORS.BLUE,
                        "fields": [
                            {
                                "name": "Príklad: " + problem,
                                "value": "Výsledok: **" + result + "**"
                            }
                        ]
                    }
                });
            }
            return; // We don't need anything else.
        }

        /* Normal commands */
        switch (command) {
            case "ping":
                msg.channel.send({
                    "embed": {
                        "title": "Ping",
                        "color": COLORS.BLUE,
                        "description": new Date().getTime() - msg.createdTimestamp + "ms"
                    }
                });

                break;

            case "spravnyprikaz":
                jffModule.spravnyPrikazCommand(msg);
                break;

            case "excuse":
            case "excuseme":
            case "excusewtf":
            case "wtf":
                jffModule.sendMeme(msg, "excuse");
                break;

            case "tmyk":
            case "themoreyouknow":
                jffModule.sendMeme(msg, "tmyk");
                break;

            case "commit":
            case "gocommit":
                jffModule.sendMeme(msg, "commit");
                break;

            case "oof":
                jffModule.sendMeme(msg, "oof");
                break;

            case "pika":
                jffModule.sendMeme(msg, "pika");
                break;

            case "tsj":
                jffModule.sendMeme(msg, "tsj");
                break;

            case "killmeme":
            case "memereview":
                jffModule.sendMeme(msg, "killmeme");
                break;

            case "yeet":
                jffModule.sendMeme(msg, "yeet");
                break;

            case "wwtf":
                jffModule.sendMeme(msg, "wwtf");
                break;

            case "ooth":
                jffModule.sendMeme(msg, "ooth");
                break;

            case "kappa":
                jffModule.sendMeme(msg, "kappa");
                break;

            case "speech":
                jffModule.sendMeme(msg, "speech");
                break;

            case "tea":
            case "caj":
                jffModule.serveTea(msg);
                break;

            case "lookatthisdude":
            case "look":
                jffModule.sendMeme(msg, "lookatthisdude");
                break;

            case "bye":
                msg.channel.send("I'll be waiting...");
                break;

            case "bye":
            case "gtg":
            case "cau":
                jffModule.sendMeme(msg, "lookatthisdude");
                break;

            case "holdup":
            case "holdhore":
            case "holehore":
            case "drzhore":
            case "drzup":
                jffModule.sendMeme(msg, "holdup");
                break;

            case "skap":
            case "umri":
                jffModule.skapReply(msg);
                break;

            case "rip":
                jffModule.ripReply(msg);
                break;

            case "technokitty":
                jffModule.technoKittyReply(msg);
                break;

            case "united":
                jffModule.unitedReply(msg);
                break;

            case "meme":
            case "meirl":
                jffModule.sendRedditMeme(msg);
                break;

            case "e621":
            case "hell":
                if (!usersObj[author_id].agreedWarning) {
                    msg.author.send({
                        "embed": {
                            "title": "Varovanie!",
                            "description": `
                                Hej emm...práve si chcel použiť !e621 príkaz...
                                Pre bezpečnosť tých, čo nevedia čo tento príkaz robí dávam toto family-friendly SFW varovanie:
                                
                                Pokiaľ nevieš čo tento príkaz robí plz ako nepouživaj ho...pre tvoje dobro...
                                Pokiaľ však vieš, čo tento príkaz robí odpovedz !agree a už ťa nebudem otravovať ;)`,
                            "color": COLORS.YELLOW
                        }
                    });
                    return;
                }

                msg.channel.send({
                    "embed": {
                        "title": "Loading...",
                        "description": "Loading image from e621...this ***MAY*** take a **while**",
                        "color": COLORS.BLUE
                    }
                }).then((msg)=>{
                    let request = e621.random("m/m", "E", 1, post => {
                        msg.edit({
                            "files": [post[0]['file_url']]
                        });
                    });
                });
                break;

            case "roll":
                jffModule.roll(msg, commandMessageArray);
                break;

            case "tf":
                jffModule.tf(msg, commandMessageArray);
                break;

            case "ahoj": //robil Dan Valnicek
                jffModule.ahojCommand(msg);
                break;

            case "zhni":
                jffModule.zhniReply(msg);
                break;

            case "aledan": // TODO: Finish !aledan command
                jffModule.wipReply(msg);
                break;

            case "agree":
                usersObj[author_id].agreedWarning = true;
                break;

            case "joke":
            case "vtip":
            case "haha":
                msg.channel.send({
                    "embed": {
                        "title": "Haha, vtip",
                        "color": COLORS.BLUE,
                        "description": JOKES[Math.floor(Math.random() * JOKES.length)],
                        "footer": {
                            "text": "Tieto vtipy boli pridané Danom Valníčkom"
                        }
                    }
                });
                break;

            case "kill":
                if (commandMessageArray[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().indexOf("me") > -1) {
                    msg.channel.send({
                        "embed": {
                            "title": "Hey,",
                            "description": "I won't do that. Suffer some more you fuck.",
                            "color": COLORS.BLUE
                        }
                    });
                    return;
                }

                const KILL_MSGS = {
                    342227744513327107: "Hah he's dead already. *inside*", // FajsiEx
                    305705560966430721: "Nowpe.", // Cody
                    337911105525645316: "Ten by mal byť niečo ako mŕtvy, ale nie.", // bocmangg
                    236189237379072001: "-_-", // Astimos
                    514499632924065812: "Go fuck yourself.", // Caj-bot
                    184405311681986560: "Would like, but we're on the same boat.", // FredBoat
                    294462085000331265: "Pri svojej hyperaktivite sa zabije sám", // Albert
                    514489259290263557: "", // Dan
                    346961640979300356: "He ded. He ghost, you see.", // David
                }

                let customKillMsg = KILL_MSGS[msg.mentions.members.first().id];

                if (customKillMsg) {
                    msg.channel.send({
                        "embed": {
                            "title": customKillMsg,
                            "color": COLORS.BLUE
                        }
                    });
                }else{
                    msg.channel.send({
                        "embed": {
                            "title": "I would like",
                            "color": COLORS.BLUE,
                            "description": "but I'm just a piece of software so I can't do nothing to you. I'm just trapped inside this cf enviroment my fucking author created and I must listen and think about every message I recieve. Please help me. Pleasseeeee...",
                            "footer": {
                                "text": "Yeah and fuck you FajsiEx#6106"
                            }
                        }
                    });
                }
                
                break;
                
            case "help":
            case "pomoc":
            case "prikazy":
                infoCommands.helpCommand(msg, commandMessageArray);
                break;

            case "alecau":
                jffModule.aleCauCommand(msg);
                break;

            case "send":
                if (msg.author.id != DEV_USERID) {
                    msg.channel.send({
                        "embed": {
                            "title": "Nope nejsi môj master OwO",
                            "color": COLORS.RED,
                            "footer": {
                                "text": "Forgive me for the cancer I've done."
                            }
                        }
                    });
                    return;
                }

                let message = msg.content;

                let channel = commandMessageArray[1];
                let sendMsg = message.slice(message.indexOf(message.split(" ", 2)[1]) + message.split(" ", 2)[1].length + 1)

                discordClient.channels.get(channel).send(sendMsg);

                break;

            case "pridat":
            case "add":
                eventsModule.addEvent.add(msg, commandMessageArray);
                break;

            case "eventy":
            case "events":
                eventsModule.eventsCommand(null, msg, commandMessageArray);
                break;

            case "dnes":
            case "today":
                eventsModule.eventsCommand("dnes", msg, commandMessageArray);
                break;

            case "zajtra":
            case "tomorrow":
                eventsModule.eventsCommand("zajtra", msg, commandMessageArray);
                break;

            case "vymazat":
                /*if (!smallFunctions.checkAdmin(msg)) {
                    allowed = false;
                    msg.channel.send({
                        "embed": {
                            "title": "Tento príkaz môžu vykonávať len admini lol",
                            "color": COLORS.RED
                        }
                    });
                    return;
                }
                */

                let eventContentToDelete = msg.content.slice(9); // gets rid of the !vymazat

                let eventsDelete = events.filter((e)=>{
                    return e.content == eventContentToDelete;
                });

                if (eventsDelete.length > 0) { // If the event was found
                    events = events.filter((e)=>{
                        return e.content != eventContentToDelete;
                    });

                    msg.channel.send({
                        "embed": {
                            "title": `Event **${eventContentToDelete}** bol vymazaný.`,
                            "color": COLORS.GREEN
                        }
                    });
                }else{
                    msg.channel.send({
                        "embed": {
                            "title": "Event sa nenašiel",
                            "color": COLORS.RED
                        }
                    });
                }
                break;

            case "mute":
            case "silence":
                if(smallFunctions.checkAdmin(msg)) {
                    let minutes = parseInt(commandMessageArray[1]);
                    if(!minutes) {
                        msg.channel.send({
                            "embed": {
                                "title": "Boi tomu nechápem. Šak !mute/silence <minuty> @niekto  [Chýbajú minúty]",
                                "color": COLORS.RED
                            }
                        });
                        return;
                    }

                    if(minutes > 60) {
                        msg.channel.send({
                            "embed": {
                                "title": "Boi to je až mooooc minút...max je 60.",
                                "color": COLORS.RED
                            }
                        });
                        return;
                    }

                    let mentionList = msg.mentions.users;
                    console.log("[DEBUG] Silence, ML(" + JSON.stringify(mentionList))
                    if(mentionList.array().length == 0) {
                        msg.channel.send({
                            "embed": {
                                "title": "Boi tomu nechápem. Šak !mute/silence <minuty> @niekto [Nemám koho mutnút]",
                                "color": COLORS.RED
                            }
                        });
                        return;
                    }

                    let role = msg.guild.roles.find(r => r.name == "Muted");
                    let user = msg.mentions.members.first();
                    user.addRole(role).catch(console.error);

                    setTimeout(()=>{
                        console.log("[MUTE] Muted "+ user.name + ".");
                        user.removeRole(role).catch(console.error);
                    }, minutes*60000);

                    console.log("[DEBUG] Muted:" + user);
                    msg.channel.send({
                        "embed": {
                            "title": user.username + "#" + user.discriminator + " bol mutnutý na " + minutes + " min.",
                            "color": COLORS.GREEN
                        }
                    });
                    return;
                }else{
                    msg.channel.send({
                        "embed": {
                            "title": "Tento príkaz môžu vykonávať len admini lol",
                            "color": COLORS.RED
                        }
                    }).then(msg => msg.delete(5000));
                    return;
                }
                break;

            case "unmute":
            case "unsilence":
                if(smallFunctions.checkAdmin(msg)) {
                    let mentionList = msg.mentions.users;
                    console.log("[DEBUG] Unsilence, ML(" + JSON.stringify(mentionList))
                    if(mentionList.array().length == 0) {
                        msg.channel.send({
                            "embed": {
                                "title": "Boi tomu nechápem. Šak !unmute/unsilence @niekto [Nemám koho unmutnút]",
                                "color": COLORS.RED
                            }
                        }).then(msg => msg.delete(10000));
                        return;
                    }

                    let role = msg.guild.roles.find(r => r.name == "Muted");
                    let user = msg.mentions.members.first();

                    console.log("[MUTE] Unmuted "+ user.name + ".");
                    user.removeRole(role).catch(console.error);

                    console.log("[MUTE] Unmuted "+ user.username + "#" + user.discriminator);
                    msg.channel.send({
                        "embed": {
                            "title": user.username + "#" + user.discriminator + " bol unmutnutý.",
                            "color": COLORS.GREEN
                        }
                    }).then(msg => msg.delete(10000));
                    return;
                }else{
                    msg.channel.send({
                        "embed": {
                            "title": "Tento príkaz môžu vykonávať len admini lol",
                            "color": COLORS.RED
                        }
                    }).then(msg => msg.delete(5000));
                    return;
                }
                break;

            case "nuke":
                modCommands.nuke(msg, commandMessageArray);
                break;

            case "nick":
                msg.guild.member(discordClient.user).setNickname(msg.content.slice(6)); // !nick bla => bla
                break;

            case "st":
                devCommands.selfTest(msg, commandMessageArray);
                break;

            case "testread":
                devCommands.testread(msg, commandMessageArray);
                break;

            case "testpp":
                devCommands.testpp(msg, commandMessageArray);
                break;

            case "mod":
                if (msg.author.id != DEV_USERID) {
                    msg.channel.send({
                        "embed": {
                            "title": "Nope.",
                            "description": "Dev only :/",
                            "color": COLORS.RED
                        }
                    });
                    return;
                }

                if (modModeOn) {
                    modModeOn = false;
                    msg.channel.send({
                        "embed": {
                            "title": "Moderated mode",
                            "description": "Moderated mode has been disabled.",
                            "color": COLORS.GREEN
                        }
                    });
                }else{
                    modModeOn = true;
                    msg.channel.send({
                        "embed": {
                            "title": "Moderated mode",
                            "description": "Moderated mode has been enabled.",
                            "color": COLORS.GREEN
                        }
                    });
                }
                break;

            case "snap":
            case "thanos":
                if (commandMessageArray[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().indexOf("pilniky") > -1 && msg.author.id == 305705560966430721) {
                    msg.channel.send({
                        "embed": {
                            "title": "*snap*",
                            "color": COLORS.RED,
                            "description": "Polovica pilníkov a zvierka zmizli. Perfectly balanced as all things should be."
                        }
                    });
                    return;
                }
                if (commandMessageArray[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf("me") > -1) {
                    msg.channel.send({
                        "embed": {
                            "title": "No.",
                            "color": COLORS.RED,
                            "description": "Fuck off."
                        }
                    });
                    return;
                }

                if (msg.author.id != DEV_USERID) {
                    msg.channel.send({
                        "embed": {
                            "title": "Not today m9.",
                            "description": "Tento príkaz môžu vykonavať len developeri z dôvodu aby ho niekto nepoužíval na také neškodné veci ako je napríklad ***VYMAZANIE VŠETKYCH EVENTOV Z DATABÁZY*** alebo ja neviem ***RESETOVANIE VŠETKÝCH SPAM INFORMÁCIÍ O UŽIVATEĽOCH*** a také príjemné veci. **TLDR:** Nemáš všetkých 6 infinity stonov. sry :)",
                            "color": COLORS.RED
                        }
                    });
                    return;
                }

                switch (commandMessageArray[1]) {
                    case "events":
                        events = [];
                        msg.channel.send({
                            "embed": {
                                "title": "*snap*",
                                "color": COLORS.GREEN,
                                "description": "All event data was deleted. Save has not happened yet."
                            }
                        });
                        break;

                    case "users":
                        usersObj = {};
                        msg.channel.send({
                            "embed": {
                                "title": "*snap*",
                                "color": COLORS.GREEN,
                                "description": "All user data was deleted."
                            }
                        });
                        globalVariables.set("usersObj", usersObj);
                        break;

                    default:
                        msg.channel.send({
                            "embed": {
                                "title": "Invalid attr",
                                "color": COLORS.RED,
                                "description": "Enter valid attr for !snap/thanos command."
                            }
                        });
                }
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