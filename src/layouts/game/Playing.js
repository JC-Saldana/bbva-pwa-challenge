import Cards from "./components/Cards";
import { Typography } from "@mui/material";

export default function Playing({ gameResult, chosenNumber, solutionNumber, randomNumbers, chooseNumber, gameStatus }) {

    return <>
        <Typography variant="h4" component="h4">Find number {solutionNumber}</Typography>
        <Cards
            chosenNumber={chosenNumber}
            solutionNumber={solutionNumber}
            randomNumbers={randomNumbers}
            chooseNumber={chooseNumber}
            gameResult={gameResult}
            gameStatus={gameStatus}
        />
    </>
}
