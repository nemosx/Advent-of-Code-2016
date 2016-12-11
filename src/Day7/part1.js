function getHyperNets(IPv7Address) {
    const hyperNetPattern = /\[(.+?)\]/g;
    const hyperNets = [];

    let hNet = hyperNetPattern.exec(IPv7Address);
    while (hNet !== null) {
        hyperNets.push(hNet[1]);
        hNet = hyperNetPattern.exec(IPv7Address);
    }
    return hyperNets;
}

function getAutoBridgeBypassAnnotations(IPv7Address) {
    const abbaPattern = /(\w)(\w)\2\1/g;
    const candidates = [];

    let abba = abbaPattern.exec(IPv7Address);

    while (abba !== null) {
        candidates.push(abba[0]);
        abba = abbaPattern.exec(IPv7Address);
    }
    return candidates.filter(candidate => {
        return candidate[0] !== candidate[1];
    });
}

function supportsTLS(ipAddress) {
    const hyperNets = getHyperNets(ipAddress);
    const abbas = getAutoBridgeBypassAnnotations(ipAddress);

    const hyperNetsContainingAbbas = hyperNets.filter(net => {
        //filter returns array of elements that pass the test (return true)
        return abbas.some(abba => {
            return net.includes(abba);
        });
    });

    if (hyperNetsContainingAbbas.length > 0) {
        //if hypernet contains a single abba  - it is over absolutely done
        return false;
    }

    return abbas.length > 0;
}



const assert = require('assert');

assert(supportsTLS('abba[mnop]qrst') === true);
assert(supportsTLS('abcd[bddb]xyyx') === false);
assert(supportsTLS('aaaa[qwer]tyui') === false);
assert(supportsTLS('ioxxoj[asdfgh]zxcvbn') === true);
assert(supportsTLS('i[oxxo]j[asdfgh]z[xcvb]n') === false);
assert(supportsTLS('ioxxoj[asdfgh]z[xcvb]n') === true);

const fs = require('fs');

const numSupported = fs.readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(supportsTLS)
    .length;

console.log(numSupported);