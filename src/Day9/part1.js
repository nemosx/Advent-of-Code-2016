function readInput() {
    const fs = require('fs');
    return fs.readFileSync('input.txt', 'utf-8');
}

function decompressInput(input) {
    let decompressedInput = '';
    let normalProcessing = true;

    let i = 0;
    let a, b;
    while (i < input.length) {
        if (input[i] === '(') {
            let potential = ''
            let terminationIndex;
            for (let j = i + 1; j < input.length; j++) {
                if (input[j] === ')') {
                    terminationIndex = j + 1;
                    break;
                }
                potential += input[j];
            }

            const exp = /(\d+)x(\d+)/;
            const matches = exp.exec(potential);

            if (matches) {
                a = parseInt(matches[1], 10);
                b = parseInt(matches[2], 10);
                normalProcessing = false;
                i = terminationIndex;
            }
        }

        if(normalProcessing) {
            decompressedInput += input[i];
            i++;
        } else {
            let nextInput = '';

            for (let k = 0; k < a; k++) {
                nextInput += input[i + k];
            }

            while (b--) {
                decompressedInput += nextInput;
            }
            normalProcessing = true;
            i += a;
        }
    }
    return decompressedInput;
}

const assert = require('assert');
assert(decompressInput('ADVENT') === 'ADVENT');
assert(decompressInput('(3x3)XYZ') === 'XYZXYZXYZ');
assert(decompressInput('A(1x5)BC') === 'ABBBBBC');
assert(decompressInput('A(2x2)BCD(2x2)EFG') === 'ABCBCDEFEFG');
assert(decompressInput('(6x1)(1x3)A') === '(1x3)A');
assert(decompressInput('X(8x2)(3x3)ABCY') === 'X(3x3)ABC(3x3)ABCY');

const input = readInput();
const decompressedInput = decompressInput(input);

console.log('Decompressed Input Length:', decompressedInput.length);