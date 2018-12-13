let global = {
    usersObj: {},
    events: []
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
        });
        setInterval(()=>{ // Does this every 10 seconds
            dbModule.save(global);
        }, 10000);
    }
}