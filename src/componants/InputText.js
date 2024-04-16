import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useState } from 'react'

function InputText ({textBox, setTextBox}) {

    const handleChange = (event) => {
        setTextBox(event.target.value)
    }

    return (
        <Stack spacing={2}>
            <TextField
                id="outlined-multiline-static"
                label="Text to Read"
                multiline
                fullWidth
                rows={10}
                value={textBox}
                onChange={handleChange}
            />
        </Stack>
    )
}

export default InputText;