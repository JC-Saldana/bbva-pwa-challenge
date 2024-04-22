import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { gameMovements, gameRequiredBoxes, gameSeconds, gameStatuses } from "../../constants";

export default function Previous({ seconds, setSeconds, setGameStatus, requiredBoxes, setRequiredBoxes, movement, setMovement }) {

    const handleSecondsChange = e => setSeconds(e.target.value)
    const handleRequiredBoxesChange = e => setRequiredBoxes(e.target.value)
    const handleMovementChange = e => setMovement(e.target.value)
    return <Box
        width="500px"
        height="46px"
        display="flex"
        justifyContent="space-evenly"
    >
        <FormControl>
            <InputLabel id="seconds-select">Seconds</InputLabel>
            <Select
                labelId="seconds-select"
                value={seconds}
                onChange={handleSecondsChange}
            >
                <MenuItem value={gameSeconds[3]}>{gameSeconds[3]}</MenuItem>
                <MenuItem value={gameSeconds[6]}>{gameSeconds[6]}</MenuItem>
                <MenuItem value={gameSeconds[9]}>{gameSeconds[9]}</MenuItem>
            </Select>
        </FormControl>
        <FormControl>
            <InputLabel id="boxes-select">Boxes</InputLabel>
            <Select
                labelId="boxes-select"
                value={requiredBoxes}
                onChange={handleRequiredBoxesChange}
            >
                <MenuItem value={gameRequiredBoxes[6]}>6</MenuItem>
                <MenuItem value={gameRequiredBoxes[9]}>9</MenuItem>
                <MenuItem value={gameRequiredBoxes[12]}>12</MenuItem>
                <MenuItem value={gameRequiredBoxes[16]}>16</MenuItem>
            </Select>
        </FormControl>
        <FormControl>
            <InputLabel id="movement-select">Movement</InputLabel>
            <Select
                labelId="movement-select"
                value={movement}
                onChange={handleMovementChange}
            >
                <MenuItem value={gameMovements.yes}>{gameMovements.yes}</MenuItem>
                <MenuItem value={gameMovements.no}>{gameMovements.no}</MenuItem>
            </Select>
        </FormControl>
        <Button variant="contained" onClick={() => setGameStatus(gameStatuses.memorizing)}>Start</Button>
    </Box>
}
