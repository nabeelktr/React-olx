import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../store/ProductContext';
import { firebaseContext } from '../../store/Context';
function View() {

  const [userDetails, setuserDetails] = useState()

  const {postDetails} = useContext(PostContext)

 
  const {firebase} = useContext(firebaseContext)
  useEffect(()=>{
    
         const {userId} = postDetails
    firebase.firestore().collection('users').where('id','==',userId).get().then((res)=>{
      res.forEach((doc)=>{
        setuserDetails(doc.data())
      })
    })
  
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span> {postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt} </span>
        </div>
    {  userDetails &&  <div className="contactDetails">
          <p>Seller Details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
