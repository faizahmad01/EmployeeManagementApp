import React from 'react'
import { AdminSIdebar } from '../components/AdminSIdebar'
import Navbar from '../components/Navbar'
import EmployeeList from '../components/EmployeeList'

const EmployeListHandler = () => {
  return (
    <div>
        <div className='flex'>
        <AdminSIdebar />
        </div>
        <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar />
        <EmployeeList />
        </div>
        
       
    </div>
  )
}

export default EmployeListHandler