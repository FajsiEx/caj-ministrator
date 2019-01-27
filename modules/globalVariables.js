let global = {
    usersObj: {},
    events: [],
    logData: [],
    teas: 0,
    commandsServed: 0,
    startTime: 0,
    lastSaveTime: 0,
    modModeOn: false,
    disableStatus: false, // If true auto status will be disabled
    vc: false, // will be removed and unused
    musicConnections: {test: "test"},
    eventsCounter: 0
}

let disableAutoSave = false;

const colors = require('colors');
dbModule = require("./db");

module.exports = {
    get: (varName)=>{
        console.log(`[GV_GET] Getting [${varName}]`.debug);
        if (!global[varName]) {return false;}
        return global[varName];
    },

    set: (varName, value)=>{
        console.log(`[GV_SET] Setting [${varName}] to`.debug);
        console.dir(value);
        global[varName] = value;
        return true;
    },

    init: ()=>{ // Inits this module - loads data from database and sets timer to auto-save data.
        console.log(`[GV_INIT] Initing...`.debug);
        dbModule.load().then((data)=>{
            console.log(`[GV_INIT] Loaded init.`.success);

            if (Object.keys(data).length <= 2) { // If the db is empty leave and wait for auto save to write the default values.
                console.log("[GV_INIT] Empty load. Returning.".warn);
                return;
            }

            global = data;

            if (new Date().getTime() - data.lastSaveTime < 10000) {
                disableAutoSave = true;
                console.log("[GV_INIT] Overlap load. Auto-saving is disabled. Restart manually to reset.".warn);
                return;
            }
        });
        console.log(`[GV_INIT] Setting interval...`.debug);
        setInterval(()=>{ // Does this every 10 seconds
            if (disableAutoSave) {
                console.log("[AUTOSAVE] Autosave is disabled for some reason. Most likely it's in the first few lines of logs.".info);
                return;
            }
            dbModule.save(global);
            global.lastSaveTime = new Date().getTime();
        }, 10000);
    },

    fLoad: ()=>{
        console.log(`[GV_FLOAD] Force loading...`.debug);
        dbModule.load().then((data)=>{
            console.log(`[GV_FLOAD] Loaded.`.success);
            global = data;
        });
    },
    fSave: ()=>{
        console.log(`[GV_FSAVE] Force saving...`.debug);
        dbModule.save(global);
        global.lastSaveTime = new Date().getTime();
        console.log(`[GV_FSAVE] Saved.`.success);
    },
    dump: ()=>{
        console.log(`[GV_DUMP] Dumping...`.debug);
        return JSON.stringify(global);
    }
}