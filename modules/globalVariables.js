let global = {
    usersObj: {},
    events: [],
    logData: [],
    teas: 0,
    startTime: 0,
    lastSaveTime: 0,
    modModeOn: false,
    disableStatus: false // If true auto status will be disabled
}

dbModule = require("./db");

module.exports = {
    get: (varName)=>{
        console.log(`[GV_GET] Getting [${varName}]`);
        if (!global[varName]) {return false;}
        return global[varName];
    },

    set: (varName, value)=>{
        console.log(`[GV_SET] Setting [${varName}] to [${value}]`);
        global[varName] = value;
        return true;
    },

    init: ()=>{ // Inits this module - loads data from database and sets timer to auto-save data.
        console.log(`[GV_INIT] Initing...`);
        dbModule.load().then((data)=>{
            console.log(`[GV_INIT] Loaded init.`);
            global.usersObj = data.usersObj;
            global.events = data.events;
            global.teas = data.teas;
            global.lastSaveTime = data.lastSaveTime;
        });
        console.log(`[GV_INIT] Setting interval.`);
        setInterval(()=>{ // Does this every 10 seconds
            dbModule.save(global);
            global.lastSaveTime = new Date().getTime();
        }, 10000);
    }
}