const originalInput = require('./day2.input.json');

function runProgram(input, noun, verb) {
    input[1] = noun;
    input[2] = verb;

    let position = 0;
    let opCode = input[position];

    while (opCode !== 99) {
        switch (opCode) {
            case 1:
                input[input[position + 3]] = input[input[position + 1]] + input[input[position + 2]];
                break;
            case 2:
                input[input[position + 3]] = input[input[position + 1]] * input[input[position + 2]];
                break;
            default:
                console.error('oops');
                break;
        }
        position += 4;
        opCode = input[position];
    }
    return input[0];
}

let noun = 0;
let verb = 0;

(() => {
    for (; noun <= 99; noun++) {
        for (verb = 0; verb <= 99; verb++) {
            const output = runProgram(originalInput.slice(), noun, verb);
            if (output == 19690720) {
                return;
            }
        }
    }
})()

console.log(noun * 100 + verb);