import React, { useContext, useEffect, useState } from 'react';
import { database } from "../services/indexedDB"

const ScoreContext = React.createContext();
const useScoreHookEffect = (initScore) => {

  const [score, setScore] = useState(initScore);
  const saveScore = async newScore => {
    const newItem = { newScore };
    await database.addItem(newItem)
    setScore(newScore)
  };

  const setScoreFromDB = async () => {
    const dbItems = await database.getAllItems();
    const scores = dbItems.map(item => item.score)
    let newScore = 0
    const maxScoreFromDb = Math.max(...scores)
    if (maxScoreFromDb > 0) newScore = maxScoreFromDb
    setScore(newScore)
  }


  useEffect(() => {
    setScoreFromDB()
  }, []);

  return { score, saveScore };
};

export function ScoreHookProvider({ children, score }) {

  const myEffect = useScoreHookEffect(score);

  return (
    <ScoreContext.Provider value={myEffect}>
      {children}
    </ScoreContext.Provider>
  );
}

/**
 * Custom hook for accessing the context provided by ScoreHookProvider.
 * @returns {{ score: string, saveScore: Function }} Object containing score state and saveScore function.
 */
export const useScoreHook = () => useContext(ScoreContext);
