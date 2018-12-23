

const fs = require('fs');

const globalVariables = require("./globalVariables");
const DEV_USERID = require("./consts").DEV_USERID;

const COLORS = require("./consts").COLORS;

module.exports = {
    selfTest: (msg, commandMessageArray)=> {
        if (msg.author.id != DEV_USERID) {
            msg.channel.send({
                "embed": {
                    "title": "Dev only.",
                    "color": COLORS.RED
                }
            }).then(msg => msg.delete(5000));
            return;
        }

        let baseLoadingString = "Running self-test...this may take a while... ";

        msg.channel.send({
            "embed": {
                "title": baseLoadingString + "(Init. 1/3)",
                "color": COLORS.BLUE
            }
        }).then((msg)=>{
            let usersObjLength;
            let eventsLength;
            let teasCount;
            let serverTimeString;
            let adminUserid;
            let devUserid;
            let authorUserData;
            let uptime;
            let timeSinceLastDataSave;

            msg.edit({
                "embed": {
                    "title": baseLoadingString + "(Load. 2/3)",
                    "color": COLORS.BLUE
                }
            });

            usersObjLength = Object.keys(globalVariables.get("usersObj")).length;
            eventsLength = globalVariables.get("events").length;
            teasCount = globalVariables.get("teas");

            serverTimeString = new Date().toString();
            adminUserid = process.env.ADMIN_USERID;
            devUserid = DEV_USERID;
            authorUserData = msg.author.id + " / " + msg.author.username + "#" + msg.author.discriminator;

            nowTime = new Date().getTime();

            deltaTime = nowTime - globalVariables.get("startTime");
            let deltaDate = new Date(deltaTime);

            uptime = `${deltaDate.getHours()}h ${deltaDate.getMinutes()}min ${deltaDate.getSeconds()}s`;

            let timeSinceLastDataSaveTS = nowTime - globalVariables.get("lastSaveTime");
            let timeSinceLastDataSaveDate = new Date(timeSinceLastDataSaveTS);
            timeSinceLastDataSave = `${timeSinceLastDataSaveDate.getHours()}h ${timeSinceLastDataSaveDate.getMinutes()}min ${timeSinceLastDataSaveDate.getSeconds()}s ${timeSinceLastDataSaveDate.getMilliseconds()}ms`;

            msg.edit({
                "embed": {
                    "title": "Self-test done.",
                    "description": `
                        **Users object length:** ${usersObjLength}
                        **Events length:** ${eventsLength}
                        **Teas count:** ${teasCount}
                        **Server time string:** ${serverTimeString}
                        **Admin user id [DEPRECATED]:** ${adminUserid}
                        **Dev user id [DEPRECATED]:** ${devUserid}
                        **Message author data string:** ${authorUserData}
                        **Server uptime:** ${uptime}
                        **Time since last data save:** ${timeSinceLastDataSave}
                    `,
                    "color": COLORS.GREEN
                }
            });
        });
    },

    testread: (msg, commandMessageArray)=> {
        let usersObj = globalVariables.get("usersObj");
        let events = globalVariables.get("events");

        if (msg.author.id != DEV_USERID) {
            msg.channel.send({
                "embed": {
                    "title": "Tento príkaz môžu vykonavať len developeri z dôvodu redukcie spamu. sry :/",
                    "color": COLORS.RED
                }
            }).then(msg => msg.delete(5000));
            return;
        }

        switch (commandMessageArray[1]) {
            case "events":
                let fileName = 'events_JSON_dump_' + Math.floor(Math.random() * 1000000) + '.json'
                fs.writeFile(fileName, JSON.stringify(events), (err)=>{
                    if (err) {
                        msg.channel.send({
                            "embed": {
                                "title": "Error trying to write",
                                "color": COLORS.RED,
                                "description": "Check the logs for more details."
                            }
                        });
                        console.err("[TEST_READ] Failed to write");
                    };

                    msg.channel.send({
                        "embed": {
                            "title": "Raw JSON output of events array",
                            "color": COLORS.GREEN
                        },
                        "files": [
                            fileName
                        ]
                    });
                    console.log('[TEST_READ] File written');
                });
                break;

            case "users":
                let fileName = 'usersObj_JSON_dump_' + Math.floor(Math.random() * 1000000) + '.json'
                fs.writeFile(fileName, JSON.stringify(events), (err)=>{
                    if (err) {
                        msg.channel.send({
                            "embed": {
                                "title": "Error trying to write",
                                "color": COLORS.RED,
                                "description": "Check the logs for more details."
                            }
                        });
                        console.err("[TEST_READ] Failed to write");
                    };

                    msg.channel.send({
                        "embed": {
                            "title": "Raw JSON output of usersObj",
                            "color": COLORS.GREEN
                        },
                        "files": [
                            fileName
                        ]
                    });
                    console.log('[TEST_READ] File written');
                });
                break;

            default:
                msg.channel.send({
                    "embed": {
                        "title": "Invalid attr",
                        "color": COLORS.RED,
                        "description": "Enter valid attr for testread command."
                    }
                }).then(msg => msg.delete(5000));
        }
    },

    testpp: (msg, commandMessageArray)=>{
        let usersObj = globalVariables.get("usersObj");
        let events = globalVariables.get("events");
        
        if (msg.author.id != DEV_USERID) {
            msg.channel.send({
                "embed": {
                    "title": "Tento príkaz môžu vykonavať len developeri z dôvodu redukcie  spamu. sry :/",
                    "color": COLORS.RED
                }
            }).then(msg => msg.delete(5000));
            return;
        }

        switch (commandMessageArray[1]) {
            case "users":
                let usersObjString = "";

                let users = Object.keys(usersObj); // Gets keys (users) of the usersObj
                for (user of users) { // For each user
                    let userObj = usersObj[user];
                    usersObjString += `**ID:**${user} **UN:**${userObj.username} **AW:**${userObj.agreedWarning}\n`
                }

                msg.channel.send({
                    "embed": {
                        "title": "PrettyPrint for usersObj",
                        "color": COLORS.BLUE,
                        "description": usersObjString
                    }
                });
                break;

            default:
                msg.channel.send({
                    "embed": {
                        "title": "Invalid attr",
                        "color": COLORS.RED,
                        "description": "Enter valid attr for testpp command."
                    }
                }).then(msg => msg.delete(5000));
        }
    }
}