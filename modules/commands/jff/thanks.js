
const THX_REPLIES = [
    "You're welcome.",
    "No problem ;)",
    "My pleasure.",
    "Sure.",
    "Anytime :)"
]

module.exports = {
    command: function(msg) {
        msg.channel.send(THX_REPLIES[Math.floor(Math.random() * THX_REPLIES.length)]);
    }
}