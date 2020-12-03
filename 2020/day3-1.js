const map = require('./day3.input.json');

let treeCount = 0;
let x = 0;
const width = map[0].length;

for (let y = 0; y < map.length - 1; y += 1) {
    x = (x + 3) % width;

    if (map[y + 1][x] === '#') {
        treeCount++;
    }
}

console.log(treeCount);