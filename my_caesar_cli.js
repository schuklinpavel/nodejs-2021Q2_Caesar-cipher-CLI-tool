import fs from 'fs';
import { pipeline } from 'stream/promises';
import minimist from 'minimist';

import { CaesarCipherTransform } from "./Streams.js";
import {getText} from "./utils.js";

const args = minimist(process.argv.slice(2), {
    alias: {
        a: 'action',
        s: 'shift',
        i: 'input',
        o: 'output',
    },
});
console.dir(args);

console.log('Hello world!');

const { action, input, output } = args;
let { shift } = args;

if (shift === true) {
    const index = process.argv?.findIndex(i => i === '-s' || i === '--shift');
    if (index) shift = parseInt(process.argv[index + 1]);
}

if ((action !== 'encode' && action !== 'decode') || !parseInt(shift)) {
    console.error('Ошибка');
    process.exit(-1);
}

console.log(getText({text: 'Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!', action: 'decode', shift: 7}));
console.log(getText({text: 'This is secret. Message about "_" symbol!', action: 'encode', shift: 7}));
console.log(getText({text: 'This is secret. Message about "_" symbol!', action: 'encode', shift: 12}));
console.log(getText({text: 'This is secret. Message about "_" symbol!', action: 'encode', shift: 233}));
console.log(getText({text: 'This is secret. Message about "_" symbol!', action: 'encode', shift: 26}));
console.log('---------')
console.log(getText({text: 'This is secret. Message about "_" symbol!', action: 'encode', shift: -1}));
console.log(getText({text: 'Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!', action: 'decode', shift: -1}));
console.log('---------')
console.log(getText({text: 'This is secret. Message about "_" symbol!', action: 'encode', shift: -25}));
console.log(getText({text: 'This is secret. Message about "_" symbol!', action: 'encode', shift: -26}));
console.log(getText({text: 'This is secret. Message about "_" symbol!', action: 'encode', shift: -27}));
console.log(getText({text: 'This is secret. Message about "_" symbol!', action: 'encode', shift: -28}));
console.log(getText({text: 'This is secret. Message about "_" symbol!', action: 'encode', shift: -2}));
console.log('+++++++++')
async function run() {
    await pipeline(
        input ? fs.createReadStream(input) : process.stdin,
        new CaesarCipherTransform({ action, shift }),
        output ? fs.createWriteStream(output) : process.stdout,
    )
}

run().then(r => console.log(r));
