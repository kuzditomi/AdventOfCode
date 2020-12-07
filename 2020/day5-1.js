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

const highest = input.reduce((highest, seat) => {
    const number = seatToNumber(seat);

    return highest > number ? highest : number;
}, 0);

console.log(highest);