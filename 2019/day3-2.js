const input = require('./day3.input.json');

function fillWire(wire, directions) {
    let point = { x: 0, y: 0 };
    let stepsToReach = 1;
    for (direction of directions) {
        const dir = direction[0];
        const step = Number(direction.substr(1, direction.length - 1));
        for (let i = 0; i < step; i++ , stepsToReach++) {
            switch (dir) {
                case 'U':
                    point.y++;
                    break;
                case 'R':
                    point.x++;
                    break;
                case 'D':
                    point.y--;
                    break;
                case 'L':
                    point.x--;
                    break;
            }

            if (!wire[`${point.x}-${point.y}`])
                wire[`${point.x}-${point.y}`] = stepsToReach;
        }
    }
}

const wireA = {};
const wireB = {};

fillWire(wireA, input[0]);
fillWire(wireB, input[1]);

let closestCombinedSteps = Number.MAX_VALUE;

for (let point in wireA) {
    if (wireB[point]) {
        const combinedStepsToIntersection = wireA[point] + wireB[point];

        if (combinedStepsToIntersection < closestCombinedSteps) {
            closestCombinedSteps = combinedStepsToIntersection;
        }
    }
}

console.log(closestCombinedSteps)