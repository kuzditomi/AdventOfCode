const input = require('./day4.input.json');

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const requiredFieldsCount = requiredFields.length;

const isPasswordDataValid = (passwordData) => {
    let state = 'initial';

    let field = '';
    let value = '';
    let presentValueCount = 0;

    const processValue = () => {
        switch (field) {
            case 'byr': {
                if (Number(value) <= 2002 && Number(value) >= 1920) {
                    presentValueCount++;
                    break;
                } else {
                    return false;
                }
            }
            case 'iyr': {
                if (Number(value) <= 2020 && Number(value) >= 2010) {
                    presentValueCount++;
                    break;
                } else {
                    return false;
                }
            }
            case 'eyr': {
                if (Number(value) <= 2030 && Number(value) >= 2020) {
                    presentValueCount++;
                    break;
                } else {
                    return false;
                }
            }
            case 'hgt': { // TODO
                const height = Number(value.slice(0, value.length - 2));
                
                if (value[value.length - 1] == 'n') {
                    if (height >= 59 && height <= 76) {
                        presentValueCount++;
                        break;
                    }
                } else if (value[value.length - 1] == 'm') {
                    if (height >= 150 && height <= 193) {
                        presentValueCount++;
                        break;
                    }
                }

                return false;
            }
            case 'hcl': {
                if (value.match(/^#[0-9a-f]{6}$/)) {
                    presentValueCount++;
                    break;
                } else {
                    return false;
                }
            }
            case 'ecl': {
                if (['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(value) > -1) {
                    presentValueCount++;
                    break;
                } else {
                    return false;
                }
            }
            case 'pid': {
                if (value.match(/^\d{9}$/)) {
                    presentValueCount++;
                    break;
                } else {
                    return false;
                }
            }
        }
    }

    for (let i = 0; i < passwordData.length; i++) {
        const char = passwordData[i];

        switch (state) {
            case 'initial': {
                if (char === ' ') {
                    break;
                }
                field = char;
                state = 'char1';
                break;
            }
            case 'char1': {
                field += char;
                state = 'char2';
                break;
            }
            case 'char2': {
                field += char;
                state = 'colon';
                break;
            }
            case 'colon': {
                state = 'value';
                value = '';
                break;
            }
            case 'value': {
                if(i == passwordData.length - 1){
                    value += char;
                    processValue();
                }
                else if (char == ' ' ) {
                    processValue();
                    state = 'initial'
                } else {
                    value += char;
                }
                break;
            }
        }
    }

    if (presentValueCount === requiredFieldsCount) {
        return true;
    }

    return false;
}

const validPasswordCount = input.reduce((total, passwordData) => total + isPasswordDataValid(passwordData), 0);

console.log(validPasswordCount);