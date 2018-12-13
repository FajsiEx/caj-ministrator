/*

    Methods for replying to the information commands such as: !ping, !info, !help, and so on...

*/

const COLORS = require("./consts").COLORS;

module.exports = {
    helpCommand: (msg, commandMessageArray)=>{
        if (commandMessageArray[1]) {
            switch (commandMessageArray[1]) {
                case "ping":
                    msg.channel.send({
                        "embed": {
                            "title": "!ping",
                            "color": COLORS.BLUE,
                            "description": "Odpovie Pong!\nNemá žiadny iný účel ako len testovať či bot funguje a príjma príkazy."
                        }
                    });
                    break;
    
                case "help":
                case "pomoc":
                case "prikazy":
                    msg.channel.send({
                        "embed": {
                            "title": "!help/pomoc/prikazy [príkaz]",
                            "color": COLORS.BLUE,
                            "description": "Zobrazí príkazy ktoré bot príjma.\nPokiaľ sa použije *!help [príkaz]* tak sa zobrazia informácie o tom príkaze\n\n**Príklady**\n*!help pridat*\n*!help eventy*\n*!help ping*"
                        }
                    });
                    break;
    
                case "pridat":
                case "add":
                    msg.channel.send({
                        "embed": {
                            "title": "!pridat/add <dátum> <event>",
                            "color": COLORS.BLUE,
                            "description": "Pridá event na dátum.\n\n**Príklady**\n*!pridat 23.10  Pisomka z matiky z mnozin*\n*!pridat 6.4.2018 Adlerka day*\n*!pridat 09.08 Ja nevim co*"
                        }
                    });
                    break;
    
                case "vymazat":
                case "remove":
                case "delete":
                    msg.channel.send({
                        "embed": {
                            "title": "!vymazat/remove/delete <event>",
                            "color": COLORS.BLUE,
                            "description": "Vymaže daný event.\n*Zatiaľ ho môžu používať len admini ale plánujem pridať možnosť vymazať svoj vlastný event.*\n\n**Príklady**\n*!vymazat Pisomka z matiky z mnozin*\n*!remove Adlerka day*\n*!delete Ja nevim co*"
                        }
                    });
                    break;
    
                case "eventy":
                case "events":
                    msg.channel.send({
                        "embed": {
                            "title": "!eventy/events [dnes/zajtra]",
                            "color": COLORS.BLUE,
                            "description": "Zobrazí následujúce eventy pre najblizších 14 dní (ak sa pridá dnes/zajtra zobrazí eventy len pre ten deň).\n\n**Príklady**\n*!eventy*\n*!events dnes*\n*!eventy zajtra*"
                        }
                    });
                    break;
            }
        }else{
            msg.channel.send({
                "embed": {
                    "title": "Čaj-ministrátor príkazy:",
                    "color": COLORS.BLUE,
                    "description": `
                        **!help [príkaz]** - Zobrazí príkazy ktoré bot príjma
                        **!pridat/add <dátum> <event>** - Pridá event
                        **!vymazat/remove/delete** - Odstráni event
                        **!eventy/events** - Vypíše nasledujúce eventy
                        **!dnes/zajtra** - To isté ako !eventy dnes/zajtra
                        **!<príklad>** - Vpočíta príklad
    
                        *Pre viac informácií o príkaze napíšte napr.: !help eventy*
                        *Ak chcete niečo pridať/zmeniť napíšte do bot-chat*
                    `
                }
            });
        }
    }
}