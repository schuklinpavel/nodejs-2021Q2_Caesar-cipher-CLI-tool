import {ACTIONS, ALPHABET_LOWER, ALPHABET_UPPER} from "./constants.js";

function* getCycleArray({ array, index = 0 }) {
    // if (index < 0) {
    //     console.log('index 0 ', index);
    //     if (Math.abs(index) > array.length) index = Math.abs(index) % array.length;
    //     console.log('index 1 ', index);
    //     index = array.length - Math.abs(index) % array.length;
    //     console.log('index 2 ', index);
    // }
    if (index < 0) index = array.length - Math.abs(index) % array.length;
    if (index >= array.length) index = index % array.length;
    while (true) {
        yield array[index];
        index = (index + 1) % array.length;
    }
}

export const getText = ({ text, action, shift }) => {
    const genUpper = getCycleArray({ array: ALPHABET_UPPER, index: shift });
    const genLower = getCycleArray({ array: ALPHABET_LOWER, index: shift });

    let result;

    if (action === ACTIONS.ENCODE) {
        const uppCharset = ALPHABET_UPPER.reduce((result, letter) => ({...result, [letter]: genUpper.next().value}), {});
        const lowCharset = ALPHABET_LOWER.reduce((result, letter) => ({...result, [letter]: genLower.next().value}), {});
        result = {...uppCharset, ...lowCharset};
    } else {
        const uppCharset = ALPHABET_UPPER.reduce((result, letter) => ({...result, [genUpper.next().value]: letter}), {});
        const lowCharset = ALPHABET_LOWER.reduce((result, letter) => ({...result, [genLower.next().value]: letter}), {});
        result = {...uppCharset, ...lowCharset};
    }
    console.log([text, shift], Object.entries(result).filter(i => !i[1]));
    return text.split('').map(l => result[l] ?? l).join('');
};

