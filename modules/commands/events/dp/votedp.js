
const globalVariables = require("../../../globalVariables");
const CONSTS = require("../../../consts");

module.exports = {
    command: function(msg) {
        let commandMessageArray = msg.content.split(" ");

        let dp = globalVariables.get("dp");
        console.dir(dp);

        if (!dp) { // If the object is empty
            msg.channel.send({
                "embed": {
                    "title": "No DP",
                    "description": `
                        You can't vote on nothing...
                    `,
                    "color": CONSTS.COLORS.RED
                }
            });
            return;
        }

        let dpMsg = dp.msg; // Get the dpmsg from dp obj

        dpMsg.reactions.array()[0].fetchUsers().then((users)=>{
            let usersFound = users.array().filter((e)=>{
                return (e.id == msg.author.id);
            });

            if (usersFound.length == 0) {
                msg.channel.send({
                    "embed": {
                        "title": "You aren't going to the DP",
                        "description": `
                            You must click on the ✅ on the DP post to register. THEN you can vote.
                        `,
                        "color": CONSTS.COLORS.RED
                    }
                });
                msg.delete(1000);
                return;
            }

            if (!commandMessageArray[1]) { // If the object is empty
                msg.channel.send({
                    "embed": {
                        "title": "No subject to vote on",
                        "description": `
                            You can't vote nothing...
                            !votedp ZEQ/STN/MECH/SJL/...

                            ex. !votedp ZEQ
                        `,
                        "color": CONSTS.COLORS.RED
                    }
                });
                msg.delete(1000);
                return;
            }
        });
    }
};