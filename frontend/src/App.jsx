import React, { useEffect, useState } from 'react'
import  {BrowserRouter, Route, Routes } from 'react-router-dom'
// import {}

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { UserProvider } from './context/UserContext.jsx'
import AddTodo from './pages/AddTodo.jsx'

const App = () => {
 
  

  
  return (
    <BrowserRouter>
    <UserProvider>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/home'  element={<Home />} />
      <Route index  element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/add' element={<AddTodo />} />

    </Routes>
      </UserProvider>
    
    </BrowserRouter>
    
  )
}

export default App