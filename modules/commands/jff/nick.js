
const DEV_USERID = require("../../consts").DEV_USERID;

module.exports = {
    command: function(msg, discordClient) {
        msg.guild.member(discordClient.user).setNickname(msg.content.slice(6)); // !nick bla => bla
    }
}