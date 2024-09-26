import React from 'react'
import { AdminSIdebar } from '../components/AdminSIdebar'
import Navbar from '../components/Navbar'
import EmployeForm from '../components/EmployeForm'

const CreateEmploye = () => {
  return (
    <div className='flex'>
        <AdminSIdebar />
        <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar />
        <EmployeForm />
        </div>
    </div>
  )
}

export default CreateEmploye