
module.exports = {
    command: function(msg) {
        const GTG_REPLIES = [
            "I'll be waiting...Nigga",
            "Cya next time"
        ]
        msg.channel.send(GTG_REPLIES[Math.floor(Math.random() * GTG_REPLIES.length)]);
    }
}