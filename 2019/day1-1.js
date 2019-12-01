const input = require('./day1.input.json');

const fuelNeededForModule = mass => Math.floor(mass / 3) - 2;

const fuelNeededForModules = input.reduce((sum, module) => sum + fuelNeededForModule(module), 0);

console.log(fuelNeededForModules);