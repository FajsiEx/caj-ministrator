
const COLORS = require("../../consts").COLORS;

module.exports = {
    command: function(msg) {
        if (new Date().getDay() == 3) {
            msg.channel.send(`AAALLEEE ČAAAAAUUU!!! Dneska je **Streda zaMEMOVAŤ TREBA**`);
        }else{
            msg.reply(`AAALLEEE ČAAAAAUUU!!! Dneska je **${WEEK_DAYS[new Date().getDay()]}**`);
        }
    }
}