// import React from 'react';
import { Container } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';
import MainContentSection from './Maincontent';
import Adminpage from './Adminpage';
import "./App.css";
import Administrators from './Adminpagecomponents/Administrators';

const App = () => {
  return (
    <div className='app'>
      <Routes>
          <Route path="/" element={<MainContentSection />} />
          <Route path="/Adminpage" element={<Adminpage />} />
        </Routes>     
    </div>
  );
};

export default App;