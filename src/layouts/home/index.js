import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const handleNameChange = e => {
        setName(e.target.value)
    }
    const handleClick = e => {
        if (name) navigate("/game");
        else alert("No name")
    }
    return (

        <Box
            m={"auto"}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={4}
            p={2}
        >
            <TextField id="standard-basic" label="Name" variant="standard" value={name} onChange={handleNameChange} />
            <Button variant="contained" onClick={handleClick}>Start</Button>
        </Box>
    )
}