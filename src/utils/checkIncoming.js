export const checkShift = (shift) => {
    if (shift === true) {
        const index = process.argv?.findIndex(i => i === '-s' || i === '--shift');
        if (index) return parseInt(process.argv[index + 1]);
    }
    return shift;
}

export const checkIncomingParams = ({ action, shift }) => {
    if ((action !== 'encode' && action !== 'decode') || !parseInt(shift)) {
        console.error('Ошибка', { action, shift });
        process.exit(-1);
    }
}
