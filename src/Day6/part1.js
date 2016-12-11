const fs = require('fs');
const columns = [];

fs.readFileSync('input.txt', 'utf-8')
    .split('\n')
    .forEach(line =>  {
        line.split('')
            .map((currentValue, index) => {
                //check to see if a map exists @ the index, if not, create one and insert it
                if (!columns[index]) {
                   columns[index] = new Map();
                }
                let map = columns[index];

                let count = map.get(currentValue);

                if (!count) {
                    count = 0;
                }
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