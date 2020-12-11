import './App.css';
import './index.css';
import {Route} from "react-router-dom";
import Homepage from './pages/Homepage.js'
import UserProfilePage from './pages/UserProfilePage.js';
import React, {useState} from 'react';
import Navbar from './components/Navbar.js';
import { ToastContainer } from 'react-toastify';
import MyProfilePage from './pages/MyProfilePage.js';

function App() {

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('jwt') !== null
  )

  return (
    <>
      <div style={{height:"100%", backgroundColor:"darkgrey"}}>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Route exact path="/"> 
        <Homepage/>
      </Route>
      <Route path="/profile/:id">
        <UserProfilePage/>
      </Route>
      <ToastContainer/>
      <Route exact path="/profile" component={MyProfilePage}/>
      </div>
    </>
  );
}
export default App;
