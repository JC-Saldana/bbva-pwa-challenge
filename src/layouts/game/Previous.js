import { Box, Button, MenuItem, Select } from "@mui/material";
import { gameDifficulties, gameStatuses } from "../../constants";

export default function Previous({ difficulty, setDifficulty, setGameStatus }) {

    const handleDifficultyChange = e => setDifficulty(e.target.value)
    return <Box
        width="200px"
        height="46px"
        display="flex"
        justifyContent="space-evenly"
    >
        <Select
            value={difficulty}
            onChange={handleDifficultyChange}
        >
            <MenuItem value={gameDifficulties.easy}>Easy</MenuItem>
            <MenuItem value={gameDifficulties.medium}>Medium</MenuItem>
            <MenuItem value={gameDifficulties.hard}>Hard</MenuItem>
        </Select>
        <Button variant="contained" onClick={() => setGameStatus(gameStatuses.memorizing)}>Start</Button>
    </Box>
}
