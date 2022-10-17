import React from 'react'
import { useEffect , useState,useContext} from 'react'
import { useLocation } from 'react-router-dom'
import './Singlepost.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Context} from '../../context/context'

export default function Singlepost() {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");

  const [updateMode, setUpdateMode] = useState(false);

  const{user} = useContext(Context)
  const location =useLocation()
  const path = location.pathname.split('/')[2]
  const[post,setpost]= useState({})
  const PF ='http://localhost:5000/images/'



  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/" + path);
      setpost(res.data);
      setTitle(res.data.title);
      setdescription(res.data.description);
    };
    getPost();
  }, [path]);


//   useEffect (   ()=>{
//     axios
//     .get('http://localhost:5000/api/posts/'+path)
     
//     .then( res =>{
//       setpost(res.data)
      
//       setTitle(res.data.title);
//       setdescription(res.data.description);
//       }).catch(err =>{
//         console.log(err)
    
//   },[path,title])
// })
const handeldelete = async () => {
  try {
    await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
      data: { username: user.username },
    });
    window.location.replace("/");
  } catch (err) {}
};

const handelupdate = async () => {
  try {
    await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
     username: user.username,
      title,
      description,
    });
    setUpdateMode(false)
    
  } catch (err) {

  }
};

  return (
    <div className='singlepost'>
      
      <div className="singlePostWrapper">
        {post.photo  &&
        <img
          className="singlePostImg"
          src={PF+ post.photo}
          alt=""
        />
}
{updateMode ? (
          <input
          type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) :(
        <h1 className="singlePostTitle">
        {title}
        {post.username === user?.username && (
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)} ></i>
            <i className="singlePostIcon far fa-trash-alt" onClick={handeldelete}></i>
          </div>
        )} 
        </h1> )}
        <div className="singlePostInfo">
          <span>
            Author:
            <Link to={`/?user=${post.username}`}
           className="link">
           <b>
             {post.username}
             </b>
       
            </Link>
            
          
          </span>
          <span>{ new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={description}
            onChange={(e) => {setdescription(e.target.value)}}
          />
        ) :(
        <p className="singlePostDesc">
         {description}
          <br />
          <br />
     
        </p>)}
        {updateMode && (
          <button className="singlePostButton" onClick={handelupdate}>
            Update
          </button>
        )}

      </div>


    </div>
  )
}
