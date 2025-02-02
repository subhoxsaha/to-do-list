import React from 'react'
import { Link } from 'react-router-dom'

const GetStarted = () => {
  return (
    <div className='w-screen h-full flex justify-center'>
      <div><h1 className='text-2xl mt-10'>Use this To-do application to track your desired todos <Link to='/login' className='text-blue-600 underline underline-offset-4'> Login in now</Link>  to use</h1>
      </div>

      
    </div>
  )
}

export default GetStarted