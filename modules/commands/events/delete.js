
const COLORS = require("../../consts").COLORS;
const globalVariables = require("../../globalVariables");

module.exports = {
    command: function(msg) {
        let events = globalVariables.get("events");

        /*if (!smallFunctions.checkAdmin(msg)) {
             allowed = false;
             msg.channel.send({
                 "embed": {
                     "title": "Tento príkaz môžu vykonávať len admini lol",
                     "color": COLORS.RED
                 }
             });
             return;
         }
         */

        let eventContentToDelete = msg.content.slice(9); // gets rid of the !vymazat

        let eventsDelete = events.filter((e)=>{
            return e.content == eventContentToDelete;
        });

        if (eventsDelete.length > 0) { // If the event was found
            events = events.filter((e)=>{
                return e.content != eventContentToDelete;
            });

            globalVariables.set("events", events);

            msg.channel.send({
                "embed": {
                    "title": `Event **${eventContentToDelete}** bol vymazaný.`,
                    "color": COLORS.GREEN
                }
            });
        }else{
            msg.channel.send({
                "embed": {
                    "title": "Event sa nenašiel",
                    "color": COLORS.RED
                }
            });
        }
    }
}