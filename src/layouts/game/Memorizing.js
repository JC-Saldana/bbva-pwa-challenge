import { Typography } from "@mui/material";
import Cards from "./components/Cards";
import CustomProgress from "../../components/CustomProgress";
import { gameStatuses } from "../../constants";

export default function Memorizing({ seconds, setGameStatus, randomNumbers, gameResult, gameStatus }) {

    return <>
        <Typography variant="h4" component="h4">Memorize the cards</Typography>
        <CustomProgress seconds={seconds} onTimeFinish={() => setGameStatus(gameStatuses.playing)} />
        <Cards randomNumbers={randomNumbers} gameResult={gameResult} gameStatus={gameStatus} />
    </>
}