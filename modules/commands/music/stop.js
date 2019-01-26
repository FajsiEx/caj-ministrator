
const globalVariables = require("../../globalVariables");
const COLORS = require("../../consts").COLORS;

module.exports = {
    command: function(msg) {
        let vc = globalVariables.get("vc");

        if (!vc) {
            msg.channel.send({
                "embed": {
                    "title": "Stop",
                    "color": COLORS.RED,
                    "description": `
                        Nič nehraje.
                    `
                }
            });
            return;
        }

        vc.disconnect();

        msg.channel.send({
            "embed": {
                "title": "Stop",
                "color": COLORS.GREEN,
                "description": `
                    Done.
                `
            }
        });
    }
}