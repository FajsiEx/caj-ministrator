/*

    Module for doing anything that is about events.

*/

const globalVariables = require("./globalVariables");
const smallFunctions = require("./smallFunctions");
const TIMETABLE = require("./consts").TIMETABLE;
const WEEK_DAYS = require("./consts").WEEK_DAYS;
const WEEK_DAYS_SHORT = require("./consts").WEEK_DAYS_SHORT;
const COLORS = require("./consts").COLORS;

module.exports = {
    addEvent: {
        add: function(msg, commandMessageArray){
            let events = globalVariables.get("events");

            if (!commandMessageArray[1] || !commandMessageArray[2]) { // If there are missing parameters
                this.missingParametersReply(msg); // Tell them
                return; // Don't continue
            }
            
            let author = msg.author.username + "#" + msg.author.discriminator; // User#1337
            let author_id = msg.author.id; // 45656489754512344
            let message = msg.content;
    
            let dateParameter = commandMessageArray[1].split(".").reverse().join(".");
            let dateObj = new Date(dateParameter + " 20:00:00");
    
            if (dateObj == "Invalid Date") { // If the date function can't parse the date string we
                this.invalidDateFormatReply(msg); // Tell the user right format and
                return; // Don't continue
            }
            
            if (dateObj.getFullYear() == 2001) { // When the user doesn't specify the year the Date constructor will add it as 2001
                let currentYear = new Date().getFullYear(); // So we overwrite it with our own year
                dateObj = new Date(dateParameter + "." + currentYear + " 20:00:00");
            }
    
            // This is ugly. Yes, I know. Don't judge me. Who reads this code anyways...right?
            let eventName = message.slice(message.indexOf(message.split(" ", 2)[1]) + message.split(" ", 2)[1].length + 1); // This just extracts the rest of the message (!add 21.12 bla bla bla) => (bla bla bla)... I don't even know how it works or how I came up with this but it works so I won't touch it.
    
            // We push the event as an object to the events arrat
            events.push({
                time: dateObj.getTime(),
                user_id: author_id,
                user: author,
                content: eventName
            });
            
            globalVariables.set("events", events);

            this.successReply(msg, dateObj, eventName); // And finally we reply the user.
        },
    
        missingParametersReply: function(msg){
            msg.channel.send({
                "embed": {
                    "title": "Nesprávny formát príkazu !pridat",
                    "color": COLORS.RED,
                    "description": 'Použitie: !pridat [datum] [nazov eventu]\n**Príklady:**\n!pridat 23.10 Pisomka z matiky z mnozin\n!pridat 6.4.2018 Adlerka day\n!pridat 09.08 Ja nevim co'
                }
            });
            return;
        },
    
        invalidDateFormatReply: function(msg){
            msg.channel.send({
                "embed": {
                    "title": "Nesprávny formát dátumu",
                    "color": COLORS.RED,
                    "description": 'Použitie: !pridat [datum] [nazov eventu]\n**Príklady:**\n!pridat 23.10 Pisomka z matiky z mnozin\n!pridat 6.4.2018 Adlerka day\n!pridat 09.08 Ja nevim co'
                }
            });
            return;
        },
    
        successReply: (msg, dateObj, eventName)=>{
            msg.channel.send({
                "embed": {
                    "title": "Event bol pridaný",
                    "color": COLORS.GREEN,
                    "description": `**${WEEK_DAYS_SHORT[dateObj.getDay()]} ${dateObj.getDate()}.${dateObj.getMonth()+1}** - ${eventName}\n`
                }
            });
        }
    },
    
    eventsCommand: (type, msg, commandMessageArray)=>{
        let events = globalVariables.get("events");
        events.sort(smallFunctions.compare);

        // events = events.filter((e)=>{
        //     return e.time < new Date().getTime();
        // });

        globalVariables.set("events", events);
    
        let todayDateString = `${new Date().getDate()}.${new Date().getMonth()+1}.${new Date().getFullYear()}`;
        
        let tomorrowDateObj = new Date(new Date().getTime() + 86400000);
        let tomorrowDateString = `${tomorrowDateObj.getDate()}.${tomorrowDateObj.getMonth()+1}.${tomorrowDateObj.getFullYear()}`;
        
        let eventsFields = [];
        let embedTitle = "Nasledujúce eventy";
    
        let isToday = ((commandMessageArray[1] == 'dnes') || (type == "dnes"));
        let isTomorrow = ((commandMessageArray[1] == 'zajtra') || (type == "zajtra"));
    
        let timetableTodayArray = TIMETABLE[new Date().getDay()];
        let timetableTomorrowArray = TIMETABLE[tomorrowDateObj.getDay()];
    
        let timetableTodayString = timetableTodayArray.join(' | ');
        let timetableTomorrowString = timetableTomorrowArray.join(' | ');
    
        if (isToday) {
            embedTitle = "Eventy na dnes"
            eventsFields = [
                {
                    name: `***${todayDateString}***`,
                    value: "**Rozvrh: **" + timetableTodayString + "\nNič"
                }
            ];
        }else if (isTomorrow) {
            embedTitle = "Eventy na zajtra"
            eventsFields = [
                {
                    name: `***${tomorrowDateString}***`,
                    value: "**Rozvrh: **" + timetableTomorrowString + "\nNič"
                }
            ];
        }else{
            eventsFields = [
                {
                    name: `***Dnes (${todayDateString})***`,
                    value: "**Rozvrh: **" + timetableTodayString + "\nNič"
                },
                {
                    name: `***Zajtra (${tomorrowDateString})***`,
                    value: "**Rozvrh: **" + timetableTomorrowString + "\nNič"
                }
            ];
        }
    
        events.forEach((e)=>{
            if (e.time < new Date().getTime()) { // If the event is old
                return;
            }
            if (e.time > new Date().getTime() + 1209600000) { // If the event is in the futute than 14 days
                return;
            }
    
            let eventDate = new Date(e.time);
    
            let eventDateString = `${eventDate.getDate()}.${eventDate.getMonth()+1}.${eventDate.getFullYear()}`;
    
            if (eventDateString == todayDateString) {
                if (isTomorrow) {return;}
    
                if (eventsFields[0].value.endsWith('Nič')) {
                    eventsFields[0].value = "**Rozvrh: **" + timetableTodayString + "\n";
                }
                eventsFields[0].value += `• ${e.content}\n`;
    
            }else if (eventDateString == tomorrowDateString) {
                if (isToday) {return;}
                
                if (isTomorrow) {
                    if (eventsFields[0].value.endsWith('Nič')) {
                        eventsFields[0].value = "**Rozvrh: **" + timetableTomorrowString + "\n";
                    }
                    eventsFields[0].value += `• ${e.content}\n`;
                }else{
                    if (eventsFields[1].value.endsWith('Nič')) {
                        eventsFields[1].value = "**Rozvrh: **" + timetableTomorrowString + "\n";
                    }
                    eventsFields[1].value += `• ${e.content}\n`;
                }
            }else{
                if (isToday || isTomorrow) {return;}
                let eventFieldDate = `***${WEEK_DAYS[eventDate.getDay()]} ${eventDateString}***`;
    
                let eventField = eventsFields.find(obj => obj.name == eventFieldDate);
    
                if (eventField) {
                    eventField.value += `• ${e.content}\n`;
                }else{
                    eventsFields.push({
                        name: eventFieldDate,
                        value: `\n**Rozvrh: **${TIMETABLE[eventDate.getDay()].join(' | ')}\n• ${e.content}\n`
                    })
                }
            }
        });
        
        if (isToday || isTomorrow) {
            msg.channel.send({
                "embed": {
                    "title": embedTitle,
                    "color": COLORS.BLUE,
                    "fields": eventsFields
                }
            });
        }else{ 
            msg.channel.send({
                "embed": {
                    "title": embedTitle,
                    "color": COLORS.BLUE,
                    "fields": eventsFields,
                    "footer": {
                        "text": "BTW: Keď chceš len čo je na zajtra, napíš !zajtra"
                    }
                }
            });
        }
    }
}