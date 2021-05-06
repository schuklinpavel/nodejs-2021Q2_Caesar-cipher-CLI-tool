import { Transform } from 'stream';
import { getText } from "./utils.js";

export class CaesarCipherTransform extends Transform {
    constructor({ action, shift }) {
        super();
        this.action = action;
        this.shift = shift;
    }

    _transform(chunk, encoding, callback) {
        try {
            const resultString = getText({
                text: chunk.toString('utf8'),
                action: this.action,
                shift: this.shift
            });
            callback(null, resultString);
        } catch (err) {
            callback(err);
        }
    }
}
