import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import AllTasks from './AllTasks'
import {useNavigate } from 'react-router-dom'
import GetStarted from '../components/GetStarted'
import UserContext from '../context/UserContext'

const Home = () => {

  const [todo, setTodo] = useState([])
  const {user, setUser} =useContext(UserContext)
  
  return (

  
    <div>
        <Navbar user={user} setUser={setUser} />
        {user && <AllTasks todo={todo} setTodo={setTodo} />}
        {!user && <GetStarted />}
        
     </div>
  )
}

export default Home