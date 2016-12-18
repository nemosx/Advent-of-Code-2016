class DisplayMatrix {

    constructor(rows, columns) {
        function createEmptyMatrix(rows, columns) {
            return new Array(rows).fill(0).map(val => {
                return new Array(columns).fill(0);
            });
        }

        this.rows = rows;
        this.columns = columns;
        this.matrix = createEmptyMatrix(rows, columns);
    }

    getValue(row, column) {
        return this.matrix[row][column];
    }

    setValue(row, column, value) {
        this.matrix[row][column] = value;
    }

    print() {
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j]) {
                    process.stdout.write("#");
                } else {
                    process.stdout.write(' ');
                }
            }
            process.stdout.write('\n');
        }

    }

    /*
     rect AxB turns on all of the pixels in a rectangle at the top-left of the screen which is A columns and B rows.
     */
    rect(a, b) {
        for (let r = 0; r < b; r++) {
            for (let c = 0; c < a; c++) {
                this.setValue(r, c, 1);
            }
        }
    }

    /*
     rotate row y=A by B shifts all of the pixels in row A (0 is the top row) right by B pixels.
     Pixels that would fall off the right end appear at the left end of the row.
     */
    rotateRow(a, b) {
        const row = this.matrix[a];
        const length = row.length;

        row.map((value, currentIndex) => {
            return {
                updatedIndex: ((currentIndex + b) % length),
                value: value
            };
        }).forEach((update) => {
            row[update.updatedIndex] = update.value;
        });
    }

    /*
     rotate column x=A by B shifts all of the pixels in column A (0 is the left column) down by B pixels.
     Pixels that would fall off the bottom appear at the top of the column.
     */
    rotateColumn(a, b) {
        let columnIterator = this.columnIterator(a);
        const columnLength = this.matrix.length;

        Array.from(columnIterator).map(value => {
            value.rowIndex = ((value.rowIndex + b) % columnLength);
            return value;
        }).forEach(update => {
            this.matrix[update.rowIndex][update.columnIndex] = update.value;
        });
    }

    columnIterator(column) {
        var nextRowIndex = 0;
        const numberRows = this.matrix.length;
        const matrix = this.matrix;

        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                if (nextRowIndex < numberRows) {
                    let nextValue = {
                        value: {
                            rowIndex: nextRowIndex,
                            columnIndex: column,
                            value: matrix[nextRowIndex][column],
                        },
                        done: false
                    };
                    ++nextRowIndex;
                    return nextValue;
                }
                return {done: true};
            }
        }
    }

    get activePixels() {
        return this.matrix.reduce((accumulator, currentRow) => {
            return accumulator + currentRow.reduce((columnCounter, value) => {
                    return columnCounter + value;
                }, 0);
        }, 0);
    }

    get size() {
        return this.rows * this.columns;
    }
}

const assert = require('assert');

assert(new DisplayMatrix(0, 0).size === 0);
assert(new DisplayMatrix(1, 3).size === 3);
assert(new DisplayMatrix(2, 3).size === 6);

let matrix = new DisplayMatrix(5, 4);
assert(matrix.activePixels === 0);
assert(matrix.getValue(0, 3) === 0);
matrix.setValue(0, 3, 1);
assert(matrix.getValue(0, 3) === 1);
assert(matrix.activePixels === 1);

matrix = new DisplayMatrix(3, 7);
assert(matrix.activePixels === 0);
matrix.rect(3, 2);
assert(matrix.activePixels === 6);


const display = new DisplayMatrix(6, 50);
const fs = require('fs');

fs.readFileSync('input.txt', 'utf-8')
    .split('\n')
    .forEach(command => {
        if (command.startsWith('rect')) {
            const exp = /rect (\d+)x(\d+)/;
            const matches = exp.exec(command);

            const a = parseInt(matches[1], 10);
            const b = parseInt(matches[2], 10);

            display.rect(a, b);
        }
        else if (command.startsWith('rotate column')) {
            const exp = /rotate column x=(\d+) by (\d+)/;
            const matches = exp.exec(command);

            const a = parseInt(matches[1], 10);
            const b = parseInt(matches[2], 10);

            display.rotateColumn(a, b);
        }
        else if (command.startsWith('rotate row')) {
            const exp = /rotate row y=(\d+) by (\d+)/;
            const matches = exp.exec(command);

            const a = parseInt(matches[1], 10);
            const b = parseInt(matches[2], 10);

            display.rotateRow(a, b);
        }
    })

console.log(display.activePixels);

display.print();
