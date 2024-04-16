import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles';

import {useState, useEffect, useRef} from 'react'

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor:'#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
  }));

function DisplayText ({textBox}) {

    const [currentWord, setCurrentWord] = useState('')
    const [precedingWords, setPrecedingWords] = useState('')
    const [ensuingWords, setEnsuingWords] = useState('')
    const [wordIndex, setWordIndex] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [wordRate, setWordRate] = useState(200)

    const intervalRef = useRef()
    const countTwice = useRef(false)

    const start = () => {
        setIsRunning(true)
    }

    const stop = () => {
        setIsRunning(false)
    }

    const back = () => {
        const newIndex = wordIndex > 10 ? wordIndex - 10 : 0
        setIsRunning(false)
        setWordIndex(newIndex)
        setCurrentWord(convertIndexToWord(newIndex))
    }

    const reset = () => {
        setWordIndex(0)
    }

    const convertIndexToWord = (index) => {
        //return textBox.split(" ").slice(index, index + 6).join(" ")  //Ticker tape style scroll - really jerky need a better method. CSS one here - https://codepen.io/lewismcarey/pen/GJZVoG but scrolling is harder to read 
        return textBox.split(" ")[index] //One word at a time - difficult if you blink for long - or with longer words.
    }

    const wordsBetweenIndex = (startIndex, endIndex) => {
        if(startIndex < 0) return ''
        if(endIndex > textBox.split(" ").length) return textBox.split(" ").slice(startIndex).join(" ")
        return textBox.split(" ").slice(startIndex, endIndex).join(" ")
    }

    useEffect(()=> {
        if(!isRunning) return;
        var count = wordIndex
        intervalRef.current = setInterval(() => {
            if (count + 2 === textBox.split(" ").length) {
                clearInterval(intervalRef.current)
                reset()
            }
            let newWord = convertIndexToWord(count)
            //If the word is long then I want word to be displayed for twice the normal length
            //Check to see if string is long or end the sentence then pause for an extra count.
            if(countTwice.current || newWord.length <= 10) {
                count++
                countTwice.current = false
            } else {
                countTwice.current = true
            }
            setWordIndex(count)

        }, 1000*(60/wordRate)) //Turn words per minute into an interval in ms
        
        return () => clearInterval(intervalRef.current)

        },[isRunning])

    useEffect(() => {
        if(!textBox) return
        clearInterval(intervalRef.current)

        setCurrentWord(convertIndexToWord(0))

    }, [textBox])

    useEffect(() => {
        setCurrentWord(convertIndexToWord(wordIndex))
        setPrecedingWords(wordsBetweenIndex(wordIndex - 2, wordIndex))
        setEnsuingWords(wordsBetweenIndex(wordIndex + 1, wordIndex + 3))
    }, [wordIndex])


    return (
        <StyledPaper elevation={2} sx={{padding: 2}}>
            <Typography gutterBottom align='center'>
                {textBox? 'Press start when ready.' : 'Please enter some text to begin.'}
            </Typography>
            <Grid container spacing={2} sx={{my: 20}}>
                <Grid item xs={5}>
                    <Typography variant="subtitle1" align='right' color='textSecondary' noWrap sx={{ bgcolor: '#fff' }}>
                        {precedingWords}
                    </Typography>
                </Grid>
                <Grid item xs="auto">
                    <Typography variant="subtitle1" align='left' sx={{ bgcolor: '#ccffff' }}>
                        {currentWord? currentWord : 'Look here'}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle1" align='left' color='textSecondary' noWrap sx={{ bgcolor: '#fff' }}>
                        {ensuingWords}
                    </Typography>
                </Grid>
            </Grid>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={start}>Start</Button>
                <Button variant="outlined" onClick={stop}>Stop</Button>
                <Button variant="outlined" onClick={reset}>Reset</Button>
                <Button variant="outlined" onClick={back}>Back 10 Words</Button>
                <TextField
                    id="outlined-number"
                    label="Words per Minute"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={wordRate}
                    onChange={(event) => setWordRate(event.target.value)}
                    />
            </Stack>
        </StyledPaper>
        
    )
}

export default DisplayText;