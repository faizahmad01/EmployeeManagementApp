import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import CreateEmploye from './pages/CreateEmploye'
import EmployeListHandler from './pages/EmployeListHandler'
import EmployeeUpdateForm from './components/EmployeeUpdateForm'
import UpdateForm from './pages/UpdateForm'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to="/admin-dashboard" />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/admin-dashboard' element={<AdminDashboard />}></Route>
      <Route path='/admin-dashboard/create-employe' element={<CreateEmploye/>}></Route>
      <Route path='/admin-dashboard/employe-list' element={<EmployeListHandler/>}></Route>
      <Route path='/edit/:id' element={<UpdateForm />}></Route>
    </Routes>
    
    
    </BrowserRouter>
  
  )
}

export default App