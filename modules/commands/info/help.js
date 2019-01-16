
const COLORS = require("../../consts").COLORS;

module.exports = {
    command: function(msg) {
        msg.channel.send({
            "embed": {
                "title": "Help",
                "color": COLORS.BLUE,
                "description": `
                    [Všetky príkazy](https://fajsiex.ml/docs/caj-bot.html)
                    [GitHub repo (source)](https://github.com/FajsiEx/tea-bot)
                `
            }
        });
    }
}