
const memeUrls = {
    excuse: "https://i.imgur.com/uVZQdsQ.jpg",
    tmyk: "https://i.ytimg.com/vi/GD6qtc2_AQA/maxresdefault.jpg",
    commit: "https://i.kym-cdn.com/photos/images/newsfeed/001/394/620/475.png",
    oof: "https://i.imgur.com/p7yQqZ8.png",
    pika: "https://i.imgur.com/sohWhy9.jpg",
    tsj: "https://i.imgur.com/8y9Uji5.jpg",
    killmeme: "https://thumbs.gfycat.com/HilariousEagerArmednylonshrimp-max-1mb.gif",
    yeet: "https://ih0.redbubble.net/image.562324831.7631/flat,550x550,075,f.u3.jpg",
    lookatthisdude: "https://i.imgur.com/ZHmHih5.png",
    lookatthisdude2: "https://derpicdn.net/img/2018/4/2/1697488/large.png",
    holdup: "https://i.imgur.com/fIAHgWM.jpg",
    wwtf: "https://media.giphy.com/media/y7LLt6Cmv62Lm/giphy.gif",
    ooth: "https://i.imgur.com/vwMOUZN.gif",
    kappa: "https://pbs.twimg.com/media/CP3AUr9WcAApMcw.png",
    speech: "https://i.imgur.com/0Z7cJQR.jpg",
    ohfuck: "https://i.imgur.com/EvCW3xu.png",
    bye: "https://ih0.redbubble.net/image.369279749.4315/ap,550x550,12x12,1,transparent,t.png",
    doit: "https://thumbs.gfycat.com/IncredibleOrganicBug-size_restricted.gif",
    forehead: "https://pbs.twimg.com/media/CtIhuSYVIAA-diM.jpg",
    facepalm: "https://ballzbeatz.com/wp-content/uploads/2018/01/Meme-s-Facepalm-Meme-Decal.jpg"
}

module.exports = {
    command: function(msg, memeName) {
        if (memeName == "lookatthisdude" && msg.author.id == 305705560966430721) {
            memeName+="2";
        }

        try {
            memeUrls[memeName]
        }catch(e){console.error(e); return;}
        
        msg.channel.send({
            "files": [memeUrls[memeName]]
        });
    }
}