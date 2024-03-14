import React from 'react';
import { Container } from '@mui/material';
import MainContentSection from './Maincontent';
import "./App.css"
const App = () => {
  return (
    <Container
      maxWidth="md" 
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <MainContentSection />
    </Container>
  );
};

export default App;
