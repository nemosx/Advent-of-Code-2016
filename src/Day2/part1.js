/**
 * Created by Michael Root on 12/4/2016.
 */
let part1 = true;

//The col, row coordinates to key 5
let startingButton = part1 ? [2, 2] : [1, 3];

let keyPad = part1 ?
    [[-1, -1, -1, -1, -1],
        [-1, 1, 2, 3, -1],
        [-1, 4, 5, 6, -1],
        [-1, 7, 8, 9, -1],
        [-1, -1, -1, -1, -1]
    ] :
    [
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, 1, -1, -1, -1, -1],
        [-1, -1, 2, 3, 4, -1, -1],
        [-1, 5, 6, 7, 8, 9, -1],
        [-1, -1, 'A', 'B', 'C', -1, -1],
        [-1, -1, -1, 'D', -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1]
    ];

const buttonOperations = {
    'U': function (previousButton) {
        let nextButton = [previousButton[0], previousButton[1] - 1];
        return inBounds(nextButton) ? nextButton : previousButton.slice();
    },
    'D': function (previousButton) {
        let nextButton = [previousButton[0], previousButton[1] + 1];
        return inBounds(nextButton) ? nextButton : previousButton.slice();
    },
    'L': function (previousButton) {
        let nextButton = [previousButton[0] - 1, previousButton[1]];
        return inBounds(nextButton) ? nextButton : previousButton.slice();
    },
    'R': function (previousButton) {
        let nextButton = [previousButton[0] + 1, previousButton[1]];
        return inBounds(nextButton) ? nextButton : previousButton.slice();
    }
};

function inBounds(button) {
    return keyPad[button[1]][button[0]] !== -1;
}

function processInstruction(previousButton, instruction) {
    return buttonOperations[instruction](previousButton);
}

function processLine(presses, line) {
    const result = line.split('').reduce(processInstruction, startingButton);

    startingButton = result;

    presses.push([result[0], result[1]]);

    return presses;
}

const fs = require('fs');
fs.readFile('input-part-1.txt', 'utf-8', (err, data) => {
    const presses = data.split('\n').reduce(processLine, []).map(keyPadLocation => {
        return keyPad[keyPadLocation[1]][keyPadLocation[0]];
    }).join('');

    console.log(presses);
});