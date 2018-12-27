/*

    This module adds various easter eggs and shit like that
    Nothing special

*/

const request = require("request");
const WEEK_DAYS = require("./consts").WEEK_DAYS;
const COLORS = require("./consts").COLORS;
const DEV_USERID = require("./consts").DEV_USERID;

module.exports = {
    msgEaterEggReply: (msg, message)=> {
        if(message.length > 64) {return;}

        message = message.toLocaleLowerCase();

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
        
    },

    zhniReply: (msg)=> {
        
    },

    goodNightWisher: (msg, author_id, discordClient)=>{
        let message = msg.content;

        if ((message.indexOf('idem spat') > -1) || (message.indexOf('idem spať') > -1)) {
            let sleeperEmoji = discordClient.emojis.find(emoji => emoji.name == "Sleeper")
            msg.reply(`Dobrú noc! ${sleeperEmoji} ${sleeperEmoji} ${sleeperEmoji} ${sleeperEmoji} ${sleeperEmoji}`);
            usersObj[author_id].alreadyWishedGN = 15
            return;
        }
    },

    sendRedditMeme: (msg)=> {

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
            if (msg.author.id == DEV_USERID) {msg.channel.send("My master, why did you stoop so low? UwU away."); return true;}
            msg.channel.send("UwU");
            return true; // dont continue executing the code
        }else if (message.toLocaleLowerCase() == "uwu" || message.toLocaleLowerCase() == "!uwu") {
            if (msg.author.id == DEV_USERID) {msg.channel.send("My master, why did you stoop so low? ^w^ away."); return true;}
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
                msg.channel.send("E621").then(msg => msg.delete(5000));
            }else{
                msg.reply("***YOU DON'T WANT TO GO DEEPER DOWN THIS RABBIT HOLE.*** Trust me, I'm protecting you. Please, listen to me. *Please.*").then(msg => msg.delete(5000));
            }
            
            return true; // dont continue executing the code
        }else{
            return false; // continue executing the code
        }
    },

    roll: (msg, commandMessageArray)=>{
        
    },

    tf: (msg, commandMessageArray)=>{
        
    },
    
    aleCauCommand: (msg)=>{
        
    },

    wipReply: (msg, type)=> {
        if (!type) {
            msg.channel.send({
                "embed": {
                    "title": "Work in progress",
                    "color": COLORS.YELLOW,
                    "description": "Stále na tom robím...tak počkaj a uvidíš zlaté prasiatko..."
                }
            });
        }else if(type==1) {
            msg.channel.send({
                "embed": {
                    "title": "Work in progress",
                    "color": COLORS.YELLOW,
                    "description": "Stále na tom robím...tak počkaj a uvidíš plynovú komoru..."
                }
            });
        }else{
            console.warn("[WIP_REPLY] Unknown reply type.")
        }
    }   
}