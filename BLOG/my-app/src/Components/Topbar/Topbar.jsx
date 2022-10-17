import React from 'react'
import './Topbar.css'
import {Link} from 'react-router-dom'
import {useContext} from 'react';
import {Context} from '../../context/context'
export default function Topbar() {
  const {user, dispatch}= useContext(Context)
  const handellogout = () =>{
    dispatch({type:'LOGOUT'})
  }
  return (
    <div className='topbar'>
       <div className='topleft'>
       <i className=" topicon fa-brands fa-facebook-square"></i>
       <i className="topicon fa-brands fa-twitter-square"></i>
       <i className="topicon fa-brands fa-pinterest-square"></i>
       <i className="topicon fa-brands fa-instagram-square"></i>
           </div>
       <div className='topcenter'>
           <ul className='toplist'>
               <li className='toplistitem'> <Link className='link' to='/'>Home</Link></li>
               <li className='toplistitem'><Link className='link' to='/'>CONTACT</Link></li>
               <li className='toplistitem'><Link className='link' to='/'>ABOUT</Link></li>
               <li className='toplistitem'><Link className='link' to='/write'>WRITE</Link></li>
               <li className='toplistitem' onClick={handellogout}>{ user && 'LOGOUT'}</li>
           </ul>
       </div>
       <div className='topright'>
       {
          user ? (
            <Link to='/settings'>
            <img className='topimg'src={user.profilepic} alt=''/>

           </Link>
          ) : (
          <>
           <Link className='link' to='/login'>LOGIN</Link>
           <Link className='link' to='/register'>REGISTER</Link>
           </>
          )
        }

           <i className="topsearchicon fa-solid fa-magnifying-glass"></i>
       </div>
       
    </div>
  )
}
