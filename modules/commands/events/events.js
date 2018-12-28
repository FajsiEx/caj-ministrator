
const COLORS = require("../../consts").COLORS;
const TIMETABLE = require("../../consts").TIMETABLE;
const WEEK_DAYS = require("../../consts").WEEK_DAYS;
const globalVariables = require("../../globalVariables");
const smallFunctions = require("../../smallFunctions");

module.exports = {
    command: function(msg, type) {
        let commandMessageArray = msg.content.split(" ");
        
        let events = globalVariables.get("events");
        events.sort(smallFunctions.compare);

        events = events.filter((e)=>{
            return e.time > new Date().getTime();
        });
    
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