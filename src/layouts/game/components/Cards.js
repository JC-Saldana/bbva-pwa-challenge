import { Box } from "@mui/material";
import NumberButton from "./NumberButton";

export default function Cards({ chosenNumber, solutionNumber, randomNumbers, chooseNumber, gameResult, gameStatus }) {
    return (
        <Box
            width={300}
            my={2}
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            gap={3}
        >
            {randomNumbers.map(number => <NumberButton
                key={number}
                gameStatus={gameStatus}
                gameResult={gameResult}
                chosenNumber={chosenNumber}
                solutionNumber={solutionNumber}
                buttonNumber={number}
                chooseNumber={chooseNumber}
            />)}
        </Box>
    );
}
