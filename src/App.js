import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './page/login/LoginPage';
import Register from './page/register/Register';
import HomePage from './page/home/HomePage';
import Profile from './page/profile/Profile';
import PageSearch from './page/pageSearch/PageSearch';
import AuthContext from './components/AuthContext';

function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element={<AuthContext><LoginPage/></AuthContext>} />
      <Route path="/register" element={<AuthContext><Register/></AuthContext>}/>
      <Route path="/homePage" element={<AuthContext><HomePage/></AuthContext>}/>
      <Route path='/profile' element={<AuthContext><Profile/></AuthContext>}/>
      <Route path='/search' element={<AuthContext><PageSearch/></AuthContext>}/>
    </Routes>
    </>
  );
}

export default App;
