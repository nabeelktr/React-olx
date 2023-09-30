import React, { useContext, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';

import { AuthContext, firebaseContext } from './store/Context';
import Post from './store/ProductContext';



const App =()=> {
  const {setuser} = useContext(AuthContext)
  const {firebase } = useContext(firebaseContext)
    useEffect(()=>{ 
      firebase.auth().onAuthStateChanged((user)=>{
        setuser(user)
      })
  })
  return (
    <div>
   <Post>
    <Router>
        <Routes>
        <Route exact path='/' element={<Home/>} />          
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} /> 
        <Route path='/create' element={<Create/>} /> 
        <Route path='/view' element={<ViewPost/>} />         
        </Routes>
    </Router>
   </Post>    

    </div>
  );
}

export default App;
