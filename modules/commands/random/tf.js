
module.exports = {
    command: function(msg) {
        let rolled = Math.floor(Math.random() * 100);

        let quest = msg.content.slice(4);

        if (rolled <= 50) {
            rolled = "nie";
        }else{
            rolled = "áno";
        }

        msg.reply(rolled);
    }
}