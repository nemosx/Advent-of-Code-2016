const fs = require('fs');
const columns = [];

fs.readFileSync('input.txt', 'utf-8')
    .split('\n')
    .forEach(line => {
        line.split('')
            .map((currentValue, index) => {
                let map = columns[index] = (columns[index] || new Map());
                let count = map.get(currentValue) || 0;
                map.set(currentValue, count + 1);
            })
    });

const answer = columns.map(countMap => {
    return Array.from(countMap.entries())
        .sort((a, b) => {
            return b[1] - a[1];
        })[0][0];
}).join('');

console.log(answer);