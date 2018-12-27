/*

    Module for doing anything that is about events.

*/

const globalVariables = require("./globalVariables");
const smallFunctions = require("./smallFunctions");
const logger = require("./logger");
const TIMETABLE = require("./consts").TIMETABLE;
const WEEK_DAYS = require("./consts").WEEK_DAYS;
const WEEK_DAYS_SHORT = require("./consts").WEEK_DAYS_SHORT;
const COLORS = require("./consts").COLORS;
const HOLIDAYS = require("./consts").HOLIDAYS;
const NAMEDAYS = require("./consts").NAMEDAYS;

module.exports = {
    addEvent: {
        
    },
    
    eventsCommand: (type, msg, commandMessageArray)=>{
        
    },

    holidayCommand:(msg)=>{

    },

    wishNameday:(discordClient)=>{
        let month = new Date("11/11/2019 01:00:00 GMT+0100").getMonth() + 1; // because 0 = jan
        let day = new Date("11/11/2019 01:00:00 GMT+0100").getDate();
        discordClient.fetchUser(NAMEDAYS[month][day]).then((user)=>{
            discordClient.channels.get('527170494613422092').send("Všetko najlepšie k meninám, " + user + "!");
        });        
    }
}