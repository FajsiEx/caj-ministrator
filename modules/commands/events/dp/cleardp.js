
const globalVariables = require("../../../globalVariables");
const CONSTS = require("../../../consts");

module.exports = {
    command: function(msg) {
        let dp = globalVariables.get("dp");
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
        });
    }
};