
const COLORS = require("./consts").COLORS;
const globalVariables = require("./globalVariables");
const smallFunctions = require("./smallFunctions");
const mathHandler = require("./mathHandler");

const ping = require("./commands/dev/ping");
const send = require("./commands/dev/send");
const st = require("./commands/dev/st");
const testread = require("./commands/dev/testread");
const testpp = require("./commands/dev/testpp");
const snap = require("./commands/dev/snap");
const sd = require("./commands/dev/sd");
const forceload = require("./commands/dev/forceload");
const forcesave = require("./commands/dev/forcesave");
const forceinit = require("./commands/dev/forceinit");

const mute = require("./commands/mod/mute");
const unmute = require("./commands/mod/unmute");
const nuke = require("./commands/mod/nuke");
const mod = require("./commands/mod/mod");

const help = require("./commands/info/help");

const holidays = require("./commands/events/holidays");
const addEvent = require("./commands/events/add");
const events = require("./commands/events/events");
const deleteEvent = require("./commands/events/delete");

const spravnyprikaz = require("./commands/jff/spravnyprikaz");
const tea = require("./commands/jff/tea");
const gtg = require("./commands/jff/gtg");
const skap = require("./commands/jff/skap");
const rip = require("./commands/jff/rip");
const ahoj = require("./commands/jff/ahoj");
const zhni = require("./commands/jff/zhni");
const joke = require("./commands/jff/joke");
const kill = require("./commands/jff/kill");
const alecau = require("./commands/jff/alecau");
const nick = require("./commands/jff/nick");
const kawaii = require("./commands/jff/kawaii");
const pvt = require("./commands/jff/pvt");
const weather = require("./commands/jff/weather");

const roll = require("./commands/random/roll");
const tf = require("./commands/random/tf");

const technokitty = require("./commands/lyrics/technokitty");
const united = require("./commands/lyrics/united");

const meme = require("./commands/jff/meme");
const meirl = require("./commands/jff/meirl");

const owo = require("./commands/ffiy/owo");
const uwu = require("./commands/ffiy/uwu");
const e621 = require("./commands/ffiy/e621");
const agree = require("./commands/ffiy/agree");

let commands = {
    // Dev commands
    'ping': (msg)=>{ping.command(msg);},
    'dp': (msg)=>{ping.command(msg);},

    'send': (msg, discordClient)=>{send.command(msg, discordClient);},

    'st': (msg)=>{st.command(msg);},

    'dtr': (msg)=>{testread.command(msg);},
    'testread': (msg)=>{testread.command(msg);},

    'dtp': (msg)=>{testpp.command(msg);},
    'testpp': (msg)=>{testpp.command(msg);},

    'snap': (msg)=>{snap.command(msg);},

    'sd': (msg, discordClient)=>{sd.command(msg, discordClient);},

    'forceload': (msg)=>{forceload.command(msg);},
    'fl': (msg)=>{forceload.command(msg);},

    'forcesave': (msg)=>{forcesave.command(msg);},
    'fs': (msg)=>{forcesave.command(msg);},

    'forceinit': (msg)=>{forceinit.command(msg);},
    'fi': (msg)=>{forceinit.command(msg);},
    

    // Mod commands
    'mute': (msg)=>{mute.command(msg);},
    'silence': (msg)=>{mute.command(msg);},

    'unmute': (msg)=>{unmute.command(msg);},
    'unsilence': (msg)=>{unmute.command(msg);},

    'nuke': (msg)=>{nuke.command(msg);},

    'mod': (msg)=>{mod.command(msg);},

    // Info commands
    'h': (msg)=>{help.command(msg);},
    'help': (msg)=>{help.command(msg);},
    'pomoc': (msg)=>{help.command(msg);},
    'prikazy': (msg)=>{help.command(msg);},

    // Event commands
    'ho': (msg)=>{holidays.command(msg);},
    'holidays': (msg)=>{holidays.command(msg);},
    'prazdniny': (msg)=>{holidays.command(msg);},

    'add': (msg)=>{addEvent.command(msg);},
    'pridat': (msg)=>{addEvent.command(msg);},

    'ev': (msg)=>{events.command(msg);},
    'events': (msg)=>{events.command(msg);},
    'eventy': (msg)=>{events.command(msg);},

    'dnes': (msg)=>{events.command(msg, "dnes");},
    'today': (msg)=>{events.command(msg, "dnes");},
    'zajtra': (msg)=>{events.command(msg, "zajtra");},
    'tomorrow': (msg)=>{events.command(msg, "zajtra");},

    'vymazat': (msg)=>{deleteEvent.command(msg);},

    // Random commands
    'spravnyprikaz': (msg)=>{spravnyprikaz.command(msg);},

    'gtg': (msg)=>{gtg.command(msg);},

    'tea': (msg)=>{tea.command(msg);},

    'skap': (msg)=>{skap.command(msg);},
    'umri': (msg)=>{skap.command(msg);},

    'rip': (msg)=>{rip.command(msg);},

    'ahoj': (msg)=>{ahoj.command(msg);},

    'zhni': (msg)=>{zhni.command(msg);},

    'joke': (msg)=>{joke.command(msg);},
    'vtip': (msg)=>{joke.command(msg);},
    'haha': (msg)=>{joke.command(msg);},

    'kill': (msg)=>{kill.command(msg);},
    'zabi': (msg)=>{kill.command(msg);},

    'alecau': (msg)=>{alecau.command(msg);},

    'nick': (msg, discordClient)=>{nick.command(msg, discordClient);},

    'kawaii': (msg)=>{kawaii.command(msg);},
    'kw': (msg)=>{kawaii.command(msg);},

    'pvt': (msg)=>{pvt.command(msg);},

    'weather': (msg)=>{weather.command(msg);},
    'pocasie': (msg)=>{weather.command(msg);},

    // Roll
    'roll': (msg)=>{roll.command(msg);},

    'tf': (msg)=>{tf.command(msg);},

    // >_<
    'owo': (msg)=>{owo.command(msg);},
    'uwu': (msg)=>{uwu.command(msg);},
    'e621': (msg)=>{e621.command(msg);},
    'hell': (msg)=>{e621.command(msg);},

    'agree': (msg)=>{agree.command(msg);},

    // Lyrics
    'technokitty': (msg)=>{technokitty.command(msg);},
    'tk': (msg)=>{technokitty.command(msg);},

    'united': (msg)=>{united.command(msg);},

    // Memes
    'meme': (msg)=>{meirl.command(msg)},
    'meirl': (msg)=>{meirl.command(msg)},

    'excuse': (msg)=>{meme.command(msg, "excuse")},
    'excuseme': (msg)=>{meme.command(msg, "excuse")},
    'excusemewtf': (msg)=>{meme.command(msg, "excuse")},
    'wtf': (msg)=>{meme.command(msg, "excuse")},

    'tmyk': (msg)=>{meme.command(msg, "tmyk")},
    'themoreyouknow': (msg)=>{meme.command(msg, "tmyk")},

    'commit': (msg)=>{meme.command(msg, "commit")},
    'gocommit': (msg)=>{meme.command(msg, "commit")},

    'oof': (msg)=>{meme.command(msg, "oof")},

    'pika': (msg)=>{meme.command(msg, "pika")},

    'tsj': (msg)=>{meme.command(msg, "tsj")},

    'killmeme': (msg)=>{meme.command(msg, "killmeme")},
    'memereview': (msg)=>{meme.command(msg, "killmeme")},

    'yeet': (msg)=>{meme.command(msg, "yeet")},

    'wwtf': (msg)=>{meme.command(msg, "wwtf")},

    'ooth': (msg)=>{meme.command(msg, "ooth")},

    'kappa': (msg)=>{meme.command(msg, "kappa")},

    'speech': (msg)=>{meme.command(msg, "speech")},

    'lookatthisdude': (msg)=>{meme.command(msg, "lookatthisdude")},
    'look': (msg)=>{meme.command(msg, "lookatthisdude")},

    'holdup': (msg)=>{meme.command(msg, "holdup")},
    'holdhore': (msg)=>{meme.command(msg, "holdup")},
    'drzup': (msg)=>{meme.command(msg, "holdup")},
    'drzhore': (msg)=>{meme.command(msg, "holdup")},
    'holehore': (msg)=>{meme.command(msg, "holdup")},

    'ohfuck': (msg)=>{meme.command(msg, "ohfuck")},

    'bye': (msg)=>{meme.command(msg, "bye")},
    'cau': (msg)=>{meme.command(msg, "bye")}
}

module.exports = {
    handleBotCommand: (msg, discordClient)=>{
        console.log(`[BOT_COMMANDS] HANDLER: Called. Processing the msg...`);
        
        let modModeOn = globalVariables.get("modModeOn");

        if (modModeOn) { // If the bot is in modderated mode,
            if (!smallFunctions.checkAdmin(msg)) { // Check if the author is dev
                console.log(`[BOT_COMMANDS] REJECTED: Bot is in mod mode.`);
                return;
            }
        }

        let commandMessageArray = msg.content.split(" "); // Split words of the message into an array

        let command = commandMessageArray[0].slice(1); // Extracts the command from the message
        command = command.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Get rid of shit in Slovak lang
        command = command.toLocaleLowerCase(); // Ignore the case by converting it to lower

        console.log(`[BOT_COMMANDS] HANDLER: Done with basic processing of the msg. Calling mathHandler to check...`);

        if (mathHandler.processCommand(msg)) {return;} // This will check if the command is a math command and if it is, it will process and reply to it and return true;

        console.log(`[BOT_COMMANDS] HANDLER: All the shit out of the way. Checking with object literals...`);

        if (commands[command]) {
            console.log(`[BOT_COMMANDS] PASS: Command found in the object. Passing control to the actual command module. Done here.`);
            commands[command](msg, discordClient);
        }else{
            console.log(`[BOT_COMMANDS] HANDLER: Command not found in object. Replying and we're done.`);
            msg.channel.send({
                "embed": {
                    "title": "Nesprávny príkaz",
                    "color": COLORS.RED,
                    "description": `!${command} je niečo ako správny príkaz, ale nie.\nPre list príkazov **!help**`,
                    "footer": {
                        "text": "Pôvodne som si myslel že to je meme pre všetkých, ako za starého dobrého komunizmu. Ale mílil som sa. Článok 13 Európskej únie mi prikazuje creditovat autora tohto memu (Davida Magyerku) od ktorého som tento meme bezočividne ukradol. Týmto by som sa chcel osobne a úprimne ospravedlniť Davidovi Magyerkovi za moju sebeckosť a idiotskosť pri používaní tohto memu bez jeho autorskeho súhlasu. Ďakujem. #saveTheInternet #article13"
                    }
                }
            });
        }

    }
}