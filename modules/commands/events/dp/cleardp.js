
const globalVariables = require("../../../globalVariables");
const CONSTS = require("../../../consts");

module.exports = {
    command: function(msg) {
        let dp = globalVariables.get("dp");

        if (!dp) { // If the object is empty
            msg.channel.send({
                "embed": {
                    "title": "No DP",
                    "description": `
                        Can't delete nothing. Or can I?
                    `,
                    "color": CONSTS.COLORS.RED
                }
            });
            return;
        }

        dp.msg.delete(); // Delete the original message

        globalVariables.set("dp", false);

        msg.channel.send({
            "embed": {
                "title": "DP Cleared",
                "description": `
                    DP was cleared successfully.
                    Make a DP with !makedp
                `,
                "color": CONSTS.COLORS.GREEN
            }
        }); // TODO: Autodelete this
    }
};