
const globalVariables = require("../../../globalVariables");
const CONSTS = require("../../../consts");

module.exports = {
    command: function(msg) {
        let commandMessageArray = msg.content.split(" ");

        if (globalVariables.get("dp")) { // If there is already dp
            msg.channel.send({
                "embed": {
                    "title": "DP already there",
                    "description": `
                        If you want to make a DP you must **!cleardp** first
                    `,
                    "color": CONSTS.COLORS.RED
                }
            });
            return;
        }

        let lOfCommand = commandMessageArray[0].length + 1;
        let dpDetails = msg.content.slice(lOfCommand);

        if (!dpDetails) {
            msg.channel.send({
                "embed": {
                    "title": "Where are the details?",
                    "description": `
                        You must enter the details like so:
                        *!makedp hfdsjhfjdshfkjdshjfdshkjfdbbcbvncxbvn*
                        Your command message will be then replaced by bot's voting message.
                    `,
                    "color": CONSTS.COLORS.RED
                }
            });
            return;
        }

        let dp = {};

        dp.details = dpDetails;

        msg.channel.send({
            "embed": {
                "title": "DP",
                "description": `
                    ${dpDetails}

                    **If you want to go, click on ✅ and you will be registered**
                `,
                "color": CONSTS.COLORS.PINK
            }
        }).then((dpMsg)=>{
            msg.delete(); // Delete the OP msg
            dpMsg.react("✅"); // React to own msg with checkmark
            dpMsg.pin(); // Pin the msg
            dp.msg = dpMsg; // Store this msg
            globalVariables.set("dp", dp); // And finally save it
        });
    }
}