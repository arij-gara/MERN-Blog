import React from 'react'
import { useEffect,useState } from 'react'
import{useLocation} from 'react-router-dom'
import './Home.css'
import Header from '../../Components/Header/Header'
import Posts from '../../Components/Posts/Posts'
import Sidebar from '../../Components/Sidebar/Sidebar'
import axios from 'axios'
export default function Home() {

  const [posts,setPosts]= useState([])
  const {search} =useLocation()
 
  useEffect(()=>{
    axios
    .get('http://localhost:5000/api/posts'+search)
    .then( res =>{
    console.log(res)
    setPosts(res.data)
    }).catch(err =>{
      console.log(err)
    
    })
    },[search]
   
 )
  return (
   <>
      <Header/>
      <div className="home">
        <Posts posts={posts}/>
        <Sidebar/>
      </div>
      </>
  )
}
