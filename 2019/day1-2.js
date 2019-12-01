const input = require('./day1.input.json');

const fuelNeededForModule = mass => {
    const fuel = Math.floor(mass / 3) - 2;

    return fuel > 0 ? fuel + fuelNeededForModule(fuel) : 0;
}

const totalFuelNeeded = input.reduce((sum, module) => sum + fuelNeededForModule(module), 0);

console.log(totalFuelNeeded);
