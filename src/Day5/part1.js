const doorId = 'ojvtpuvg';
const fiveZeros = '00000';
const crypto = require('crypto');

function computeHash(message) {
    return crypto.createHash('md5').update(message).digest('hex');
}

function startsWithFiveZeros(hash)   {
    return hash.startsWith(fiveZeros);
}

function getCharacter(doorId, index) {
    const hash = computeHash(doorId + index);
    if (startsWithFiveZeros(hash)) {
        return hash[5];
    }
    return undefined;
}

function determinePassword() {
    let i = 0;
    let password = '';

    while (password.length < 8) {
        let nextCharacter = getCharacter(doorId, i++);
        if (nextCharacter){
            password = password + nextCharacter;
        }
    }
    return password;
}

const startTime = process.hrtime();
const password = determinePassword();
const endTime = process.hrtime(startTime);

console.info("Execution time (hr): %ds %dms", endTime[0], endTime[1]/1000000);
console.info(password);