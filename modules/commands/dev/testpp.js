
const COLORS = require("../../consts").COLORS;
const DEV_USERID = require("../../consts").DEV_USERID;
const globalVariables = require("../../globalVariables");

module.exports = {
    command: function(msg) {
        let commandMessageArray = msg.content.split(" ");

        let usersObj = globalVariables.get("usersObj");
        let events = globalVariables.get("events");
        
        if (msg.author.id != DEV_USERID) {
            msg.channel.send({
                "embed": {
                    "title": "Tento príkaz môžu vykonavať len developeri z dôvodu redukcie  spamu. sry :/",
                    "color": COLORS.RED
                }
            }).then(msg => msg.delete(5000));
            return;
        }

        switch (commandMessageArray[1]) {
            case "users":
                let usersObjString = "";

                let users = Object.keys(usersObj); // Gets keys (users) of the usersObj
                for (user of users) { // For each user
                    let userObj = usersObj[user];
                    usersObjString += `**ID:**${user} **UN:**${userObj.username} **AW:**${userObj.agreedWarning}\n`
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
                }).then(msg => msg.delete(5000));
        }
    }
}