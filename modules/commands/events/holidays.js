
const COLORS = require("../../consts").COLORS;
const HOLIDAYS = require("../../consts").HOLIDAYS;

module.exports = {
    command: function(msg) {
        let holidaysString = "";
        nowStamp = new Date().getTime();

        HOLIDAYS.forEach((e)=>{
            console.log(e);
            deltaStamp = e.date.getTime() - nowStamp;
            console.log(deltaStamp);
            days = Math.floor(deltaStamp / 86400000);
            console.log(days);
            
            holidaysString+=`**${days}d** - ${e.name}\n`
        });

        msg.channel.send({
            "embed": {
                "title": "Prázdniny",
                "color": COLORS.BLUE,
                "description": holidaysString
            }
        });
    }
}