
const globalVariables = require("./globalVariables");
const DEV_USERID = require("./consts").DEV_USERID;
const mathHandler = require("./mathHandler");

const ping = require("./commands/dev/ping");
const send = require("./commands/dev/send");

const help = require("./commands/info/help");

const holidays = require("./commands/events/holidays");

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

const roll = require("./commands/random/roll");
const tf = require("./commands/random/tf");

const technokitty = require("./commands/lyrics/technokitty");
const united = require("./commands/lyrics/united");

const meme = require("./commands/jff/meme");
const meirl = require("./commands/jff/meirl");

const e621 = require("./commands/yiff/e621");
const agree = require("./commands/yiff/agree");

let commands = {
    // Dev commands
    'ping': (msg)=>{ping.command(msg);},
    'send': (msg, discordClient)=>{send.command(msg, discordClient);},

    // Info commands
    'help': (msg)=>{help.command(msg);},
    'pomoc': (msg)=>{help.command(msg);},
    'prikazy': (msg)=>{help.command(msg);},

    // Event commands
    'holidays': (msg)=>{holidays.command(msg);},
    'prazdniny': (msg)=>{holidays.command(msg);},

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

    // Roll
    'roll': (msg)=>{roll.command(msg);},

    'tf': (msg)=>{tf.command(msg);},

    // >_<
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

    'bye': (msg)=>{meme.command(msg, "bye")},
    'cau': (msg)=>{meme.command(msg, "bye")}
}

module.exports = {
    handleBotCommand: (msg, discordClient)=>{
        let modModeOn = globalVariables.get("modModeOn");

        if (modModeOn) { // If the bot is in restricted mode,
            if (msg.author.id != DEV_USERID) { // Check if the author is dev
                return;
            }
        }

        let commandMessageArray = msg.content.split(" "); // Split words of the message into an array

        let command = commandMessageArray[0].slice(1); // Extracts the command from the message
        command = command.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Get rid of shit in Slovak lang
        command = command.toLocaleLowerCase(); // Ignore the case by converting it to lower

        console.log(`[COMMAND] Recieved command COMMAND(${command}) ARRAY(${JSON.stringify(commandMessageArray)})`);

        if (mathHandler.processCommand(msg)) {return;} // This will check if the command is a math command and if it is, it will process and reply to it and return true;

        if (commands[command]) {
            commands[command](msg, discordClient);
        }

    }
}