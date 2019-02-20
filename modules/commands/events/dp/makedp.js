
const smallFunctions = require("../../../smallFunctions");
const globalVariables = require("../../../globalVariables");
const CONSTS = require("../../../consts");

module.exports = {
    command: function(msg) {
        let commandMessageArray = msg.content.split(" ");

        if(!smallFunctions.checkAdmin(msg)) {
            msg.channel.send({
                "embed": {
                    "title": "Iba admin môže vytvárať DP",
                    "color": COLORS.RED
                }
            }).then(msg => msg.delete(10000));
            return;
        }

        if (msg.channel.type != 'text') {
            msg.channel.send({
                "embed": {
                    "title": "Funguje len v server text kanáloch",
                    "description": `
                        Použi ho v text kanále nejakého serveru. lol.
                    `,
                    "color": CONSTS.COLORS.RED
                }
            });
            return;
        }

        if (globalVariables.get("dp")) { // If there is already dp
            msg.channel.send({
                "embed": {
                    "title": "DP already there",
                    "description": `
                        If you want to make a DP you must **!cleardp** first
                    `,
                    "color": CONSTS.COLORS.RED
                }
            });
            return;
        }

        let lOfCommand = commandMessageArray[0].length + 1;
        let dpDetails = msg.content.slice(lOfCommand);

        if (!dpDetails) {
            msg.channel.send({
                "embed": {
                    "title": "Where are the details?",
                    "description": `
                        You must enter the details like so:
                        *!makedp hfdsjhfjdshfkjdshjfdshkjfdbbcbvncxbvn*
                        Your command message will be then replaced by bot's voting message.
                    `,
                    "color": CONSTS.COLORS.RED
                }
            });
            return;
        }

        let dp = {};

        dp.details = dpDetails;
        dp.guild = msg.guild;
        dp.msgs = [];
        dp.joined = [];

        let members = msg.guild.members.array(); // Gets an array of members of guild
        
        members.forEach((member)=>{
            member.send({
                "embed": {
                    "title": "Doplnková hodina",
                    "description": `
                        ${dpDetails}
    
                        **Odpovedz s !dp ${CONSTS.SUBJECTS.join("/")} ak sa chceš prihlásiť**
                        Napr: !dp ZEQ
                    `,
                    "color": CONSTS.COLORS.PINK
                }
            });
        });

        msg.channel.send({
            "embed": {
                "title": "Doplnková hodina",
                "description": `
                    ${dpDetails}

                    **Bola vytvorená a správa sa posiela všetkým...**
                `,
                "color": CONSTS.COLORS.GREEN
            }
        }).then(()=>{
            globalVariables.set("dp", dp); // Save it
        });
    }
};