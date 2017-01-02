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

    executeCommands() {
        console.log(
            'bot ' + this.id + ' with chips ' +
            this.chips + ' ready to execute commands');

        this.commands.forEach(cmd => {
            cmd();
        });
    }

    checkForSolution() {
        if (this.chips.includes(61) && this.chips.includes(17)) {
            console.log('THIS BOT ', this.id);
        }
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
        });
        return lowest;
    }

    getHigh() {
        let highest = this.chips[0];
        this.chips.forEach(val => {
            if (val > highest) {
                highest = val;
            }
        });
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

var pendingCommandCount = 0;
function decrementPendingCommands() {
    pendingCommandCount--;

    if (pendingCommandCount === 0) {
        console.log("Bot Map: ", botMap);
        console.log("Output Map", outputMap);
        console.log('Part 2 Solution: ' + outputMap.get(0).chips[0] * outputMap.get(1).chips[0] * outputMap.get(2).chips[0]);
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
    return outputBucket;
}


const botMap = new Map();
const outputMap = new Map();

const fs = require('fs');
const instructions = fs.readFileSync('input.txt', 'utf-8');

const VALUE_REGEX =  /value (\d+) goes to (.*)/;
const GIVES_REGEX = /(.*) gives low to (.*) and high to (.*)/;

instructions.split('\n').forEach(instruction => {
    let matches;

    if (matches = VALUE_REGEX.exec(instruction)) {
        const chip = parseInt(matches[1], 10);
        const bot = matches[2];

        getDestination(bot)
            .addChip(chip);
    }
    else if (matches = GIVES_REGEX.exec(instruction)) {
        const [, bot, lowDestination, highDestination] = matches;

        getDestination(bot)
            .addCommands(lowDestination, highDestination);
    }
});


