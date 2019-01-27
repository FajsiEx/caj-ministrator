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

dbModule = require("./db");

module.exports = {
    get: (varName)=>{
        console.log(`D: [GV_GET] Getting [${varName}]`);
        if (!global[varName]) {return false;}
        return global[varName];
    },

    set: (varName, value)=>{
        console.log(`D: [GV_SET] Setting [${varName}] to [${value}]`);
        global[varName] = value;
        return true;
    },

    init: ()=>{ // Inits this module - loads data from database and sets timer to auto-save data.
        console.log(`D: [GV_INIT] Initing...`);
        dbModule.load().then((data)=>{
            console.log(`I: [GV_INIT] Loaded init.`);

            if (Object.keys(data).length <= 2) { // If the db is empty leave and wait for auto save to write the default values.
                console.log("/!\\ [GV_INIT] Empty load. Returning.");
                return;
            }

            global = data;

            if (new Date().getTime() - data.lastSaveTime < 10000) {
                disableAutoSave = true;
                console.log("/!\\ [GV_INIT] Overlap load. Auto-saving is disabled. Restart manually to reset.");
                return;
            }
        });
        console.log(`D: [GV_INIT] Setting interval.`);
        setInterval(()=>{ // Does this every 10 seconds
            if (disableAutoSave) {
                console.log("I: [AUTOSAVE] Autosave is disabled for some reason. Most likely it's in the first few lines of logs.");
                return;
            }
            dbModule.save(global);
            global.lastSaveTime = new Date().getTime();
        }, 10000);
    },

    fLoad: ()=>{
        console.log(`D: [GV_FLOAD] Force loading...`);
        dbModule.load().then((data)=>{
            console.log(`D: [GV_FLOAD] Loaded.`);
            global = data;
        });
    },
    fSave: ()=>{
        console.log(`D: [GV_FSAVE] Force saving...`);
        dbModule.save(global);
        global.lastSaveTime = new Date().getTime();
        console.log(`D: [GV_FSAVE] Saved.`);
    },
    dump: ()=>{
        console.log(`D: [GV_DUMP] Dumping...`);
        return JSON.stringify(global);
    }
}