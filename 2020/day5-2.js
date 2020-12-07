const input = require('./day5.input.json');

const seatToNumber = (seat) => {
    const charArray = seat.split('');
    const row = charArray
        .slice(0, 7)
        .map(char => char == 'F' ? 0 : 1)
        .join('');

    const rowDecimal = parseInt(row, 2);

    const col = charArray
        .slice(7, 10)
        .map(char => char == 'L' ? 0 : 1)
        .join('');
    const colDecimal = parseInt(col, 2);

    return rowDecimal * 8 + colDecimal;
}

const seatIds = input.map(code => seatToNumber(code)).sort((a, b) => a - b);

for (let i = 1; i < seatIds.length - 1; i++) {
    if (seatIds[i + 1] != seatIds[i] + 1) {
        console.log(seatIds[i] + 1);
        break;
    }
}