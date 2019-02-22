
const globalVariables = require("../../globalVariables");
const COLORS = require("../../consts").COLORS;
const DEV_USERID = require("../../consts").DEV_USERID;

module.exports = {
    command: function(msg) {
        let commandMessageArray = msg.content.split(" ");

        msg.channel.send({
            "embed": {
                "title": "Coming soon™",
                "color": COLORS.RED
            }
        });
        return;

        if (msg.author.id != DEV_USERID && msg.author.id != 305705560966430721) {
            msg.channel.send({
                "embed": {
                    "title": "Devs only. For now. If you also want this just DM me.",
                    "color": COLORS.RED
                }
            });
            return;
        }

        msg.channel.send({
            "embed": {
                "title": "You have been set as osu member",
                "color": COLORS.BLUE
            }
        });

        if (!commandMessageArray[1]) {
            msg.channel.send({
                "embed": {
                    "title": `No osu! user id :/ fok. Don't play osu? Then go away.`,
                    "color": COLORS.RED
                }
            });
            return;
        }

        if (!commandMessageArray[2]) {
            msg.channel.send({
                "embed": {
                    "title": "No prefix for",
                    "color": COLORS.RED
                }
            });
            return;
        }

        globalVariables.set("osuRankMemberFx", msg.member);
    }
}