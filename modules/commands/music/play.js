
const COLORS = require("../../consts").COLORS;

module.exports = {
    command: function(msg) {
        msg.channel.send({
            "embed": {
                "title": "Play",
                "color": COLORS.BLUE,
                "description": `
                    Debug test
                `
            }
        });
    }
}