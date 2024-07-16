import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/page/login/LoginPage';
import Register from './components/page/register/Register';
import HomePage from './components/page/home/HomePage';
import Profile from './components/page/profile/Profile';
import AuthContext from './components/authContext/AuthContext';
import PageSearch from './components/page/pageSearch/PageSearch';

function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element={<AuthContext><LoginPage/></AuthContext>} />
      <Route path="/register" element={<AuthContext><Register/></AuthContext>}/>
      <Route path="/homePage" element={<AuthContext><HomePage/></AuthContext>}/>
      <Route path='/profile/:id' element={<AuthContext><Profile/></AuthContext>}/>
      <Route path='/search' element={<AuthContext><PageSearch/></AuthContext>}/>
    </Routes>
    </>
  );
}

export default App;
