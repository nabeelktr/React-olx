import React, { useContext, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import Heart from '../../assets/Heart';
import './Post.css';
import { firebaseContext } from '../../store/Context';
import  { PostContext } from '../../store/ProductContext';


function Posts() {
  const [products, setproducts] = useState([])
  const {firebase } =useContext(firebaseContext)
  const {setpostDetails} = useContext(PostContext)


 const sortedProducts = products.slice().sort((a,b)=> a.price - b.price).slice(0,2)

  const navigate = useNavigate()
  useEffect(()=>{

    firebase.firestore().collection('products').get().then((snap)=>{
      const allPost = snap.docs.map((product)=>{
        return {
          ...product.data(),
          id:product.id
        }
      } )
      setproducts(allPost)

    })

  },[])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
              {
                
                products.map((prdt)=>{

                 return <div
                  className="card" 
                
                  onClick={()=>{
                    setpostDetails(prdt)
                    navigate('/view')

                  }}
                  >
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={prdt.url} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {prdt.price}</p>
                    <span className="kilometer">{prdt.category}</span>
                    <p className="name">{prdt.name}</p>
                  </div>
                  <div className="date" >
                    <span >{prdt.createdAt}</span>
                  </div>
                </div>
                
})
}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {sortedProducts.slice(0,2).map((prdt)=>(

            <div className="card" onClick={()=>{
              setpostDetails(prdt)
              navigate('/view')

            }}>
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={prdt.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {prdt.price}</p>
              <span className="kilometer">{prdt.category}</span>
              <p className="name"> {prdt.name}</p>
            </div>
            <div className="date">
              <span>{prdt.createdAt}</span>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
