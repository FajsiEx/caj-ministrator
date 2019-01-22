
const COLORS = require("../../consts").COLORS;
const ytdl = require("ytdl-core");

module.exports = {
    command: function(msg) {
        let commandMessageArray = msg.content.split(" ");

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

        let song = commandMessageArray[1]
        if (!song) {
            msg.channel.send({
                "embed": {
                    "title": "Play",
                    "color": COLORS.RED,
                    "description": `
                        Neni link ;(
                    `
                }
            });
            return;
        }


        let isValidYTlink = song.startsWith("https://www.youtube.com/watch?v=") || song.startsWith("https://youtube.com/watch?v=")

        if (!isValidYTlink) {
            msg.channel.send({
                "embed": {
                    "title": "Play",
                    "color": COLORS.GREEN,
                    "description": `
                        Prijmam len YT video linky (zatiaľ)
                    `
                }
            });
            return;
        }

        vc.join().then((connection)=>{
            let audioStream = ytdl(
                song, {
                audioonly: true
            });
    
            connection.playStream(audioStream);

            msg.channel.send({
                "embed": {
                    "title": "Play",
                    "color": COLORS.RED,
                    "description": `
                        Hrajem ${song}.
                    `
                }
            });

            msg.delete();
        });

        


    }
}