function getBAB(aba) {
    return aba[1] + aba[0] + aba[1];
}

function isBrace(character) {
    return character === '[' || character === ']';
}

function getABAmatches(IPv7Address) {
    let candidates = [];
    let inHypernet = false;

    for (let i = 0; i < IPv7Address.length - 2; i++) {
        if (isBrace(IPv7Address[i]) || isBrace(IPv7Address[i + 1]) || isBrace(IPv7Address [i + 2])) {
            inHypernet = !inHypernet;
            continue;
        }

        if (IPv7Address[i] === IPv7Address [i + 2]) {
            if (!inHypernet) {
                candidates.push(IPv7Address[i] + IPv7Address[i + 1] + IPv7Address[i + 2]);
            }
        }
    }

    return candidates.filter(candidate => {
        return candidate[0] !== candidate[1];
    });
}

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


function supportsSSL(ipAddress) {
    const abas = getABAmatches(ipAddress);
    const hyperNets = getHyperNets(ipAddress);

    let babs = abas.map(getBAB);

    //if there exists one bab inside a hypernet, it supports SSL
    let supportsSSL = false;

    babs.forEach(bab => {
        if (hyperNets.join(',').includes(bab)) {
            supportsSSL = true;
        }
    });

    return supportsSSL;
}

const assert = require('assert');
assert(getABAmatches('aaa').length === 0);
assert(getABAmatches('aba').length === 1);
assert(getABAmatches('abab').length === 2);
assert(getABAmatches('aba[bab]').length === 1);
assert(getABAmatches('abaxyx').length === 2);
assert(getABAmatches('zazbz').length === 2);
assert(getABAmatches('ababa[a').length === 3);
assert(getABAmatches('abab[aaa]').length === 2);
assert(getABAmatches('abababa').length === 5);
assert(getABAmatches('dgdbdb[acd]kshc[dbdcomoa]khs').length === 3);
assert(getABAmatches('dgdbdb[acd]kshc[dbdcomoa]khslml').length === 4);

assert(getBAB('aba') === 'bab');
assert(getBAB('xyx') === 'yxy');

assert(supportsSSL('aba[bab]xyz') === true);
assert(supportsSSL('xyx[xyx]xyx') === false);
assert(supportsSSL('xyx[bab]aba') === true);
assert(supportsSSL('aaa[kek]eke') === true);
assert(supportsSSL('zazbz[bzb]cdb') === true);
assert(supportsSSL('hskmom[acd]kshc[dcomoa]khs') === true);
assert(supportsSSL('dgdbdb[acd]kshc[dbdcomoa]khs') === true);
assert(supportsSSL('iapqmjgrjnecxylopbo[pnbvgmbhbcmcnpsf]opurzpqoyxdxfkud') === false);
assert(supportsSSL('dgdbdb[acd]kshc[dbdcomoa]khs') === true);
assert(supportsSSL('abakshc[babcomoa]khs') === true);

const fs = require('fs');
const numSupported = fs.readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(supportsSSL)
    .length;

console.log(numSupported);