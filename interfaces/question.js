const readline = require('readline');

const Question = {
    toAsk: (message) => {
        return new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            rl.question(message + '\n', (response) => {
                resolve(response);
                rl.close();
            });
        });
    }
}

module.exports = Question;