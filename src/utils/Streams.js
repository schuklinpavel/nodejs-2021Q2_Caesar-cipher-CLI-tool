import { Transform } from 'stream';
import getCaesarCipherText from "./getCaesarCipherText.js";

export class CaesarCipherTransform extends Transform {
    constructor({ action, shift, oldOutput }) {
        super();
        this.action = action;
        this.shift = shift;
        this.oldOutput = oldOutput;
    }

    _transform(chunk, encoding, callback) {
        try {
            const resultString = getCaesarCipherText({
                text: chunk.toString('utf8'),
                action: this.action,
                shift: this.shift,
                oldOutput: this.oldOutput,
            });
            callback(null, resultString);
        } catch (err) {
            callback(err);
        }
    }
}
