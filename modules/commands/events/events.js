
const COLORS = require("../../consts").COLORS;
const TIMETABLE = require("../../consts").TIMETABLE;
const WEEK_DAYS = require("../../consts").WEEK_DAYS;
const globalVariables = require("../../globalVariables");
const smallFunctions = require("../../smallFunctions");

const EMPTY_STRING = "None";

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
            this.todayEvents(msg, events);
            return;
        }
        if (isTomorrow) {
            this.tomorrowEvents(msg, events);
            return;
        }

        // REWORK ALL OF BELLOW
    
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
            
            if (type == "week") {
                if (e.time > new Date().getTime() + 604800000) { // If the event is in the futute than 7 days
                    return; // Don't show it (don't add it to the eventsString)
                }
            }

            if (!e.eventId) {
                e.eventId = "-"
            }
    
            let eventDate = new Date(e.time);
    
            let eventDateString = `${eventDate.getDate()}.${eventDate.getMonth()+1}.${eventDate.getFullYear()}`;
    
            if (eventDateString == todayDateString) {
                if (isTomorrow) {return;}
    
                if (eventsFields[0].value.endsWith('Nič')) {
                    eventsFields[0].value = "**Rozvrh: **" + timetableTodayString + "\n";
                }
                eventsFields[0].value += `• [#${e.eventId}] ${e.content}\n`;
    
            }else if (eventDateString == tomorrowDateString) {
                if (isToday) {return;}
                
                if (isTomorrow) {
                    if (eventsFields[0].value.endsWith('Nič')) {
                        eventsFields[0].value = "**Rozvrh: **" + timetableTomorrowString + "\n";
                    }
                    eventsFields[0].value += `• [#${e.eventId}] ${e.content}\n`;
                }else{
                    if (eventsFields[1].value.endsWith('Nič')) {
                        eventsFields[1].value = "**Rozvrh: **" + timetableTomorrowString + "\n";
                    }
                    eventsFields[1].value += `• [#${e.eventId}] ${e.content}\n`;
                }
            }else{
                if (isToday || isTomorrow) {return;}
                let eventFieldDate = `***${WEEK_DAYS[eventDate.getDay()]} ${eventDateString}***`;
    
                let eventField = eventsFields.find(obj => obj.name == eventFieldDate);
    
                if (eventField) {
                    eventField.value += `• [#${e.eventId}] ${e.content}\n`;
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
    },

    todayEvents: function(msg, events) {
        let todayDateString = `${new Date().getDate()}.${new Date().getMonth()+1}.${new Date().getFullYear()}`; // Formats today's date to a xDateString
        // TODO: Make this in smallFunctions module

        let timetableArray = TIMETABLE[new Date().getDay()];
        let timetableString = timetableArray.join(' | ');

        let eventsFields = [{
            name: "**Today - " + todayDateString + "**",
            value: EMPTY_STRING
        }]; // Defines the events fields which will be used as field array in the reply embed object

        eventsFields[0].value = "**" + timetableString + "**\n";

        let eventsEmpty = true;

        events.forEach((e)=>{
            if (!e.eventId) {
                e.eventId = "?"
            }
    
            let eventDate = new Date(e.time);
    
            let eventDateString = `${eventDate.getDate()}.${eventDate.getMonth()+1}.${eventDate.getFullYear()}`; // This will make the date of the event to a format as the xDateString
    
            if (eventDateString == todayDateString) {
                eventsEmpty = false;
                eventsFields[0].value += `• [#${e.eventId}] ${e.content}\n`;
            }
        });

        if (eventsEmpty) {
            eventsFields[0].value += "None"
        }

        msg.channel.send({
            "embed": {
                "title": "Events",
                "color": COLORS.BLUE,
                "fields": eventsFields
            }
        });
    },

    tomorrowEvents: function(msg, events) {
        let tomorrowDateObj = new Date(new Date().getTime() + 86400000);
        let tomorrowDateString = `${tomorrowDateObj.getDate()}.${tomorrowDateObj.getMonth()+1}.${tomorrowDateObj.getFullYear()}`; // Formats today's date to a xDateString
        // TODO: Make this in smallFunctions module

        let timetableArray = TIMETABLE[tomorrowDateObj.getDay()];
        let timetableString = timetableArray.join(' | ');

        let eventsFields = [{
            name: "**Tomorrow - " + tomorrowDateString + "**",
            value: EMPTY_STRING
        }]; // Defines the events fields which will be used as field array in the reply embed object

        eventsFields[0].value = "**" + timetableString + "**\n";

        let eventsEmpty = true;

        events.forEach((e)=>{
            if (!e.eventId) {
                e.eventId = "?"
            }
    
            let eventDate = new Date(e.time);
    
            let eventDateString = `${eventDate.getDate()}.${eventDate.getMonth()+1}.${eventDate.getFullYear()}`; // This will make the date of the event to a format as the xDateString
    
            if (eventDateString == tomorrowDateString) {
                eventsEmpty = false;
                eventsFields[0].value += `• [#${e.eventId}] ${e.content}\n`;
            }
        });

        if (eventsEmpty) {
            eventsFields[0].value += "None"
        }

        msg.channel.send({
            "embed": {
                "title": "Events",
                "color": COLORS.BLUE,
                "fields": eventsFields
            }
        });
    }
}