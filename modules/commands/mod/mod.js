
const COLORS = require("../../consts").COLORS;
const DEV_USERID = require("../../consts").DEV_USERID;
const globalVariables = require("../../globalVariables");

module.exports = {
    command: function(msg) {
        let commandMessageArray = msg.content.split(" ");

        let modModeOn = globalVariables.get("modModeOn");

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

        globalVariables.set("modModeOn", modModeOn);
        
    }
}