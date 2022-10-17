import React from 'react'
import { useContext,useState } from 'react'
import {Context} from '../../context/context'
import  Sidebar from '../../Components/Sidebar/Sidebar'
import './Settings.css'
import axios from 'axios'
export default function Settings() {
  const [file, setfile] = useState(null);
  const [username,setusername]= useState('')
  const [email,setemail] = useState('')
  const [password,setpassword] =useState('')
  const  [success,setsuccess]  = useState(false)
  const {user, dispatch}= useContext(Context) 
  const PF ='http://localhost:5000/images/'


  const handelsubmit = async (e) => {
    e.preventDefault();
    dispatch({type:'UPDATE_START'})
    const updateuser ={
      userid: user._id,
      username,
      email,
      password
    }
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updateuser.profilepic = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {}
    }
     try{
      const res= await axios.put('http://localhost:5000/api/users/update/'+user._id, 
        updateuser)
        setsuccess(true)
        
         dispatch({type:'UPDATE_SUCCESS',payload:res.data})
     } catch(err) {
       dispatch({type:'UPDATE_FAILURE'})
     }
  }

  return (
    <div className='Settings'>
      <div className='settingWrapper'>
      <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handelsubmit} >
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilepic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange= { e =>setfile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} name="name" onChange={e => setusername(e.target.value)}/>
          <label>Email</label>
          <input type="email" placeholder={user.email} name="email"  onChange={e => setemail(e.target.value) } />
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" onChange= {e =>setpassword(e.target.value)}/>
          <button className="settingsSubmitButton" type="submit" >
            Update
          </button>
          {success && <span style ={{color:'green', textAlign:'center', marginTop:'20px'}}>profile has been updated...</span>}
        </form>
      </div>
      <Sidebar/>
    </div>
  )
}
