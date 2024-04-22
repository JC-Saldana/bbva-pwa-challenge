export const pickRandomElement = array => {
    const selectedElement = array[Math.floor(Math.random() * array.length)]
    return selectedElement
}