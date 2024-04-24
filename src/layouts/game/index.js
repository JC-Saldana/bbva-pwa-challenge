import { Box, Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import Previous from "./Previous";
import Memorizing from "./Memorizing";
import Playing from "./Playing";
import { gameMovements, gameRequiredBoxes, gameResults, gameSeconds, gameStatuses } from "../../constants";
import { getPointsPerWin } from "./utils/getPointsPerWin";
import { generateRandomNumbers } from "./utils/generateRandomNumbers";
import { pickRandomElement } from "./utils/pickRandomElement";
import { swapRandomElements } from "./utils/swapRandomElements";
import { database } from "../../services/indexedDB";

/**
 * Component for the game.
 * @returns {JSX.Element} JSX element representing the game.
 */
export default function Game() {
    const [gameStatus, setGameStatus] = useState(gameStatuses.previous);
    const [gameResult, setGameResult] = useState(gameResults.pending);
    const [seconds, setSeconds] = useState(gameSeconds[6]);
    const [requiredBoxes, setRequiredBoxes] = useState(gameRequiredBoxes[9]);
    const [movement, setMovement] = useState(gameMovements.true);
    const [points, setPoints] = useState(0);
    const [chosenNumber, setChosenNumber] = useState(0);
    const [randomNumbers, setRandomNumbers] = useState([]);
    const [solutionNumber, setSolutionNumber] = useState(0);
    const pointsPerWin = getPointsPerWin(seconds, requiredBoxes, movement);

    /**
     * Generates and applies random numbers to the game.
     */
    const applyRandomNumbers = useCallback(() => {
        const newRandomNumbers = generateRandomNumbers(requiredBoxes);
        const randomElement = pickRandomElement(newRandomNumbers);
        setRandomNumbers(newRandomNumbers);
        setSolutionNumber(randomElement);
    }, [requiredBoxes]);

    /**
     * Swaps random elements continuously.
     */
    const swapRandomNumbers = useCallback(() => {
        const newRandomNumbers = swapRandomElements(randomNumbers);
        setRandomNumbers(newRandomNumbers);
        setSolutionNumber(newRandomNumbers[Math.floor(Math.random() * newRandomNumbers.length)]);
    }, [randomNumbers]);

    useEffect(() => {
        applyRandomNumbers();
    }, [requiredBoxes, applyRandomNumbers]);

    useEffect(() => {
        let interval;
        let elapsedSeconds = 0;
        if (gameStatus === gameStatuses.memorizing && randomNumbers.length > 0 && movement === gameMovements.true) {
            interval = setInterval(() => {
                swapRandomNumbers();
                elapsedSeconds++;
                if (elapsedSeconds >= seconds) {
                    clearInterval(interval);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [gameStatus, randomNumbers, movement, seconds, swapRandomNumbers]);

    /**
     * Cleans the game state.
     */
    const cleanState = () => {
        applyRandomNumbers();
        setGameStatus(gameStatuses.previous);
        setGameResult(gameResults.pending);
        setChosenNumber(0);
    };

    const saveScore = async score => {
        const newItem = { score };
        await database.addItem(newItem)
    }

    /**
     * Handles choosing a number.
     * @param {number} chosenNumber - The chosen number.
     */
    const chooseNumber = chosenNumber => {
        setChosenNumber(chosenNumber);
        if (solutionNumber === chosenNumber) {
            setGameResult(gameResults.won);
            setPoints(prevPoints => {
                const updatedPoints = prevPoints + pointsPerWin
                saveScore(updatedPoints)
                return updatedPoints
            });

        } else {
            setGameResult(gameResults.lost);
            setPoints(0);
        }
        setTimeout(() => cleanState(), 2000);
    };

    return (
        <Box
            m={"auto"}
            maxWidth="500px"
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
    );
}
