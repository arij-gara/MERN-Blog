import "./Register.css"
import {useState} from 'react'
import axios from 'axios'
export default function Register() {

  const[username,setusername]=useState('')
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const [error,seterror]= useState(false)

  const handelsubmit = (e)=>{
    e.preventDefault();
    seterror(false)
    axios
    .post('http://localhost:5000/api/auth/register', {
      username,email,password}

    )
    .then( res =>{
      console.log(res)
      res.data && window.location.replace('/login')
   
      }).catch(err =>{
       seterror(true)
  })
}
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handelsubmit}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..."
         onChange={e=>{setusername(e.target.value)}} />
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..." 
          onChange={e=>{setemail(e.target.value)}}/>
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..." 
          onChange={e=>{setpassword(e.target.value)}}/>
        <button className="registerButton"type='submit'>Register</button>
      </form>
        <button className="registerLoginButton">Login</button>
         {error && <span style={{color:'red' ,marginTop :'10px'}}> something went wrong !</span>}
    </div>
    )
}