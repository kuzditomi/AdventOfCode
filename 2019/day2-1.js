const input = require('./day2.input.json');

// fix input to be like before the crash
input[1] = 12;
input[2] = 2;

// do operation
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

console.log(input[0]);