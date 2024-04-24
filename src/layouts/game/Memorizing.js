import React from "react";
import { Typography } from "@mui/material";
import Cards from "./components/Cards";
import CustomProgress from "../../components/CustomProgress";
import { gameStatuses } from "../../constants";
import { useMemo } from "react";

export default function Memorizing({ seconds, setGameStatus, randomNumbers, gameResult, gameStatus }) {
  const MemoizedCustomProgress = useMemo(() => (
    <CustomProgress
      seconds={seconds}
      onTimeFinish={() => setGameStatus(gameStatuses.playing)} />
  ), [seconds, setGameStatus]);

  return (
    <>
      <Typography variant="h4" component="h4">Memorize the cards</Typography>
      {MemoizedCustomProgress}
      <Cards randomNumbers={randomNumbers} gameResult={gameResult} gameStatus={gameStatus} />
    </>
  );
}
