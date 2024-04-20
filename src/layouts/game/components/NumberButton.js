import { Button } from "@mui/material";
import { gameResults, gameStatuses } from "../../../constants";

export default function NumberButton({ gameResult, chosenNumber, solutionNumber, buttonNumber, chooseNumber, gameStatus }) {
    const getButtonColor = () => {
        if (gameResult === gameResults.pending) return "info"
        const isButtonSelected = chosenNumber === buttonNumber
        if (isButtonSelected) {
            if (solutionNumber === buttonNumber) return "success"
            else return "error"
        } else return "info"
    }
    const getButtonContent = () => {
        if (gameStatus === gameStatuses.playing && gameResult === gameResults.pending) return "-"
        return buttonNumber
    }
    return <Button
        disabled={gameStatus === gameStatuses.memorizing}
        color={getButtonColor()}
        onClick={() => chooseNumber(buttonNumber)}
        variant="contained"
        style={{ height: '64px' }}>
        {getButtonContent()}
    </Button>
}