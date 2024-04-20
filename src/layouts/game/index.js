import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import Previous from "./Previous";
import Memorizing from "./Memorizing";
import Playing from "./Playing";
import { gameDifficulties, gameResults, gameStatuses } from "../../constants";

export default function Game() {

    const [gameStatus, setGameStatus] = useState(gameStatuses.previous)
    const [gameResult, setGameResult] = useState(gameResults.pending)
    const [difficulty, setDifficulty] = useState(gameDifficulties.easy)
    const [points, setPoints] = useState(0)
    const [chosenNumber, setChosenNumber] = useState(0)
    const getSeconds = () => {
        switch (difficulty) {
            case "easy":
                return 10
            case "medium":
                return 5
            case "hard":
                return 2
            default:
                return 10
        }
    }
    const seconds = getSeconds()
    const getPointsPerWin = () => {
        switch (difficulty) {
            case "easy":
                return 10
            case "medium":
                return 20
            case "hard":
                return 30
            default:
                return "easy"
        }
    }
    const pointsPerWin = getPointsPerWin()
    // Generate random numbers memoized to prevent recalculation on every render
    const randomNumbers = useMemo(() => {
        const numbers = Array.from({ length: 9 }, (_, index) => index + 1);
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        return numbers.slice(0, 9);
    }, []);

    const [solutionNumber, setSolutionNumber] = useState(0);
    const generateRandomNumber = useCallback(() => {
        setSolutionNumber(randomNumbers[Math.floor(Math.random() * randomNumbers.length)])
    }, [randomNumbers]); // Include randomNumbers in the dependency array

    useEffect(() => {
        generateRandomNumber()
    }, [generateRandomNumber])

    const cleanState = () => {
        generateRandomNumber()
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
            <Typography variant="h4" component="h4">Current game points: {points}</Typography>
            {gameStatus === gameStatuses.previous && <Previous difficulty={difficulty} setDifficulty={setDifficulty} setGameStatus={setGameStatus} />}
            {gameStatus === gameStatuses.memorizing && <Memorizing seconds={seconds} setGameStatus={setGameStatus} randomNumbers={randomNumbers} gameResult={gameResult} gameStatus={gameStatus} />}
            {gameStatus === gameStatuses.playing && <Playing gameResult={gameResult} chosenNumber={chosenNumber} solutionNumber={solutionNumber} randomNumbers={randomNumbers} chooseNumber={chooseNumber} gameStatus={gameStatus} />}
        </Box>
    )
}
