const doorId = 'ojvtpuvg';
const fiveZeros = '00000';
const crypto = require('crypto');

function computeHash(message) {
    return crypto.createHash('md5').update(message).digest('hex');
}

function startsWithFiveZeros(hash) {
    return hash.startsWith(fiveZeros);
}

function isValidIndex(index) {
    return Number.isInteger(parseInt(index), 10) && index < 8;
}

function getCharacter(doorId, index) {
    const hash = computeHash(doorId + index);
    if (startsWithFiveZeros(hash) && isValidIndex(hash[5])) {
        return {
            index: hash[5],
            value: hash[6]
        };
    }
    return undefined;
}

function determinePassword() {
    let i = 0;
    const indexToCharacter = new Map();

    while (indexToCharacter.size < 8) {
        let nextCharacter = getCharacter(doorId, i++);
        if (nextCharacter && !indexToCharacter.has(nextCharacter.index)) {
            indexToCharacter.set(nextCharacter.index, nextCharacter.value);
        }
    }

    return Array.from(indexToCharacter.entries()).sort((a, b) => {
        return a[0] - b[0];
    }).map(pair => {
        return pair[1];
    }).join('');
}

const startTime = process.hrtime();
const password = determinePassword();
const endTime = process.hrtime(startTime);

console.info("Execution time (hr): %ds %dms", endTime[0], endTime[1] / 1000000);
console.info("password", password);