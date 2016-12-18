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

    equals(v) {
        return this.x === v.x && this.y === v.y;
    }

    scale(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    rotateRight(v) {
        if (!v) {
            return this.rotateRight(this);
        }

        const x = v.y * 1;
        const y = v.x * -1;

        return new Vector(x, y);
    }

    rotateLeft(v) {
        if (!v) {
            return this.rotateLeft(this);
        }
        const x = v.y * -1;
        const y = v.x * 1;

        return new Vector(x, y);
    }
}

function numberBlocksAway(v) {
    return Math.abs(v.x) + Math.abs(v.y);
}

function generatePositions(oldPosition, movementVector) {
    const positions = [];

    let x = movementVector.x;
    let y = movementVector.y;

    while (x !== 0) {
        x > 0 ? --x : ++x;
        let updatedXPosition = oldPosition.x + x;
        positions.push(new Vector(updatedXPosition, oldPosition.y));
    }

    while (y !== 0) {
        y > 0 ? --y : ++y;
        let updatedYPosition = oldPosition.y + y;
        positions.push(new Vector(oldPosition.x, updatedYPosition));
    }

    return positions.reverse();
}

let currentLocation = new Vector(0, 0);
let normalizedDirection = new Vector(0, 1);

const fs = require('fs');
const previouslyVisitedLocations = [];

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const instructions = data.split(', ');

    instructions.forEach((instruction) => {
        normalizedDirection = instruction.substring(0, 1) === 'R' ? normalizedDirection.rotateRight() : normalizedDirection.rotateLeft();

        const scalar = Number(instruction.substring(1));
        const scaledVector = normalizedDirection.scale(scalar);

        const updatedLocation = currentLocation.add(scaledVector);
        const locationsFromOldToUpdated = generatePositions(currentLocation, scaledVector);

        locationsFromOldToUpdated.forEach((intermediateLocations) => {

            const visitedBefore = previouslyVisitedLocations.filter(previous => {
               return previous.equals(intermediateLocations);
           });

           if (visitedBefore.length > 0) {
               console.log('Visited Before', visitedBefore);
               console.log('Part 2 Answer: [Blocks]',  numberBlocksAway(visitedBefore[0]));
           }
        });

        previouslyVisitedLocations.push(...locationsFromOldToUpdated);
        currentLocation = updatedLocation;
    });

    console.log(currentLocation);
    console.log('Part 1 Answer: [Blocks Away]', numberBlocksAway(currentLocation));
});




