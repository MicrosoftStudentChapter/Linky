import React from 'react';
import { Container } from '@mui/material';
import MainContentSection from './Maincontent';
import "./App.css"
const App = () => {
  return (
    <div className='app'>
    <Container
      maxWidth="md" 
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '89vh',
        width: {
          xs: '100%',
          md: '50vw',
        }
      }}
    >
      <MainContentSection />
    </Container>
    </div>
  );
};

export default App;
