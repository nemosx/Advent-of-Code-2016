/**
 * Created by Michael Root on 12/4/2016.
 */
"use strict";

class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    scale(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    rotateRight(v) {
        if (!v) {
            return this.rotateRight(this);
        }

        const x = v.x * 0 + v.y * 1;
        const y = v.x * -1 + v.y * 0;
        return new Vector(x, y);
    }

    rotateLeft(v) {
        if (!v) {
            return this.rotateLeft(this);
        }
        const x = v.x * 0 + v.y * -1;
        const y = v.x * 1 + v.y * 0;
        return new Vector(x, y);
    }
}

function numberBlocksAway(v) {
    return Math.abs(v.x) + Math.abs(v.y);
}

var location = new Vector(0, 0);
var direction = new Vector(0, 1);

var fs = require('fs');

fs.readFile('input-part-1.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    const instructions = data.split(', ');

    instructions.forEach(function (instruction) {
        direction = instruction.substring(0, 1) === 'R' ? direction.rotateRight() : direction.rotateLeft();

        location = location.add(direction.scale(Number(instruction.substring(1))));
    });

    console.log(location);
    console.log('Number of blocks away: ', numberBlocksAway(location));
});




