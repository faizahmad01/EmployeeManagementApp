import React from 'react'
import { AdminSIdebar } from '../components/AdminSIdebar'
import Navbar from '../components/Navbar'
import EmployeeUpdateForm from '../components/EmployeeUpdateForm'

const UpdateForm = () => {
  return (
    <div>
        <div className='flex'>
            <AdminSIdebar />

        </div>
        <div className='flex-1 ml-64 bg-gray-100 h-screen'>
            <Navbar />
            <EmployeeUpdateForm />
        </div>
    </div>
  )
}

export default UpdateForm