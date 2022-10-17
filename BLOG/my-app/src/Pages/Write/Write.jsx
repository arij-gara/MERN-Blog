import axios from 'axios'
import React , {useContext, useState} from 'react'
import {Context} from '../../context/context'
import './Write.css'
export default function Write() {
  const[title,settitle]=useState('')
 const [description,setdescription]= useState('')
  const [file,setfile]=useState(null)
   const{user}= useContext(Context)
  const handelsubmit =  async (e)=>{
    e.preventDefault()
    const newpost ={
      username:user.username,
      title,
      description,

    }
    if(file) {
      const data= new FormData();
      const filename= Date.now()+ file.name
      data.append('name',filename)
      data.append('file',file)
      newpost.photo=filename;
      try{
       await axios.post('http://localhost:5000/api/upload',data)
      }catch(err){

      }
    }
    try{
       const res = await axios.post('http://localhost:5000/api/posts',newpost)
       window.location.replace('/post/'+ res.data._id)

    }catch(err){

    }

  }
  return (
    <div className='Write'>
      { file && (
      <img
        className="writeImg"
        src={URL.createObjectURL(file)}
        alt=""
      />
      )}
      <form className="writeForm" onSubmit={handelsubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} onChange={(e)=>setfile(e.target.files[0])}/>
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange ={ e => settitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange ={ e => setdescription(e.target.value)}
          
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
    
  )
}
