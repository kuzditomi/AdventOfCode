const input = require('./day3.input.json');

const map = input.map(row => row.split(''));

const xPositions = [0, 0, 0, 0, 0];
const triesForX = [1, 3, 5, 7, 1];
const triesForY = [1, 1, 1, 1, 2];
const treesForTries = [0, 0, 0, 0, 0];

const width = map[0].length;

for (let y = 0; y < map.length - 1; y += 1) {
    for (let i = 0; i < triesForX.length; i++) {
        if (y % triesForY[i] === 0) {
            xPositions[i] = (xPositions[i] + triesForX[i]) % width;
            if (map[y + triesForY[i]][xPositions[i]] === '#') {
                treesForTries[i]++;
            }
        }
    }
}

console.log(treesForTries.join(','));
console.log(treesForTries.reduce((result,count)=>result*count,1));