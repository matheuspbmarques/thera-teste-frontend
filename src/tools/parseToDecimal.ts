export default function parseToDecimalString(value: string): { valueString: string, valueNumber: number } {
    const numbers = value.replaceAll(/\D/g, '').split('');

    let newValueString: string = '';
    let newValueNumber: number = 0;

    while (numbers[0] === '0') {
        numbers.shift();
    };

    if (numbers.length === 1) {
        numbers.unshift('0', ',', '0');
    } else if (numbers.length === 2) {
        numbers.unshift('0', ',');
    } else if (numbers.length === 3) {
        numbers.splice(1, 0, ',');
    } else {
        let numberLengthCheck: number = 2;

        while (numbers.length > numberLengthCheck) {
            if (numberLengthCheck === 2) {
                numbers.splice(numbers.length - 2, 0, ',');

                numberLengthCheck += 4;
            } else {
                numbers.splice(numbers.length - numberLengthCheck, 0, '.');

                numberLengthCheck += 4;
            };
        };
    };

    if (numbers.length > 0) {
        numbers.forEach(number => {
            newValueString = newValueString + number;
        });
    };

    if (newValueString !== '') {
        newValueNumber = parseFloat(newValueString.replaceAll('.', '').replace(',', '.'))
    };

    return {
        valueNumber: newValueNumber,
        valueString: newValueString
    }
};