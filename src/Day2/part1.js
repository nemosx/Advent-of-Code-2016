/**
 * Created by Michael Root on 12/4/2016.
 */
const fs = require('fs');

const startingButton = [1, 1];

const keyPad =
    [   [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

const buttonOperations = {
    'U': function (previousButton) {
        if (previousButton[1] !== 0) {
            previousButton[1]--;
        }
        return previousButton;
    },
    'D': function (previousButton) {
        if (previousButton[1] !== 2) {
            previousButton[1]++;
        }
        return previousButton;
    },
    'L': function (previousButton) {
        if (previousButton[0] !== 0) {
            previousButton[0]--;
        }
        return previousButton;
    },
    'R': function (previousButton) {
        if (previousButton[0] !== 2) {
            previousButton[0]++;
        }
        return previousButton;
    }
};

function processInstruction(previousButton, instruction) {
    console.log('instruction', instruction);
    return buttonOperations[instruction](previousButton);
}



fs.readFile('input-part-1.txt', 'utf-8', (err, data) => {

    function processLine(presses, line) {
        var result = line.split('').reduce(processInstruction, startingButton);

        presses.push([result[0], result[1]]);

        return presses;
    }

    var presses = data.split('\n').reduce(processLine, []).map(keyPadLocation => {
        return keyPad[keyPadLocation[1]][keyPadLocation[0]];
    }).join('');

    console.log(presses);
});