export const generateRandomNumbers = arrayLength => {
    const numbers = Array.from({ length: arrayLength }, (_, index) => index + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    const newRandomNumbers = numbers.slice(0, arrayLength);
    return newRandomNumbers
}