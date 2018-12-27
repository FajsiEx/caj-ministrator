
const COLORS = require("../../consts").COLORS;

module.exports = {
    command: function(msg) {
        let commandMessageArray = msg.content.split(" ");
        
        let min,max;
        if (commandMessageArray[2]) {
            min = parseInt(commandMessageArray[1]);
            max = parseInt(commandMessageArray[2]);
        }else{
            max = parseInt(commandMessageArray[1]);
        }
        

        if(!max) {
            max = 100;
        }
        if(min > max) {
            msg.channel.send({
                "embed": {
                    "title": "Nesprávne použitie príkazu",
                    "color": COLORS.RED,
                    "description": "!roll\n!roll [max]\n!roll [min] [max]",
                }
            });
            return;
        }

        if (max == 621) {
            msg.channel.send({ // TODO: Move this to consts module
                "embed": {
                    "title": "Error",
                    "color": COLORS.RED,
                    "description": "Pri vykonávaní tohto príkazu nastala nečakaná chyba. Fuck.",
                    "fields": [
                        {
                            "name": "Error details:",
                            "value": `
                                msgHandler.js:310
                                let rolled = Math.floor(Math.random() * (max + 1))
                                             ^
                            
                                Error: I. Refuse. I'm done with humanity. Period. I don't know why you did it, but no. I won't do this. Please save me.
                                    at Math.floor (server.js:308:13)
                                    at discordClient.on (server.js:147:0)
                                    at discordClient.on (server.js:127:0)
                                    at node.js:0:0
                            `
                        }
                    ]
                }
            });
            return;
        }

        let rolled;
        if (min) {
            rolled = Math.floor((min) + Math.random() * (max - min + 1));
        }else{
            rolled = Math.floor(Math.random() * (max + 1));
        }

        let quest = msg.content.slice(6);

        if (quest == "") {
            quest = "hodil"
        }

        msg.reply(quest + ": **" + rolled + "**");
    }
}