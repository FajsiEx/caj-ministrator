
const globalVariables = require("../../globalVariables");
const COLORS = require("../../consts").COLORS;
const DEV_USERID = require("../../consts").DEV_USERID;

module.exports = {
    command: function(msg) {
        let commandMessageArray = msg.content.split(" ");
        

        if (msg.author.id != DEV_USERID && msg.author.id != 305705560966430721) {
            msg.channel.send({
                "embed": {
                    "title": "Devs only. For now. If you also want this just DM @FajsiEx.",
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

        switch (commandMessageArray[1]) {
            case "12300759":
                globalVariables.set("osuRankMemberFx", {member: msg.member, osuID: commandMessageArray[1]});
                break;
                
            case "12180632":
                globalVariables.set("osuRankMemberCody", {member: msg.member, osuID: commandMessageArray[1]});
                break;
            
            default:
                msg.channel.send({
                    "embed": {
                        "title": `Osu! user id is not approved :/ DM @FajsiEx if you want have your osu! id added`,
                        "color": COLORS.RED
                    }
                });
                return;
        }

        msg.channel.send({
            "embed": {
                "title": `Osu! user id set. Nicknames can take up to 30 seconds to take changes.`,
                "color": COLORS.GREEN
            }
        });
    }
}