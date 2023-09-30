import React, { useContext, useState } from 'react';
import {useNavigate } from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Signup.css';
import { firebaseContext } from '../../store/Context';
import BeatLoader from "react-spinners/BeatLoader";

export default function Signup() {
  const navigate = useNavigate()
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [phone, setphone] = useState()
  const [Load, setLoad] = useState(false)

  const {firebase} = useContext(firebaseContext) 

  const handleSubmit =(e)=>{
    e.preventDefault()
    setLoad(true)
    firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
      result.user.updateProfile({displayName:username}).then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:username,
          phone:phone
        }).then(()=>{
          setLoad(false)
          navigate ('/login')
        })
      })
    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='hehe'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value={username}
            onChange={(e)=> setusername(e.target.value)}
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={email}
            onChange={(e)=> setemail(e.target.value)}
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            value={phone}
            onChange={(e)=> setphone(e.target.value)}
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value={password}
            onChange={(e)=> setpassword(e.target.value )}
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          {Load ? <BeatLoader color="#36d7b7" style={{
            display:"flex",
            justifyContent:"center",

          }} />  : <button>Signup</button>}
        </form>
        <a href='some '>Login</a>
      </div>
    </div>
  );
}
