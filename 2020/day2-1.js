const input = require('./day2.input.json');


const isPasswordEntryValid = (entry) => {
    const [allowedOccurance, letter, password] = entry;
    const [min, max] = allowedOccurance.split('-').map(Number);

    const occurance = (password.match(new RegExp(letter, 'g')) || []).length;
    return occurance >= min && occurance <= max;
}

const validPasswordCount = input.reduce((sum, passwordEntry) => {
    const isValid = isPasswordEntryValid(passwordEntry);

    return sum + (isValid ? 1 : 0);
}, 0)


console.log(validPasswordCount);