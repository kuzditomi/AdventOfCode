const [from, to] = require('./day4.input.json');


function canBePassword(i) {
    const stringified = i.toString();
    if (!stringified.match(/(.)\1/))
        return false;

    if (stringified.split('').sort().join('') !== stringified)
        return false;

    return true;
}

let count = 0;
for (let i = from; i < to; i++) {
    if (canBePassword(i)) {
        count++;
    }
}

console.log(count);