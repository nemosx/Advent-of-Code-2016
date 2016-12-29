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

    const numberOfCharactersBeforeMatch =  matches.index;
    const numberOfCharactersToProcess = parseInt(matches[1], 10);
    const repeatCount = parseInt(matches[2], 10);

    const startIndex = numberOfCharactersBeforeMatch + matches[0].length;
    const endIndex = startIndex + numberOfCharactersToProcess;

    return numberOfCharactersBeforeMatch
        + (decompress(input.slice(startIndex, endIndex)) * repeatCount)
        + decompress(input.slice(endIndex));
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

