const fs = require('fs');
var part1 = false;

function isValidTriangle(triangleValues) {
    const maxValue = Math.max(...triangleValues);
    const sum = triangleValues.reduce((sum, val) => {return sum + val;}, 0);

    return maxValue < sum - maxValue;
}

function countValidTriangles(triangles) {
    return triangles.reduce((validCount, triangle) => {
        return isValidTriangle(triangle) ? validCount + 1 : validCount;
    }, 0);
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
    var triangleArrays = data.split('\n').map(line => {

        return line.split(' ').map(val => {
            return Number(val);
        });
    });

    if (part1) {
        console.log('Part 1 Answer:', countValidTriangles(triangleArrays));
    } else {
        const totalRows = triangleArrays.length;
        var altTriangles = [];

        for (let i = 0; i < totalRows; i += 3) {
            altTriangles.push([triangleArrays[i][0], triangleArrays[i+1][0], triangleArrays[i+2][0]]);
            altTriangles.push([triangleArrays[i][1], triangleArrays[i+1][1], triangleArrays[i+2][1]]);
            altTriangles.push([triangleArrays[i][2], triangleArrays[i+1][2], triangleArrays[i+2][2]]);
        }

        console.log('Part 2 Answer:', countValidTriangles(altTriangles));
    }
})