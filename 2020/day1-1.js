const input = require('./day1.input.json');

for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
        if (input[i] + input[j] === 2020) {
            console.log(input[i] * j);
            return;
        }
    }
}