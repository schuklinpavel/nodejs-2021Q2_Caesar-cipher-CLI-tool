import { ACTIONS, ALPHABET_LOWER, ALPHABET_UPPER } from "../constants.js";

function* getCycleArray({array, index = 0}) {
    if (index < 0) index = array.length - Math.abs(index) % array.length;
    if (index >= array.length) index = index % array.length;
    while (true) {
        yield array[index];
        index = (index + 1) % array.length;
    }
}

const getCaesarCipherText = ({text, action, shift, oldOutput}) => {
    const genUpper = getCycleArray({array: ALPHABET_UPPER, index: shift});
    const genLower = getCycleArray({array: ALPHABET_LOWER, index: shift});

    let alphabetMap;

    if (action === ACTIONS.ENCODE) {
        alphabetMap = {
            ...ALPHABET_UPPER.reduce((result, letter) => ({...result, [letter]: genUpper.next().value}), {}),
            ...ALPHABET_LOWER.reduce((result, letter) => ({...result, [letter]: genLower.next().value}), {}),
        };
    } else {
        alphabetMap = {
            ...ALPHABET_UPPER.reduce((result, letter) => ({...result, [genUpper.next().value]: letter}), {}),
            ...ALPHABET_LOWER.reduce((result, letter) => ({...result, [genLower.next().value]: letter}), {}),
        };
    }
    console.log([text, shift], Object.entries(alphabetMap).filter(i => !i[1]));
    const result = text.split('').map(letter => alphabetMap[letter] ?? letter).join('');
    return oldOutput?.length ? `${oldOutput}${result}` : result;
};

export default getCaesarCipherText;
