
const COLORS = require("../../consts").COLORS;
const VERSION = require("../../consts").VERSION;

module.exports = {
    command: function(msg) {
        msg.channel.send({
            "embed": {
                "title": "Help",
                "color": COLORS.BLUE,
                "description": `
                    Tea-bot project ${VERSION}
                    [Všetky príkazy a changelog](https://fajsiex.ml/docs/tea-bot.html)
                    [GitHub repo (source)](https://github.com/FajsiEx/tea-bot)
                `
            }
        });
    }
}