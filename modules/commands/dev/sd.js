
const COLORS = require("../../consts").COLORS;
const DEV_USERID = require("../../consts").DEV_USERID;
const globalVariables = require("../../globalVariables");

let shutdownTimeoutId;

module.exports = {
    command: function(msg, discordClient) {
        let commandMessageArray = msg.content.split(" ");

        if (commandMessageArray[1] == undefined) {
            msg.channel.send({
                "embed": {
                    "title": "No attr",
                    "color": COLORS.RED,
                    "description": "No attr for !sd command."
                }
            });
            return;
        }

        if (msg.author.id != DEV_USERID) {
            msg.channel.send({
                "embed": {
                    "title": "Dev only.",
                    "color": COLORS.RED
                }
            });
            return;
        }

        let timeout = parseInt(commandMessageArray[1]);

        timeout = timeout * 60000;

        globalVariables.set('disableSave', true);

        discordClient.user.setStatus('idle').then(()=>{
            discordClient.user.setActivity("myself die in " + commandMessageArray[1] + " min.", { type: "watching" });
        });

        shutdownTimeoutId = setTimeout(()=>{
            discordClient.user.setStatus('offline').then(()=>{
                discordClient.user.setActivity("nothing.", { type: "watching" });
            });
            setTimeout(()=>{process.exit(50);}, 5000);
        }, timeout);

        msg.channel.send({
            "embed": {
                "title": "*Done*",
                "color": COLORS.GREEN,
                "description": "Shutdown was scheduled."
            }
        });
    }
}