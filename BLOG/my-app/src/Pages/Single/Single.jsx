import React from 'react'
import './Single.css'
import Singlepost from '../../Components/Singlepost/Singlepost'
import Sidebar from '../../Components/Sidebar/Sidebar'

export default function Single() {
  return (
    <div className='single'>
    <Singlepost/>
    <Sidebar/>
    </div>
  )
}
