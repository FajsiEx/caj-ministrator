
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

        let vc = msg.member.voiceChannel;
        if (!vc) {
            msg.channel.send({
                "embed": {
                    "title": "Play",
                    "color": COLORS.RED,
                    "description": `
                        Nie si vo voice channeli ;_(
                    `
                }
            });
            return;
        }
        vc.join();
    }
}