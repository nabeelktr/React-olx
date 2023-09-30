import React, { useContext, useState } from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import Logo from '../../olx-logo.png';
import './Login.css';
import {firebaseContext} from   '../../store/Context'
import { useNavigate } from 'react-router-dom';


function Login() {
  const [err, seterr] = useState(false)
  const [Load, setLoad] = useState(false)
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const {firebase} =useContext(firebaseContext)
  const navigate = useNavigate()
    const handleSubmit=(e)=>{
      e.preventDefault()
      setLoad(true)
      firebase.auth().signInWithEmailAndPassword(email,password).then((result) => {
        navigate('/')
        setLoad(false)
      }).catch((err) => {
        setLoad(false)
        const errorMessage = err.response?.data?.error?.message || 'Invalid Data..'; // Extract the error message
        seterr(errorMessage);
        setTimeout(() => {
          seterr(false)
        }, 4000);
      });

    }
  return (
    <div>
      <div className="loginParentDiv"  >
        <img width="200px" height="200px" src={Logo} alt='nothing'></img>
        {err && <p style={{maxWidth:"500px", color:"red"}}>{err}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value={password}
            onChange={(e)=>setpassword(e.target.value )}
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

          }} /> :
          <button >Login</button> }
        </form>
        <a href='/signup'>Signup</a>
      </div>
    </div>
  );
}

export default Login;
