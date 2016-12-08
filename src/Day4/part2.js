/**
 * Created by Michael Root on 12/7/2016.
 */
function generateActualName(encryptedName, sectorId) {
    return encryptedName.split('').map(character => {
        if (character === '-') {
            return ' ';
        }

        for (let i = 0; i < sectorId; i++) {
            character = getNextCharacterWrapped(character, sectorId);
        }
        return character;
    }).join("");
}

function getNextCharacterWrapped(character) {
    const charCode = character.charCodeAt() - 97;
    const nextCode = ((charCode + 1) % 26) + 97;

    return String.fromCharCode(nextCode);
}

console.log('Test Validation', generateActualName('qzmt-zixmtkozy-ivhz', 343));

const fs = require('fs');
const regex = /(.*)-(\d{3})\[(\w{5})\]/;
const encryptedRoomNames = fs.readFileSync('input.txt', 'utf-8');

encryptedRoomNames.split('\n').forEach((encryptedRoom) => {
    const parsedComponents = regex.exec(encryptedRoom);

    const encryptedName = parsedComponents[1];
    const sectorId = parseInt(parsedComponents[2], 10);

    const actualRoomName = generateActualName(encryptedName, sectorId);

    if (actualRoomName === 'northpole object storage') {
        console.log('SectorId', sectorId);
    }
});
