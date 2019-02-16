
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
            }).then((botMsg)=>{
                botMsg.delete(60000);
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
                }).then((botMsg)=>{
                    botMsg.delete(60000);
                });
                msg.delete(1000);
                return;
            }

            let subjectVoted = commandMessageArray[1];

            if (!subjectVoted) {
                msg.channel.send({
                    "embed": {
                        "title": "No subject to vote on",
                        "description": `
                            You can't vote nothing...
                            !votedp ${CONSTS.SUBJECTS.join(",")}

                            ex. !votedp ZEQ
                        `,
                        "color": CONSTS.COLORS.RED
                    }
                }).then((botMsg)=>{
                    botMsg.delete(60000);
                });
                msg.delete(1000);
                return;
            }

            
            if (CONSTS.SUBJECTS.indexOf(subjectVoted) == -1) {
                msg.channel.send({
                    "embed": {
                        "title": "Invalid subject to vote on",
                        "description": `
                            You can't vote on that...
                            !votedp ${CONSTS.SUBJECTS.join(",")}

                            ex. !votedp ZEQ
                        `,
                        "color": CONSTS.COLORS.RED
                    }
                }).then((botMsg)=>{
                    botMsg.delete(60000);
                });
                msg.delete(1000);
                return;
            }

            // AFTER CHECKS
            // Vote is now valid so we can store it
            dp.votes[msg.author.id] = subjectVoted;

            msg.channel.send({
                "embed": {
                    "title": "Voted on " + subjectVoted,
                    "description": `
                        Great job! Your vote is now counted.
                        To change it, !votedp again.
                    `,
                    "color": CONSTS.COLORS.GREEN
                }
            }).then((botMsg)=>{
                botMsg.delete(60000);
            });
            msg.delete(1000);
        });
    }
};