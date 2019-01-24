
const COLORS = require("../../consts").COLORS;
const DEV_USERID = require("../../consts").DEV_USERID;

module.exports = {
    command: function(msg, discordClient) {
        let commandMessageArray = msg.content.split(" ");

        if (msg.author.id != DEV_USERID) {
            msg.channel.send({
                "embed": {
                    "title": "Dev only.",
                    "color": COLORS.RED
                }
            });
            return;
        }

        if (!commandMessageArray[1]) {
            msg.channel.send({
                "embed": {
                    "title": "Nesprávne použitie príkazu",
                    "color": COLORS.RED,
                    "description": "!friend <userid>",
                }
            });
            return;
        }

        try {
            discordClient.fetchUser(commandMessageArray[1]).then((user)=>{
                discordClient.user.addFriend(user);
            });
        }catch(e){
            msg.channel.send({
                "embed": {
                    "title": "Error",
                    "color": COLORS.RED,
                    "description": "Rip no.",
                }
            });
        }
    }
}