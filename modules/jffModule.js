
module.exports = {
    msgEaterEggReply: (msg, message)=>{
        if (message.indexOf('click the circles') > -1) {
            msg.reply(`to the beat. ***CIRCLES!***`);
            return;
        }else if (message.indexOf('fuck you') > -1) {
            msg.reply(`no u`);
            return;
        }else if (message.indexOf('e621') > -1) {
            msg.reply(`!roll šanca ze pôjdeš do pekla`);
            return;
        }
    }
}