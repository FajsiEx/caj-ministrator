
const smallFunctions = require("./smallFunctions");
const COLORS = require("./consts").COLORS;

module.exports = {
    nuke: (msg, commandMessageArray)=>{
        if (commandMessageArray[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().indexOf("me") > -1) {
            msg.channel.send({
                "embed": {
                    "title": "Hey,",
                    "description": "how 'bout you fuck off. Seriously. Don't. This is not place for this. Stop it, get some help.",
                    "color": COLORS.RED
                }
            }).then(msg => msg.delete(10000));
            return;
        }

        if(!smallFunctions.checkAdmin(msg)) {
            msg.channel.send({
                "embed": {
                    "title": "Tento príkaz môžu vykonávať len admini lol",
                    "color": COLORS.RED
                }
            });
            return;
        }

        let limit = parseInt(commandMessageArray[1]);
        if(!limit) {
            msg.channel.send({
                "embed": {
                    "title": "Chýba koľko správ vymazať",
                    "color": COLORS.RED
                }
            });
            return;
        }

        let timer = parseInt(commandMessageArray[2]);
        if (!timer) {timer = 0}
        timer = timer * 1000;

        if (timer > 0) {
            msg.channel.bulkDelete(limit).then(() => {
                msg.channel.send({
                    "embed": {
                        "title": "TACTICAL NUKE INCOMING IN "+ timer/1000 + " SECONDS!!! EVACUATE IMMEDIATELY!!!",
                        "color": COLORS.YELLOW
                    }
                }).then(msg => msg.delete(timer));
            });
        }

        setTimeout(()=>{
            console.log("[NUKE] Nuked "+ limit + " messages.");
            msg.channel.bulkDelete(limit).then(() => {
                msg.channel.send({
                    "embed": {
                        "title": "Vymazal som "+ limit + " správ.",
                        "color": COLORS.GREEN
                    }
                }).then(msg => msg.delete(5000));
            });
        }, timer);
    }
}