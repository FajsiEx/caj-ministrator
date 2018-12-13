/*

    Defines smaller functions that don't need their own module for each one.

*/

const math = require('mathjs');

module.exports = {
    startsWithNumber: (str)=>{
        return str.match(/^\d/);
    },

    compare: (a,b)=>{
        if (a.time < b.time) {
            return -1;
        }else if (a.time > b.time) {
            return 1;
        }else{
            return 0;
        }
    },

    checkAdmin: (msg)=>{
        if(msg.member.roles.some(r=>["admin", "Owner"].includes(r.name))) {
            return true;
        }else{
            return false;
        }
    },

    solveMathProblem: (problem)=>{
        try {
            problem = problem.replace(/×/g, '*');
            problem = problem.replace(/x/g, '*');
    
            let result = math.eval(problem);
            return result;
        }catch(e){
            console.error(e);
            return false;            
        }
    }
}

/*

solveMathProblem = (msg, problem)=>{
    try {
        if (Math.random() < 0.01) {
            msg.channel.send({
                "files": ["https://i.imgur.com/IBopYGD.png"]
            });
        }

        problem = problem.replace(/×/g, '*');
        problem = problem.replace(/x/g, '*');

        let result = math.eval(problem);
        
    }catch(e){
        
    }
}

*/