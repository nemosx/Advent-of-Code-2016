const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    const numValid = data.split('\n').reduce((validCount, triangle) => {
        let triangleValues = triangle.trim().split(' ').map(val => {return Number(val);});

        const maxValue = Math.max(...triangleValues);

        const sum = triangleValues.reduce((sum, val) => {return sum + val;}, 0);

        const isValidTriangle = maxValue < sum - maxValue;

        return isValidTriangle ? validCount + 1 : validCount;
    }, 0);

    console.log(numValid);
})