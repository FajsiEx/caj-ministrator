/*

    Database module.
    Takes care of saving an loading data.

*/

const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const DATABASE_URI = process.env.DATABASE_URI;

module.exports = {
    load: ()=>{ // Loads data from the DB to the memory
        return new Promise((resolve, reject)=>{
            MongoClient.connect(DATABASE_URI, (err, client) => {
                console.log("[LOAD] Loading events...");
                if (err) return console.error(err)
                let database = client.db('caj-ministrator');
                database.collection("data").find({}).toArray((err, docs)=> {
                    if (err) {console.log(err); return;}
    
                    console.log(`[DEBUG] DOCS(${JSON.stringify(docs)})`);
    
                    let usersDoc = docs[0];
                    console.log(`[DEBUG] DOC(${JSON.stringify(usersDoc)})`);
    
                    usersObj = usersDoc.users; 
                    console.log(`[DEBUG] OBJ(${JSON.stringify(usersObj)})`);
                    console.log("[LOAD] Users loaded.");
    
                    let eventsDoc = docs[1];
                    console.log(`[DEBUG] DOC(${JSON.stringify(eventsDoc)})`);
                    events = eventsDoc.events; 
                    console.log(`[DEBUG] ARR(${JSON.stringify(events)})`);
                    console.log("[LOAD] Events loaded.");

                    let teaDoc = docs[2];
                    console.log(`[DEBUG] DOC(${JSON.stringify(teaDoc)})`);
                    teas = teaDoc.teas.teas; 
                    lastSaveTime = teaDoc.teas.time; 
                    console.log(`[DEBUG] ARR(${JSON.stringify(events)})`);
                    console.log("[LOAD] Teas loaded.");
    
                    client.close();
    
                    resolve({
                        usersObj: usersObj,
                        events: events,
                        teas: teas,
                        lastSaveTime: lastSaveTime
                    });
                });
            });
        });
    },

    save: (data)=>{
        if (process.env.DISABLE_SAVE == "yes") {return;} // for beta

        console.log("[SAVE] Saving events...");

        if ((Object.keys(usersObj).length === 0 && usersObj.constructor === Object) || (events.length < 1) || (!data)) {
            console.warn("[SAVE] Data is false. Aborting save.");
            return false;
        }
        
        MongoClient.connect(DATABASE_URI, (err, client) => {
            if (err) return console.error(err)
            let database = client.db('caj-ministrator');

            // Replace the object with your field objectid...because it won't work otherwise...
            database.collection("data").update({_id: ObjectId("5c027f0bd56bdd25686c264f")}, {
                $set: {
                    "events": data.events
                }
            });
            database.collection("data").update({_id: ObjectId("5c027cb9d56bdd25686c264e")}, {
                $set: {
                    "users": data.usersObj
                }
            });
            database.collection("data").update({_id: ObjectId("5c15742068c0cc26c0e1ea6b")}, {
                $set: {
                    "teas": {
                        teas: data.teas,
                        time: new Date().getTime()
                    }
                }
            });
            console.log("[SAVE] Everything saved.");

            client.close(); // Dont dos yourself kids
        });
    }
}