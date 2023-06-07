import React, {useMemo} from 'react';
import { ThemeProvider, Box, createTheme, SxProps } from '@mui/material'
import './App.css';
import {Main} from "./pages/Main";
import './main.scss'

const sx: SxProps = {
  display: 'flex',
  height: '100vh',
  width: '100wh',
  bgcolor: 'background.default',
  color: 'text.primary',
};

function App() {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#e91e63', //'#f4511e'
          },
          secondary: {
            main: '#e91e63',
          },
        },
        spacing: 4,
      }),
    [],
  );

  return (
    <ThemeProvider {...{theme }}>
      <Box {...{ sx }}>
        <Main />
      </Box>
    </ThemeProvider>
  );
}

export default App;
