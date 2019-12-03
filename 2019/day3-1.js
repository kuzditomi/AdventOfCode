const input = require('./day3.input.json');

function fillWireInDirection(wire, direction, point) {
    const dir = direction[0];
    const step = Number(direction.substr(1, direction.length - 1));

    for (let i = 0; i < step; i++) {
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

        wire[`${point.x}-${point.y}`] = true;
    }
}

function fillWire(wire, directions) {
    let point = { x: 0, y: 0 };

    for (direction of directions) {
        fillWireInDirection(wire, direction, point);
    }
}


const wireA = {};
const wireB = {};

fillWire(wireA, input[0]);
fillWire(wireB, input[1]);

let closestDistance = Number.MAX_VALUE;

for (let point in wireA) {
    if (wireB[point]) {
        const distance = point.split('-').map(Number).reduce((sum, number) => sum + number, 0);

        if (distance < closestDistance) {
            closestDistance = distance;
        }
    }
}

console.log(closestDistance)