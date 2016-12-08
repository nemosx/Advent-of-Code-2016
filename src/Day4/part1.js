/**
 * Created by Michael Root on 12/7/2016.
 */
function computeChecksum(encryptedName) {
    const charactersToCount = new Map();

    encryptedName.split('').forEach(character => {
        if (character !== '-') {
            let count = charactersToCount.get(character);
            if (!count) {
                count = 0;
            }
            charactersToCount.set(character, count + 1);
        }
    });

    let keyValues = Array.from(charactersToCount.entries());
    keyValues.sort((a, b) => {
       //first compare count, then alpha
        if (a[1] === b[1]) {
            //count equal, so return alphanumeric sort
            return a[0].charCodeAt(0) - b[0].charCodeAt(0);
        }

        return b[1] - a[1];
    });

    let checkSum = '';
    for (let i = 0; i < 5; i++) {
        checkSum += keyValues[i][0];
    }
    return checkSum;
}

const fs = require('fs');
const regex = /(.*)-(\d{3})\[(\w{5})\]/;
const encryptedRoomNames = fs.readFileSync('input.txt', 'utf-8');

const sumOfValidRooms = encryptedRoomNames.split('\n').reduce((accumulator, encryptedRoom) => {
    const parsedComponents = regex.exec(encryptedRoom);

    const encryptedName = parsedComponents[1];
    const sectorId = parseInt(parsedComponents[2], 10);
    const checksum = parsedComponents[3];

    const actualChecksum = computeChecksum(encryptedName);

    return checksum === actualChecksum ? accumulator + sectorId : accumulator + 0;
}, 0);

console.log('Part 1 Answer: ', sumOfValidRooms);