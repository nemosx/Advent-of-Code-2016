function readInput() {
    const fs = require('fs');
    return fs.readFileSync('input.txt', 'utf-8');
}

function decompress(input) {
    const regex = /\((\d+)x(\d+)\)/g;
    let matches = regex.exec(input);

    if (!matches) {
        return input.length;
    }

    let result = 0;
    let cursor = 0;

    while (cursor < input.length) {
        if (matches && cursor === matches.index) {
            let numberOfCharactersToProcess = parseInt(matches[1], 10);
            let repeatCount = parseInt(matches[2], 10);

            cursor += matches[0].length;

            let nextInput = input.slice(cursor, cursor + numberOfCharactersToProcess);
            let intermediateResult = decompress(nextInput);

            result += intermediateResult * repeatCount;

            cursor += numberOfCharactersToProcess;

            while (matches && matches.index < cursor) {
                matches = regex.exec(input);
            }
        }
        else {
            result++;
            cursor++;
        }
    }
    return result;
}

const assert = require('assert');
assert(decompress('abc') === 3);
assert(decompress('a') === 1);
assert(decompress('(3x3)XYZ') === 9);
assert(decompress('(1x12)A') === 12);
assert(decompress('X(8x2)(3x3)ABCY') === 20);
assert(decompress('(27x12)(20x12)(13x14)(7x10)(1x12)A') === 241920);
assert(decompress('(3x3)ABC(2x3)XY') === 15);
assert(decompress('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN') === 445);

const input = readInput();
const decompressedLength = decompress(input);
console.log('Decompressed Input Length:', decompressedLength);

