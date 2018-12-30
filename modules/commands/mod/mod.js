
const COLORS = require("../../consts").COLORS;
const globalVariables = require("../../globalVariables");
const smallFunctions = require("../../smallFunctions");

module.exports = {
    command: function(msg) {
        let modModeOn = globalVariables.get("modModeOn");

        if(!smallFunctions.checkAdmin(msg)) { // Yes I have allowed this.
            msg.channel.send({
                "embed": {
                    "title": "Admin only.",
                    "color": COLORS.RED
                }
            }).then(msg => msg.delete(5000));
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