{
    let coordinates = [
        [355, 246],
        [259, 215],
        [166, 247],
        [280, 341],
        [54, 91],
        [314, 209],
        [256, 272],
        [149, 313],
        [217, 274],
        [299, 144],
        [355, 73],
        [70, 101],
        [266, 327],
        [51, 228],
        [274, 123],
        [342, 232],
        [97, 100],
        [58, 157],
        [130, 185],
        [135, 322],
        [306, 165],
        [335, 84],
        [268, 234],
        [173, 255],
        [316, 75],
        [79, 196],
        [152, 71],
        [205, 261],
        [275, 342],
        [164, 95],
        [343, 147],
        [83, 268],
        [74, 175],
        [225, 130],
        [354, 278],
        [123, 206],
        [166, 166],
        [155, 176],
        [282, 238],
        [107, 295],
        [82, 92],
        [325, 299],
        [87, 287],
        [90, 246],
        [159, 174],
        [295, 298],
        [260, 120],
        [203, 160],
        [72, 197],
        [182, 296]
    ];

    const width = Math.max(...coordinates.map(c => c[0]));
    const height = Math.max(...coordinates.map(c => c[1]));

    const arrayInitializer = function*<T>(size: number, value: T) {
        let index = 0;
        while (index < size) {
            yield value;
            index++;
        }
    }

    const grid: number[][] = [...arrayInitializer(height + 1, 0)].map(a => [...arrayInitializer(width + 1, 0)]);
    coordinates.forEach((coordinate, index) => grid[coordinate[1]][coordinate[0]] = index + 1);

    const shortestManhattanFrom = (coordinates: number[][], x: number, y: number) => {
        const min = coordinates.reduce((best, coordinate: number[], index) => {
            const distance = Math.abs(coordinate[0] - x) + Math.abs(coordinate[1] - y);

            if (distance === best.distance) {
                best.hasEqual = true;
            } else if (distance < best.distance) {
                best.hasEqual = false;
                best.distance = distance;
                best.point = index + 1;
            }

            return best;
        }, { distance: width * 2 + height * 2, hasEqual: false, point: 0 })

        const mindistance = min.hasEqual ? -1 : min.point;

        grid[y][x] = mindistance / 10;

        return mindistance;
    }

    const areas: { [pointKey: number]: number } = {}
    const infinites: { [pointKey: number]: boolean } = {};

    for (let y = 0; y <= height; y++) {
        for (let x = 0; x <= width; x++) {
            const closestPoint = shortestManhattanFrom(coordinates, x, y);
            if (closestPoint !== -1) {
                areas[closestPoint] = areas[closestPoint] ? areas[closestPoint] + 1 : 2;

                if (x === 0 || y === 0 || x === width || y === height) {
                    infinites[closestPoint] = true;
                }
            }
        }
    }

    const largestNonInfinite = Math.max(
        ...Object
            .keys(areas)
            .filter(k => !infinites[k as any as number])
            .map(k => areas[k as any as number])
    );

    console.log(largestNonInfinite-1);
}