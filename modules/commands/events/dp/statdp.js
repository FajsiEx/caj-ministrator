
const globalVariables = require("../../../globalVariables");
const CONSTS = require("../../../consts");

module.exports = {
    command: function(msg, discordClient) {
        let dp = globalVariables.get("dp");
        console.dir(dp);

        if (!dp) { // If the object is empty
            msg.channel.send({
                "embed": {
                    "title": "No DP",
                    "description": `
                        You must make DP like so:
                        *!makedp detailsdetailsdetailsdetails*
                    `,
                    "color": CONSTS.COLORS.RED
                }
            }).then((botMsg)=>{
                botMsg.delete(60000);
            });
            msg.delete(1000);
            return;
        }

        let dpMsg = dp.msg; // Get the dpmsg from dp obj

        console.dir(dpMsg.reactions);

        let members = dpMsg.guild.members.array();

        dpMsg.reactions.array()[0].fetchUsers().then((users)=>{
            let comingNicks = [];
            users.array().forEach(user => {
                if (user.id == discordClient.user.id) {return false;} // Omit bot's reaction

                // Find user in server members
                let member = members.filter((e)=>{
                    return (e.id == user.id);
                })[0];
                
                if (member.nickname) {
                    comingNicks.push({nick: member.nickname, vote: dp.votes[user.id] || "?"});
                }else{
                    comingNicks.push({nick: user.username, vote: dp.votes[user.id] || "?"});
                }
                
            });

            let comingPeopleString = "";
            comingNicks.forEach((e)=>{
                comingPeopleString += `**${e.vote}** - ${e.nick}\n`;
            });

            if (comingNicks.length == 0) {
                comingPeopleString = "None";
            }

            msg.channel.send({
                "embed": {
                    "title": "DP Stats",
                    "description": `
                        ${dp.details}
                        **List of people coming (${comingNicks.length}):**
                        ${comingPeopleString}
                    `,
                    "color": CONSTS.COLORS.BLUE
                }
            }).then((botMsg)=>{
                botMsg.delete(60000);
            });
            msg.delete(1000);
        });
    }
};