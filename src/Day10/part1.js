class Bot {

    constructor(id) {
        this.id = id;
        this.chips = [];
        this.commands = [];
    }

    addChip(chipId) {
        this.chips.push(chipId);

        this.executeIfReady();
    }

    removeChip(chipId) {
        const index = this.chips.indexOf(chipId);
        const removedValue = this.chips.splice(index, 1)[0];

        return removedValue;
    }

    executeIfReady() {
        if (this.chips.length === 2 && this.commands.length === 2) {
            this.checkForSolution();
            this.executeCommands();
        }
    }

    checkForSolution() {
        if (this.chips.includes(61) && this.chips.includes(17)) {
            console.log('THIS BOT ', this.id);
        }
    }

    executeCommands() {
        console.log(
            'bot ' + this.id + ' with chips ' +
            this.chips + ' has scheduled commands for execution');

        this.commands.forEach(cmd => {
            //invoke the command asynchronously
            setTimeout(cmd, 1);
        });
    }

    addCommands(lowDest, highDest) {
        let thisBot = this;
        this.commands.push(function() {
            getDestination(lowDest).addChip(
                thisBot.removeChip(thisBot.getLow()));
            decrementPendingCommands();
        });

        this.commands.push(function() {
            getDestination(highDest).addChip(
                thisBot.removeChip(thisBot.getHigh()));
            decrementPendingCommands();
        });

        this.executeIfReady();

        pendingCommandCount += 2;
    }

    getLow() {
        let lowest = this.chips[0];

        this.chips.forEach(val => {

            if (val < lowest) {
                lowest = val;
            }
        })
        return lowest;
    }

    getHigh() {
        let highest = this.chips[0];
        this.chips.forEach(val => {
            if (val > highest) {
                highest = val;
            }
        })
        return highest;
    }
}

class OutputBucket {
    constructor(id) {
        this.id = id;
        this.chips = [];
    }

    addChip(chipId) {
        this.chips.push(chipId);
    }
}

function decrementPendingCommands() {
    pendingCommandCount--;

    if (pendingCommandCount === 0) {
        console.log("Bot Map: ", botMap);
        console.log("Output Map", outputMap);
    }
}

function getDestination(destination) {
    const regex = /(bot|output) (\d+)/g;

    const matches = regex.exec(destination);
    const destinationType = matches[1];
    const destinationId = parseInt(matches[2], 10);

    return destinationType === 'bot' ? getBot(destinationId) : getOutput(destinationId);
}

function getBot(botId) {
    let bot = botMap.get(botId);

    if (!bot) {
        bot = new Bot(botId);
        botMap.set(botId, bot);
    }
    return bot;
}

function getOutput(outputId) {
    let outputBucket = outputMap.get(outputId);

    if (!outputBucket) {
        outputBucket = new OutputBucket(outputId);
        outputMap.set(outputId, outputBucket);
    }

    console.log('outputbucket', outputBucket);
    return outputBucket;
}


const botMap = new Map();
const outputMap = new Map();

const fs = require('fs');

const instructions = fs.readFileSync('input.txt', 'utf-8');

var pendingCommandCount = 0;

instructions.split('\n').forEach(instruction => {
    if (instruction.startsWith('value')) {
        const valueRegex = /value (\d+) goes to (.*)/
        const matches = valueRegex.exec(instruction);
        const chip = parseInt(matches[1], 10);
        const destination = matches[2];

        getDestination(destination).addChip(chip);
    }
    else {
        const regex = /(.*) gives low to (.*) and high to (.*)/;
        const matches = regex.exec(instruction);
        const source = matches[1];
        const lowDestination = matches[2];
        const highDestination = matches[3];

        getDestination(source)
            .addCommands(lowDestination, highDestination);

    }
})


