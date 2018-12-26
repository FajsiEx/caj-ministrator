


module.exports = {
    processCommand: function(msg){
        let commandContent = msg.content.slice(1);
        if (this.startsWithNumber(commandContent) ||
            commandContent.startsWith("(") ||
            commandContent.startsWith("[") ||
            commandContent.startsWith("-")) {
            
            let result = this.solveMathProblem(commandContent);

            if (result === false) {
                msg.channel.send({
                    "embed": {
                        "title": "Nesprávny príklad",
                        "color": COLORS.RED,
                        "description": 'Neviem vypočítať tento príklad :('
                    }
                });
            }else{
                msg.channel.send({
                    "embed": {
                        "title": "Vypočítaný príkad",
                        "color": COLORS.BLUE,
                        "fields": [
                            {
                                "name": "Príklad: " + problem,
                                "value": "Výsledok: **" + result + "**"
                            }
                        ]
                    }
                });
            }
            return true;
        }else{
            return false;
        }
    },

    solveMathProblem: function(problem){
        try {
            problem = problem.replace(/×/g, '*');
            problem = problem.replace(/x/g, '*');
    
            let result = math.eval(problem);
            return result;
        }catch(e){
            console.error(e);
            return false;            
        }
    },

    startsWithNumber: function(str){
        return str.match(/^\d/);
    },
}