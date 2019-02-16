
const globalVariables = require("../../../globalVariables");
const CONSTS = require("../../../consts");

module.exports = {
    command: function(msg) {
        let commandMessageArray = msg.content.split(" ");

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

        let dp = globalVariables.get("dp");

        msg.channel.send({
            "embed": {
                "title": "DP",
                "description": `
                    ${dpDetails}

                    **If you want to go, click on ✅ and you will be registered**
                `,
                "color": CONSTS.COLORS.PINK
            }
        });
    }
}