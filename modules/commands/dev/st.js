
const COLORS = require("../../consts").COLORS;
const DEV_USERID = require("../../consts").DEV_USERID;

const globalVariables = require("../../globalVariables");

module.exports = {
    command: function(msg) {
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
    }
}