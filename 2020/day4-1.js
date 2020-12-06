const input = require('./day4.input.json');

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const requiredFieldsCount = requiredFields.length;
const regexp = new RegExp(`(${requiredFields.join(':|')})`, 'g');

const isPasswordDataValid = (passwordData) => passwordData.match(regexp)?.length === requiredFieldsCount;

const validPasswordCount = input.reduce((total, passwordData) => total + isPasswordDataValid(passwordData), 0);

console.log(validPasswordCount);