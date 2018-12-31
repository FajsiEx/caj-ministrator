
const DEV_USERID = require("../../consts").DEV_USERID;

module.exports = {
    command: function(msg, discordClient) {
        if (msg.author.id != DEV_USERID) {
            msg.channel.send({
                "embed": {
                    "title": "Nope.",
                    "description": "NOOOOT GONNA HAPPEEEEEEN.",
                    "color": COLORS.RED
                }
            });
            return;
        }

        msg.guild.member(discordClient.user).setNickname(msg.content.slice(6)); // !nick bla => bla
    }
}