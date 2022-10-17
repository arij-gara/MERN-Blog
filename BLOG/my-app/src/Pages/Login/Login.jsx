import React, { useRef } from 'react'
import { useContext } from 'react'
import './Login.css'
import {Context} from '../../context/context'
import axios from 'axios'
export default function Login() {

  const userref= useRef()
  const passwordref = useRef()
  const {dispatch, isFetching} =useContext(Context)

  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   dispatch({ type: "LOGIN_START" });
   
  //      axios.post('http://localhost:5000/api/auth/login', {
  //       username: userref.current.value,
  //       password: passwordref.current.value,
  //     }).then( res =>{
  //     dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  //     console.log(res.data)
  //     }) .catch( (err) =>{
  //     dispatch({ type: "LOGIN_FAILURE" })})
    
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: userref.current.value,
        password: passwordref.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  
  // useEffect ( ()=>{
  //   axios
  //   .get('http://localhost:5000/api/category/')
  //   .then( res =>{
  //   console.log(res)
  //   setcat(res.data)
  //   }).catch(err =>{
  //     console.log(err)
    
  //   })
  // },[])
  return (
    
        <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="loginInput" type="text" placeholder="Enter your username..."  ref={userref}/>
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..."  ref={passwordref}/>
        <button className="loginButton" type='submit' disabled={isFetching}>Login</button>
      </form>
        <button className="loginRegisterButton">Register</button>
    </div>
  
  )
  }
