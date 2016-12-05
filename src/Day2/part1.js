/**
 * Created by Michael Root on 12/4/2016.
 */
const fs = require('fs');
var part1 = true;
var startingButton = [2, 2];

const keyPad =
    [   [-1, -1, -1, -1, -1],
        [-1, 1, 2, 3, -1],
        [-1, 4, 5, 6, -1],
        [-1, 7, 8, 9, -1],
        [-1, -1, -1, -1, -1]
    ];

const altKeyPad = [
    [-1, -1, -1,   1, -1, -1, -1, -1],
    [-1, -1,  2,   3,  4, -1, -1],
    [-1,  5,  6,   7,  8,  9, -1],
    [-1, -1, 'A', 'B', 'C', -1, -1],
    [-1, -1, -1,  'D', -1,  -1,  -1],
    [-1, -1, -1,  -1, 1, -1, -1, -1]
];

const buttonOperations = {
    'U': function (previousButton) {
        var nextButton = [previousButton[0], previousButton[1] - 1];
        return inBounds(nextButton) ? nextButton : previousButton.slice();
    },
    'D': function (previousButton) {
        var nextButton = [previousButton[0], previousButton[1] + 1];
        return inBounds(nextButton) ? nextButton : previousButton.slice();
    },
    'L': function (previousButton) {
        var nextButton = [previousButton[0] - 1, previousButton[1]];
        return inBounds(nextButton) ? nextButton : previousButton.slice();
    },
    'R': function (previousButton) {
        var nextButton = [previousButton[0] + 1, previousButton[1]];
        return inBounds(nextButton) ? nextButton : previousButton.slice();
    }
};

function inBounds(button) {

    if (part1) {
        return keyPad[button[1]][button[0]] !== -1;
    }
    return altKeyPad[button[1]][button[0]] !== -1;
}

function processInstruction(previousButton, instruction) {
    return buttonOperations[instruction](previousButton);
}



fs.readFile('input-part-1.txt', 'utf-8', (err, data) => {

    function processLine(presses, line) {
        var result = line.split('').reduce(processInstruction, startingButton);

        startingButton = result;

        presses.push([result[0], result[1]]);

        return presses;
    }

    var presses = data.split('\n').reduce(processLine, []).map(keyPadLocation => {
        return keyPad[keyPadLocation[1]][keyPadLocation[0]];
    }).join('');

    console.log(presses);
});