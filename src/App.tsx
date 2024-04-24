import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { Typography } from '@mui/material'
import { isMobile } from 'react-device-detect';
import { Route, Routes } from 'react-router-dom';
import { MyContext } from './components/context/MyContext/MyContext';
import Register from './pages/register';
import { RouteNames } from './constants/react-router';

function App() {
  const { isAuthenticated } = useContext(MyContext);
  return (
    <div className="App">
      <Typography variant='h1' color="blue" marginTop={isMobile ? '40px' : '100px'} fontSize={isMobile ? '30px' : '100px'}>Rick And Morty</Typography>
      <Routes>
        <Route path={RouteNames.REGISTER} element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
