import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Title from './componants/Title.js'
import InputText from './componants/InputText.js'
import DisplayText from './componants/DisplayText.js'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { useState } from 'react';

function App() {

  const [textBox, setTextBox] = useState('')

  return (
    <Box sx={{
       flexGrow: 1,
       padding: 2
      }}>
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        <Title />
      </Grid>
      <Grid item xs={12}>
        <InputText textBox={textBox} setTextBox={setTextBox}/>
      </Grid>
      <Grid item xs={12}>
        <DisplayText textBox={textBox}/>
      </Grid>
    </Grid>
  </Box>
  );
}

export default App;
