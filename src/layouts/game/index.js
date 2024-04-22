import { Box, Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import Previous from "./Previous";
import Memorizing from "./Memorizing";
import Playing from "./Playing";
import { gameMovements, gameRequiredBoxes, gameResults, gameSeconds, gameStatuses } from "../../constants";
import { getPointsPerWin } from "./utils/getPointsPerWin";

export default function Game() {

    const [gameStatus, setGameStatus] = useState(gameStatuses.previous)
    const [gameResult, setGameResult] = useState(gameResults.pending)
    const [seconds, setSeconds] = useState(gameSeconds[6])
    const [requiredBoxes, setRequiredBoxes] = useState(gameRequiredBoxes[9])
    const [movement, setMovement] = useState(gameMovements.true)
    const [points, setPoints] = useState(0)
    const [chosenNumber, setChosenNumber] = useState(0)
    const [randomNumbers, setRandomNumbers] = useState([])
    const [solutionNumber, setSolutionNumber] = useState(0);
    const pointsPerWin = getPointsPerWin(seconds, requiredBoxes, movement)

    const generateRandomNumbers = useCallback(() => {
        const numbers = Array.from({ length: requiredBoxes }, (_, index) => index + 1);
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        const newRandomNumbers = numbers.slice(0, requiredBoxes);
        setRandomNumbers(newRandomNumbers)
        setSolutionNumber(newRandomNumbers[Math.floor(Math.random() * newRandomNumbers.length)])
    }, [requiredBoxes]);

    function swapRandomElements(array) {
        if (array.length < 2) {
            console.error("Array must contain at least two elements.");
            return array.slice(); // Return a copy of the original array
        }

        var index1 = Math.floor(Math.random() * array.length);
        var index2 = Math.floor(Math.random() * array.length);

        // Ensure index2 is different from index1
        while (index2 === index1) {
            index2 = Math.floor(Math.random() * array.length);
        }

        // Create a copy of the original array to avoid modifying it directly
        var newArray = array.slice();

        // Swap the elements in the new array
        var temp = newArray[index1];
        newArray[index1] = newArray[index2];
        newArray[index2] = temp;

        return newArray;
    }

    const swapRandomNumbers = useCallback(() => {
        const newRandomNumbers = swapRandomElements(randomNumbers)
        setRandomNumbers(newRandomNumbers)
        setSolutionNumber(newRandomNumbers[Math.floor(Math.random() * newRandomNumbers.length)])
    }, [randomNumbers]);

    useEffect(() => {
        generateRandomNumbers();
    }, [requiredBoxes, generateRandomNumbers]); // Ensure random numbers are generated whenever requiredBoxes changes

    useEffect(() => {
        let interval;
        let elapsedSeconds = 0;
        if (gameStatus === gameStatuses.memorizing && randomNumbers.length > 0 && movement === gameMovements.true) {
            console.log("here")
            // Swap random numbers continuously
            interval = setInterval(() => {
                swapRandomNumbers();
                elapsedSeconds++;
                if (elapsedSeconds >= seconds) {
                    clearInterval(interval); // Clear the interval after reaching the specified duration
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [gameStatus, randomNumbers, movement, seconds, swapRandomNumbers]);

    const cleanState = () => {
        generateRandomNumbers()
        setGameStatus(gameStatuses.previous)
        setGameResult(gameResults.pending)
        setChosenNumber(0)
    }

    const chooseNumber = chosenNumber => {
        setChosenNumber(chosenNumber)
        if (solutionNumber === chosenNumber) {
            setGameResult(gameResults.won)
            setPoints(prevPoints => prevPoints + pointsPerWin)
        } else {
            setGameResult(gameResults.lost)
            setPoints(0)
        }
        setTimeout(() => cleanState(), 2000);
    }

    return (
        <Box
            m={"auto"}
            width="500px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={4}
            p={2}
        >
            <Typography variant="h5" component="h5">Current game points: {points}</Typography>
            <Typography variant="h5" component="h5">Points per win: {pointsPerWin}</Typography>
            {gameStatus === gameStatuses.previous &&
                <Previous
                    seconds={seconds}
                    setSeconds={setSeconds}
                    setGameStatus={setGameStatus}
                    requiredBoxes={requiredBoxes}
                    setRequiredBoxes={setRequiredBoxes}
                    movement={movement}
                    setMovement={setMovement}
                />}
            {gameStatus === gameStatuses.memorizing && <Memorizing
                seconds={seconds}
                setGameStatus={setGameStatus}
                randomNumbers={randomNumbers}
                gameResult={gameResult}
                gameStatus={gameStatus}
            />}
            {gameStatus === gameStatuses.playing && <Playing
                gameResult={gameResult}
                chosenNumber={chosenNumber}
                solutionNumber={solutionNumber}
                randomNumbers={randomNumbers}
                chooseNumber={chooseNumber}
                gameStatus={gameStatus}
            />}
        </Box>
    )
}
