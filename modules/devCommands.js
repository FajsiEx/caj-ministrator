
const DEV_USERID = require("./consts").DEV_USERID;

module.exports = {
    testread: (msg, commandMessageArray)=> {
        if (msg.author.id != DEV_USERID) {
            msg.channel.send({
                "embed": {
                    "title": "Tento príkaz môžu vykonavať len developeri z dôvodu redukcie spamu. sry :/",
                    "color": COLORS.RED
                }
            });
            return;
        }

        switch (commandMessageArray[1]) {
            case "events":
                msg.channel.send({
                    "embed": {
                        "title": "JSON dump of events object",
                        "color": COLORS.BLUE,
                        "description": JSON.stringify(events) + "\n**This data is stored in the program memory. Not in the database.**"
                    }
                });
                break;
            case "users":
                msg.channel.send({
                    "embed": {
                        "title": "JSON dump of users object",
                        "color": COLORS.BLUE,
                        "description": JSON.stringify(usersObj)
                    }
                });
                break;
            default:
                msg.channel.send({
                    "embed": {
                        "title": "Invalid attr",
                        "color": COLORS.RED,
                        "description": "Enter valid attr for testread command."
                    }
                });
        }
    },

    testpp: (msg, commandMessageArray)=>{
        if (msg.author.id != DEV_USERID) {
            msg.channel.send({
                "embed": {
                    "title": "Tento príkaz môžu vykonavať len developeri z dôvodu redukcie  spamu. sry :/",
                    "color": COLORS.RED
                }
            });
            return;
        }

        switch (commandMessageArray[1]) {
            case "users":
                let usersObjString = "";

                let users = Object.keys(usersObj); // Gets keys (users) of the usersObj
                for (user of users) { // For each user
                    let userObj = usersObj[user];
                    usersObjString += `**ID:**${user} **UN:**${userObj.username} **TO:**${Math.round(userObj.timeout*100)/100} **ART:**${userObj.alreadyReportedTimeout} **MPM:**${userObj.mpm} **GNT:**${userObj.alreadyWishedGN} **WD:**${userObj.warned}\n`
                }

                msg.channel.send({
                    "embed": {
                        "title": "PrettyPrint for usersObj",
                        "color": COLORS.BLUE,
                        "description": usersObjString
                    }
                });
                break;

            default:
                msg.channel.send({
                    "embed": {
                        "title": "Invalid attr",
                        "color": COLORS.RED,
                        "description": "Enter valid attr for testpp command."
                    }
                });
        }
    }
}