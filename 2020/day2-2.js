const input = require('./day2.input.json');

const isPasswordEntryValid = (entry) => {
    const [requiredOccurances, letter, password] = entry;
    const [first, second] = requiredOccurances.split('-').map(Number);

    return (password[first-1] === letter) ^ (password[second-1] === letter);
}

const validPasswordCount = input.reduce((sum, passwordEntry) => {
    const isValid = isPasswordEntryValid(passwordEntry);

    return sum + (isValid ? 1 : 0);
}, 0)


console.log(validPasswordCount);