/*

    Database module.
    Takes care of saving an loading data.

*/

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const DATABASE_URI = process.env.DATABASE_URI;

module.exports = {
    load: ()=>{ // Loads data from the DB to the memory
        return new Promise((resolve)=>{
            MongoClient.connect(DATABASE_URI, (err, client) => {
                console.log("[LOAD] Loading data...");
                if (err) return console.error(err)
                let database = client.db('caj-ministrator');
                database.collection("datav2").find({}).toArray((err, docs)=> {
                    if (err) {console.log(err); return;}
    
                    console.log(`[LOAD] Docs loaded`);
    
                    let data = docs[0];
                    console.log("[LOAD] Data loaded.");
    
                    client.close();

                    console.log("[LOAD] Load finished. Resloving...");
    
                    resolve(data);
                });
            });
        });
    },

    save: (data)=>{
        if (process.env.DISABLE_SAVE == "yes") {
            console.log("[SAVE] Disable save is on. Aborting save.");
            return;
        } // for beta
        
        console.log("[SAVE] Saving events...");

        if (!data || (Object.keys(data).length <= 0)) {
            console.warn("[SAVE] Data is false. Aborting save.");
            return false;
        }
        
        MongoClient.connect(DATABASE_URI, (err, client) => {
            if (err) return console.error(err)
            let database = client.db('caj-ministrator');

            // Replace the object with your field objectid...because it won't work otherwise...
            database.collection("datav2").update({"_id" : ObjectId("5c2ceed4f25f7b062cd2e038")}, {
                $set: data
            });

            console.log("[SAVE] Everything saved.");

            client.close(); // Dont dos yourself kids
        });
    }
}