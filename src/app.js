import fs from 'fs';
import {pipeline} from 'stream/promises';
import minimist from 'minimist';

import {CaesarCipherTransform} from "./utils/Streams.js";
import {checkIncomingParams, checkShift} from "./utils/checkIncoming.js";

const args = minimist(process.argv.slice(2), {
    alias: {
        a: 'action',
        s: 'shift',
        i: 'input',
        o: 'output',
    },
});

const {action, input, output} = args;
const shift = checkShift(args.shift);

checkIncomingParams({action, shift});

const oldOutput = fs.readFileSync(output, 'utf8');

export const run = async () => {
    await pipeline(
        input
            ? fs.createReadStream(input).on('error', () => console.error('Ошибка открытия файла'))
            : process.stdin,
        new CaesarCipherTransform({action, shift, oldOutput}),
        output
            ? fs.createWriteStream(output).on('error', () => console.error('Ошибка записи файла'))
            : process.stdout,
    )
}
