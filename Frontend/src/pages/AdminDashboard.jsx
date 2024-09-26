import React from 'react'
import { useAuth } from '../context/authContext'
import { AdminSIdebar } from '../components/AdminSIdebar'
import { Navbar } from '../components/Navbar'
import AdminSummary from '../components/AdminSummary'




const AdminDashboard = () => {
  const {user} =useAuth()
  return (
  <div className='flex'>
    <AdminSIdebar />
    <div className='flex-1 ml-64 bg-gray-100 h-scree'>
      <Navbar />
      <AdminSummary />

    </div>
  </div>
  )
}

export default AdminDashboard