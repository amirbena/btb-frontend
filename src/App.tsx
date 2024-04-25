import { useContext } from 'react';
import './App.css';
import { Typography } from '@mui/material'
import { isMobile } from 'react-device-detect';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MyContext } from './components/context/MyContext/MyContext';
import Register from './pages/register';
import { RouteNames } from './constants/react-router';
import Login from './pages/login';
import ProtectedRoute from './components/routes/protectedRoute.route';
import Episodes from './pages/episodes';
import Locations from './pages/locations';
import Characters from './pages/characters';
import SingleEpisode from './pages/episodes/episode';
import SingleCharacter from './pages/characters/character';
import SingleLocation from './pages/locations/location';
import StartPageMenu from './components/StartPageMenu';

function App() {
  const { isAuthenticated } = useContext(MyContext);
  return (
    <>
      {isAuthenticated &&
        <StartPageMenu />
      }
      <div className="App">
        <Typography variant='h1' color="blue" marginTop={isMobile ? '40px' : '100px'} fontSize={isMobile ? '30px' : '70px'}>Rick And Morty</Typography>
        <Routes>
          <Route path={RouteNames.REGISTER} element={<Register />} />
          <Route path={RouteNames.LOGIN} element={<Login />} />
          <Route path={RouteNames.LOCATIONS} element={
            <ProtectedRoute>
              <Locations />
            </ProtectedRoute>
          } />
          <Route path={RouteNames.CHARACTERS} element={
            <ProtectedRoute>
              <Characters />
            </ProtectedRoute>
          } />
          <Route path={RouteNames.SINGLE_EPISODE} element={
            <ProtectedRoute isAdmin>
              <SingleEpisode />
            </ProtectedRoute>
          } />
          <Route path={RouteNames.SINGLE_CHARACTER} element={
            <ProtectedRoute>
              <SingleCharacter />
            </ProtectedRoute>
          } />
          <Route path={RouteNames.SINGLE_LOCATION} element={
            <ProtectedRoute>
              <SingleLocation />
            </ProtectedRoute>
          } />
          <Route path={RouteNames.EPISODES} element={
            <ProtectedRoute isAdmin>
              <Episodes />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to={isAuthenticated ? RouteNames.LOGIN : RouteNames.CHARACTERS} replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
