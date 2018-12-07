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
    const perimeter = 10000;

    const totalManhattanDistanceOf = (x: number, y: number) =>
        coordinates.reduce(
            (sum, coordinate) => sum + Math.abs(coordinate[0] - x) + Math.abs(coordinate[1] - y)
            , 0
        );

    let sizeOfSafeArea = 0;
    for (let y = 0; y <= height; y++) {
        for (let x = 0; x <= width; x++) {
            if (totalManhattanDistanceOf(x, y) < perimeter) {
                sizeOfSafeArea++;
            }
        }
    }

    console.log(sizeOfSafeArea);
}