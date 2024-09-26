import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaSignOutAlt, FaTachometerAlt, FaUserPlus, FaUsers } from 'react-icons/fa'
export const AdminSIdebar = () => {
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
        <div className='bg-teal-600 h-12 flex items-center justify-center'>
            <h3 className='text-2xl text-center'>
                Employee MS
            </h3>
        </div>
        <div className='px-4'>
          <NavLink to="/admin-dashboard"
          className={({isActive}) =>`${isActive ? "bg-teal-500 ":""}flex items-center space-x-4 block py-2.5 px-4 rounded` }>
            <FaTachometerAlt />
            <span>Home</span>
          </NavLink>
          <NavLink to="/admin-dashboard/employe-list"
           className={({isActive}) =>`${isActive ? "bg-teal-500 ":""}flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <FaUsers   />
            <span>Employee List</span>
          </NavLink>
          <NavLink to="/admin-dashboard/create-employe"
         className={({isActive}) =>`${isActive ? "bg-teal-500 ":""}flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <FaUserPlus />
            <span>Create Employe</span>
          </NavLink>
          <NavLink to="/login"
          className={({isActive}) =>`${isActive ? "bg-teal-500 ":""}flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <FaSignOutAlt />
            <span>Logout</span>
          </NavLink>
        </div>
    </div>
  )
}
