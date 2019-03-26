
const COLORS = require("../../consts").COLORS;

module.exports = {
    command: function(msg,discordClient) {
        msg.channel.send({
            "embed": {
                "title": "Client object destroyed.",
                "color": COLORS.RED,
                "description": "Thanks for using me. Goodbye for now ;3",
            }
        });
        discordClient.destroy();
    }
};