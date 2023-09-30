import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import  { AuthContext, firebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";


const Create = () => {

  const [name, setname] = useState('')
  const [category, setcategory] = useState('')
  const [price, setprice] = useState('')
  const [image, setimage] = useState()
  const date = new Date()
  const navigate = useNavigate()

  const {firebase} = useContext(firebaseContext)
  const {user} = useContext(AuthContext)
  const [Load, setLoad] = useState(false)

  const handleSubmit=()=>{
    setLoad(true)
   if(user) {

   firebase.storage().ref(`image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
          
        }) 
        setLoad(false)
        navigate('/ ')
      })
    })
  }else{
    alert('login err')
    setLoad(false)
  }

  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">

            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              value={name}
              onChange={(e)=>setname(e.target.value)}
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e)=>setcategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" 
            id="fname"
            value={price}
            onChange={(e)=>setprice(e.target.value)}
             name="Price" />
            <br />

          <br />
          <img alt="Posts" width="200px" height="200px" src={image && URL.createObjectURL(image)}></img>
          
            <br />
            <input onChange={(e)=> setimage(e.target.files[0])} type="file" />
            <br />
            {Load ? <BeatLoader color="#36d7b7" style={{
            display:"flex",
            justifyContent:"center",

          }} />  :
            <button onClick={  handleSubmit } className="uploadBtn">upload and Submit</button> }
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
