import React from 'react'
import { useAuth } from '../context/authContext'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  const {user} =useAuth()
 
  return (
    <div className='flex items-center text-white justify-between h-12 bg-teal-600'>
        <p>Welcome, {user.name} Admin </p>
        <NavLink to="/login">
        <button className='px-4 py-1 bg-teal-700 hover:bg-teal-800'>Logout</button>
        </NavLink>
    </div>
  )
}
export default Navbar