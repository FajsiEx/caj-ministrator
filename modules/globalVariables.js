let global = {
    usersObj: {},
    events: [],
    logData: [],
    teas: 0,
    startTime: 0,
    lastSaveTime: 0
}

dbModule = require("./db");

module.exports = {
    get: (varName)=>{
        if (!global[varName]) {return false;}
        return global[varName];
    },

    set: (varName, value)=>{
        global[varName] = value;
        return true;
    },

    init: ()=>{ // Inits this module - loads data from database and sets timer to auto-save data.
        dbModule.load().then((data)=>{
            global.usersObj = data.usersObj;
            global.events = data.events;
            global.teas = data.teas;
            global.lastSaveTime = data.lastSaveTime;
        });
        setInterval(()=>{ // Does this every 10 seconds
            dbModule.save(global);
            global.lastSaveTime = new Date().getTime();
        }, 10000);
    }
}