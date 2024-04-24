import { gameMovements, gameRequiredBoxes, gameSeconds } from "../../../constants";

export const getPointsPerWin = (seconds, requiredBoxes, movement) => {
    let addedPoints = 0
    switch (seconds) {
        case gameSeconds[3]:
            addedPoints += 30
            break;
        case gameSeconds[6]:
            addedPoints += 20
            break;
        case gameSeconds[9]:
            addedPoints += 10
            break;
        default:
            addedPoints += 10
            break;
    }
    switch (requiredBoxes) {
        case gameRequiredBoxes[6]:
            addedPoints += 10
            break;
        case gameRequiredBoxes[9]:
            addedPoints += 20
            break;
        case gameRequiredBoxes[12]:
            addedPoints += 30
            break;
        case gameRequiredBoxes[16]:
            addedPoints += 40
            break;
        default:
            addedPoints += 40
            break;
    }
    switch (movement) {
        case gameMovements.true:
            addedPoints += 30
            break;
        case gameMovements.false:
            addedPoints += 0
            break;
        default:
            addedPoints += 0
            break;
    }
    return addedPoints
}
