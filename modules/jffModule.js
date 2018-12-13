/*

    This module adds various easter eggs and shit like that
    Nothing special

*/

const request = require("request");
const WEEK_DAYS = require("./consts").WEEK_DAYS;
const COLORS = require("./consts").COLORS;
const globalVariables = require("./globalVariables");

const memeUrls = {
    excuse: "https://i.imgur.com/uVZQdsQ.jpg",
    tmyk: "https://i.kym-cdn.com/photos/images/newsfeed/001/394/620/475.png",
    commit: "https://i.kym-cdn.com/photos/images/newsfeed/001/394/620/475.png",
    oof: "https://i.imgur.com/p7yQqZ8.png",
    pika: "https://i.imgur.com/sohWhy9.jpg",
    tsj: "https://i.imgur.com/8y9Uji5.jpg",
    killmeme: "https://thumbs.gfycat.com/HilariousEagerArmednylonshrimp-max-1mb.gif",
    yeet: "https://ih0.redbubble.net/image.562324831.7631/flat,550x550,075,f.u3.jpg",
    lookatthisdude: "https://i.imgur.com/ZHmHih5.png",
    lookatthisdude2: "https://derpicdn.net/img/2018/4/2/1697488/large.png",
    holdup: "https://i.redd.it/op68ltgjypm11.jpg"
}

module.exports = {
    msgEaterEggReply: (msg, message)=> {
        message = message.toLocaleLowerCase(); //
        if (message.indexOf('click the circles') > -1) {
            msg.reply(`to the beat. ***CIRCLES!***`);
            return;
        }else if (message.indexOf('fuck you') > -1) {
            msg.reply(`no u`);
            return;
        }else if (message.indexOf('no u') > -1) {
            msg.reply(`no u`);
            return;
        }
    },

    ahojCommand: (msg)=> {
        msg.reply("Ahoj");
    },

    sendMeme: (msg, memeName)=> {
        if (memeName == "lookatthisdude" && msg.author.id == 305705560966430721) {
            memeName+="2";
        }

        try {
            memeUrls[memeName]
        }catch(e){console.error(e); return;}
        
        msg.channel.send({
            "files": [memeUrls[memeName]]
        });
    },

    skapReply: (msg)=> {
        msg.channel.send("```js ((skap)^2) / hned ```");
    },

    zhniReply: (msg)=> {
        msg.channel.send("Sa najedz ked si zhni lol");
    },

    ripReply: (msg)=> {
        msg.channel.send("Rest in piss, forever miss...");
    },

    goodNightWisher: (msg, author_id)=>{
        let message = msg.content;
        let usersObj = globalVariables.get("usersObj");

        if (((message.indexOf('idem spat') > -1) || (message.indexOf('idem spať') > -1)) && usersObj[author_id].alreadyWishedGN < 1) {
            let sleeperEmoji = discordClient.emojis.find(emoji => emoji.name == "Sleeper")
            msg.reply(`Dobrú noc! ${sleeperEmoji} ${sleeperEmoji} ${sleeperEmoji} ${sleeperEmoji} ${sleeperEmoji}`);
            usersObj[author_id].alreadyWishedGN = 15
            return;
        }

        globalVariables.set("usersObj", usersObj);
    },

    sendRedditMeme: (msg)=> {
        request({
            url: "https://www.reddit.com/r/me_irl/random/.json",
            json: true
        }, (err, res, data)=>{
            if (!err && res.statusCode == 200) {
                try{
                    msg.channel.send({
                        "files": [data[0].data.children[0].data.url]
                    });
                }catch(e){
                    console.error(e);
                    msg.channel.send({
                        "embed": {
                            "title": "Error",
                            "color": COLORS.RED,
                            "description": "Vyskytla sa chyba pri requestovaní random postu z redditu."
                        }
                    });
                }
            }else{
                msg.channel.send({
                    "embed": {
                        "title": "Error",
                        "color": COLORS.RED,
                        "description": "Vyskytla sa chyba pri requestovaní random postu z redditu."
                    }
                });
            }
        });
    },

    owoReplier: (msg, discordClient)=>{
        let message = msg.content;

        if (message == "Owo uwU") {
            msg.channel.send({
                "embed": {
                    "title": "Client object destroyed.",
                    "color": COLORS.RED,
                    "description": "Thanks for using me. Goodbye for now ;)",
                }
            });
            discordClient.destroy();
            return true;
        }
    
        if (message.toLocaleLowerCase() == "owo" || message.toLocaleLowerCase() == "!owo") {
            msg.channel.send("UwU");
            return true; // dont continue executing the code
        }else if (message.toLocaleLowerCase() == "uwu" || message.toLocaleLowerCase() == "!uwu") {
            msg.channel.send("^w^");
            return true; // dont continue executing the code
        }else if (message.toLocaleLowerCase() == "^w^" || message.toLocaleLowerCase() == "!^w^") {
            msg.channel.send("O.o");
            return true; // dont continue executing the code
        }else if (message.toLocaleLowerCase() == "o.o" || message.toLocaleLowerCase() == "!o.o") {
            msg.channel.send("=_=");
            return true; // dont continue executing the code
        }else if (message.toLocaleLowerCase() == "=_=" || message.toLocaleLowerCase() == "!=_=") {
            msg.channel.send("EwE");
            return true; // dont continue executing the code
        }else if (message.toLocaleLowerCase() == "ewe" || message.toLocaleLowerCase() == "!ewe") {
            msg.channel.send("XwX");
            return true; // dont continue executing the code
        }else if (message.toLocaleLowerCase() == "xwx" || message.toLocaleLowerCase() == "!xwx") {
            let author_id = msg.author.id;
            if (author_id == 305705560966430721) { // To protect the innocent.
                msg.channel.send("E621");
            }else{
                msg.reply("***YOU DON'T WANT TO GO DEEPER DOWN THIS RABBIT HOLE.*** Trust me, I'm protecting you. Please, listen to me. *Please.*");
            }
            
            return true; // dont continue executing the code
        }else{
            return false; // continue executing the code
        }
    },

    spravnyPrikazCommand: (msg)=>{
        msg.reply({
            "embed": {
                "title": "Si myslíš, že si múdry, čo?",
                "color": COLORS.RED,
                "description": 'Hahahahahahahahahahahahaha...strašne vtipné normálne sa smejem XD'
            }
        });
    },
    
    aleCauCommand: (msg)=>{
        if (new Date().getDay() == 3) {
            msg.channel.send(`AAALLEEE ČAAAAAUUU!!! Dneska je **Streda zaMEMOVAŤ TREBA**`);
        }else{
            msg.reply(`AAALLEEE ČAAAAAUUU!!! Dneska je **${WEEK_DAYS[new Date().getDay()]}**`);
        }
    },

    technoKittyReply: (msg)=> {
        msg.channel.send({
            "embed": {
                "title": "Techno kitty by *S3RL*",
                "color": COLORS.BLUE,
                "description": `
Up in the sky
Flyiiing way up high
I can't beliieve my eyes
A techno feeeline
so fly
Up high
And neeeveer come down
I'll move
Like you
To the techno sound

***TECHNO CAT***

Techno kitty, kitty
You're so pretty kitty
Techno Kitty with a rocket pack
Techno kitty, kitty
You're so pretty kitty
Techno Kitty with wings on your back
Flying through the air so high
You're like a shooting star that lights up the sky
Techno kitty, kitty
You're so pretty kitty
Techno kitty
Tec-tec-techno cat
***TECHNO CAT***
How?
*Hooow?*
How'd you get there
Way up in the air
You're souring so free
Cute fluffy kitty
So fly
Up high
And neeeveer come down
I'll move
Like you
To the techno sound
***TECHNO CAT***
Techno kitty, kitty
You're so pretty kitty
Techno Kitty with a rocket pack
Techno kitty, kitty
You're so pretty kitty
Techno Kitty with wings on your back
Flying through the air so high
You're like a shooting star that lights up the sky
Techno kitty, kitty
You're so pretty kitty
Techno kitty
Tec-tec-techno cat
***TECHNO CAT***
How?
*Hooow?*
                `
            }
        });
    }
}