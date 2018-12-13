/*

    Protects against the spam.
    [LEGACY] This will be removed in the future!!!

*/

const globalVariables = require("./globalVariables");
const TIMEOUT_BEFORE_REREPORT = require("./consts").TIMEOUT_BEFORE_REREPORT;
const TIMEOUT_INCREMENT = require("./consts").TIMEOUT_INCREMENT;
const TIMEOUT_TRIGGER = require("./consts").TIMEOUT_TRIGGER;
const COLORS = require("./consts").COLORS;

module.exports = (msg, author_id, author, mode)=>{ // On message recieved
    // if (msg.channel.id == 514873440159793167) {
    //     console.log("[SPAM_IGNORE] Ignored spamprotect from bot-testing")
    //     return;
    // }

    let usersObj = globalVariables.get("usersObj");

    let userObj = usersObj[author_id]; // Get the author from the usersObj 

    let timeout = TIMEOUT_INCREMENT;

    let messageChars = msg.content.split('').filter((e,i,a)=>{
        return a.indexOf(e) === i;
    }).join('');

    let words = msg.content.split(" ").length;

    // UC W
    // 
    
    if(!msg.content.startsWith(discordBotCongig.prefix) && !msg.content.startsWith(";;")) { // this bot's and the fredboat commands are ignored as they have their own timeout
        timeout = TIMEOUT_INCREMENT; // normal message
    }else{
        timeout = 0;
    }
    
    

    if(userObj[author_id]) { // If the author is already in the usersObj
        usersObj[author_id].username = author; // Set the username jic it changed...
        usersObj[author_id].timeout += timeout;
        usersObj[author_id].mpm++; // and also increment the messages per minute
    }else{ // If not we create an object with author's id inside the usersObj
        usersObj[author_id] = {
            username: author,
            mpm: 1, // Messages per minute
            timeOfFirstMinuteMessage: 0,
            warned: 0, // And increment their timeout
            timeout: timeout, // And set their timeout
            commandTimeout: 0, // And set their command timeout
            alreadyReportedTimeout: 0, // 0=not reported yet.
            alreadyWishedGN: 0, // 0=not wished GN yet.
            muteTimeout: 0 // 0=not timeouted.
        };
    }

    if (usersObj[author_id].timeOfFirstMinuteMessage < 1) {
        usersObj[author_id].timeOfFirstMinuteMessage = new Date().getTime();
    }
    

    if (usersObj[author_id].timeout > TIMEOUT_TRIGGER) {
        if (!usersObj[author_id].alreadyReportedTimeout > 0) { // If the user is not already to be reported AND is not already reported
            let username = usersObj[author_id].username;
            if (usersObj[author_id].warned == 0) {
                msg.channel.send({
                    "embed": {
                        "title": "Spam",
                        "color": COLORS.YELLOW,
                        "description": `Do piče s tebou ${msg.author} ty jebko. Čo si pridrbaný keď posielaš **${usersObj[author_id].mpm}** vyjebaných správ za posledných ${Math.floor((new Date().getTime() - usersObj[author_id].timeOfFirstMinuteMessage) / 1000)} pojebaných sekúnd! Mne sa zdáš že si mentálne retardovaný ffs. Choď sa liečit a ne tu spamovať do piče.`
                    }
                });
                usersObj[author_id].timeout = -25;
                usersObj[author_id].warned = 90;
            }else{
                msg.channel.send({
                    "embed": {
                        "title": "Spam",
                        "color": COLORS.YELLOW,
                        "description": `Ty pridrbanec ${msg.author} si ma nepočul či čo? Zasa si poslal **${usersObj[author_id].mpm}** správ za posledných ${Math.floor((new Date().getTime () - usersObj[author_id].timeOfFirstMinuteMessage) / 1000)} sekúnd. Počúvaj ma, máš také skurvené štastie že ťa nemožem !kicknúť IRL lebo by si to neprežil. Choď do piče ok?! Btw máš report.`
                    }
                });
                console.log(`[ADMIN_SEND] Reported user (${username}).`);
                //adminUser.send(`U **${username}** bolo detekované spamovanie. Odoslal **${usersObj[author_id].mpm}** správ za posledných ${Math.floor((new Date().getTime() - usersObj    [author_id].timeOfFirstMinuteMessage) / 1000)} sekúnd.`);

                usersObj[author_id].alreadyReportedTimeout = TIMEOUT_BEFORE_REREPORT;
            }
        }
    }

    globalVariables.set("usersObj", usersObj);
}