
const globalVariables = require("./globalVariables");
const DEV_USERID = require("./consts").DEV_USERID;
const COLORS = require("./consts").COLORS;

module.exports = {
    selfTest: (msg, commandMessageArray)=> {
        if (msg.author.id != DEV_USERID) {
            msg.channel.send({
                "embed": {
                    "title": "Dev only.",
                    "color": COLORS.RED
                }
            });
            return;
        }

        // TODO: Add .then(msg => msg.delete(5000)) to dev only replies.

        msg.channel.send({
            "embed": {
                "title": "Running self-test...this may take a while...",
                "color": COLORS.BLUE
            }
        }).then((msg)=>{
            setTimeout(()=>{
                msg.edit({
                    "embed": {
                        "title": "Self-test done.",
                        "color": COLORS.GREEN
                    }
                });
            }, 5000)
        });
    },

    testread: (msg, commandMessageArray)=> {
        let usersObj = globalVariables.get("usersObj");
        let events = globalVariables.get("events");

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
        let usersObj = globalVariables.get("usersObj");
        let events = globalVariables.get("events");
        
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