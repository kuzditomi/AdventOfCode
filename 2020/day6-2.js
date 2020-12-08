const input = require('./day6.input.json');

const getCommonAnswers = (answers) => {
    const all = answers.join('');
    const sum = {};

    for (let char of all) {
        sum[char] = (sum[char] || 0) + 1;
    }
    return Object.values(sum)
        .reduce((total, count) => total + (count === answers.length ? 1 : 0), 0);
};

const uniqAnswersSum = input
    .map(answers => getCommonAnswers(answers))
    .reduce((sum, number) => sum + number, 0);

console.log(uniqAnswersSum);