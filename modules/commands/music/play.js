
const COLORS = require("../../consts").COLORS;
const ytdl = require("ytdl-core");
const fetchVideoInfo = require('youtube-info');
const fs = require("fs");

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
                    "color": COLORS.RED,
                    "description": `
                        Prijmam len YT video linky (zatiaľ)
                    `
                }
            });
            return;
        }

        let videoID = song.split("=")[1]
        console.log("[PLAY_COMM] Video ID: " + videoID);

        let dlMsg;

        msg.delete();
        

        let fileName = videoID + ".mp3";

        if (fs.existsSync(fileName)) {
            this.playFile(msg, vc, fileName, videoID, false);
        }else{
            msg.channel.send({
                "embed": {
                    "title": "Sťahujem...",
                    "color": COLORS.BLUE,
                    "description": `
                        Sťahuje sa ${song}... **Toto bude trvať pár sekúnd...**
                    `
                }
            }).then((sentMsg)=>{dlMsg = sentMsg});

            let stream = ytdl(
                song, {
                audioonly: true
            });
            stream.pipe(fs.createWriteStream(fileName))
            .on('finish', () => {
                this.playFile(msg, vc, fileName, videoID, dlMsg);
            });
        }
    },

    playFile: function(msg, vc, fileName, vID, dlMsg) {
        vc.join().then(connection => {
            console.log('[PLAY_COMM] Down done. Joined a VC.');

            fetchVideoInfo(vID, (err, info)=> {
                if (err) throw new Error(err);
                
                let playEmbedObj = {
                    "embed": {
                        "title": "Hrajem...",
                        "color": COLORS.GREEN,
                        "description": `
                            Hraje sa **${info.title}** od **${info.owner}** (${info.duration}s).
                        `,
                        "footer": {
                            "text": "Music príkazy sú ešte v BETA stave. Možno budú fungovať, možno nie. Stabilita sa zlepši s nasledujúcimi verziami :)"
                        }
                    }
                };
    
                if (!dlMsg) {
                    msg.channel.send(playEmbedObj);
                }else{
                    dlMsg.edit(playEmbedObj);
                }
    
                connection.playStream(fs.createReadStream(fileName)).on('end', () => {
                    console.log('[PLAY_COMM] Song done. Leaving the VC.');
                    connection.channel.leave();
                }).catch(console.error);
            });
        }).catch(console.error);
    }
}