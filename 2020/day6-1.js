const input = require('./day6.input.json');


const getUniqAnswers = (answers) => {
    return new Set(answers.join('').split('')).size;
};

const uniqAnswersSum = input
    .map(answers => getUniqAnswers(answers))
    .reduce((sum, number) => sum + number, 0);

console.log(uniqAnswersSum);