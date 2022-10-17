
import './App.css';
import Topbar from './Components/Topbar/Topbar';
import Home from './Pages/Home/Home'
import Single from './Pages/Single/Single'
import Write from './Pages/Write/Write'
import Settings from './Pages/Settings/Settings'
import Login from './Pages/Login/Login'
import Register from  './Pages/Register/Register'
import { BrowserRouter as Router, Switch, Route, BrowserRouter,Routes } from "react-router-dom";
import {useContext} from 'react'
import {Context} from './context/context'
function App() {
  const {user}= useContext(Context)
  return (
    <>
    <BrowserRouter>
    <Topbar/>

    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/register" element={ user ? <Home/> :<Register/>}/>
      <Route exact path="/login" element={user ? <Home/> :<Login/>}/>
      <Route exact path="/write" element={user ? <Write/> : <Login/>}/>
      <Route exact path="/post/:postId" element={<Single/>}/>
        
      <Route exact path="/settings" element={user ?<Settings/> : <Login/>}/>
        
      </Routes>

    </BrowserRouter>

    </>
  );
}

export default App;
