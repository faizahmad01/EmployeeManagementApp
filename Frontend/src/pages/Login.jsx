import React, {  useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function Login() {

  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('')
  const [error, setError]=useState(null)
  const {login} =useAuth()
  const navigate= useNavigate()

  const HandleSubmitButton= async (e)=>{
   
    e.preventDefault();
    

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", 
        {email, password}
      );
      if(response.data.success){
        login(response.data.user)
        localStorage.setItem("token", response.data.token)
        if(response.data.user.role ==="admin"){
          navigate('/admin-dashboard')

        }
      }
      
      
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error); // Display server error message
    } else {
        setError("Server Error"); // General error in case of server issues
    }
    
      
      
    }
    
    

  }
  return (
    <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-grey-100 to-50% space-y-6'>
        <h2 className='font-sevillana text-3xl text-white'>Employee Management System</h2>
        <div className='border shadow p-6 w-80 bg-white'>
          <h2 className='text-2xl font-bold mb-4'>Login</h2>
          {error && <p className='text-red-500'>{error}</p>}
          <form onSubmit={HandleSubmitButton}>
          <div className='mb-4'>
          <label htmlFor="email">Email</label>
          <input type="email" className='w-full px-3 py-2 border' placeholder='Enter Email'
          onChange={(e) => setEmail(e.target.value)}
          required
          />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" className='w-full px-3 py-2 border' placeholder='*********' 
            onChange={(e) => setPassword(e.target.value)}
            required
            />
          </div>
          <div>
            <label className=''>
              <input type="checkbox" className='form-checkbox' />
              <span className='ml-2 text-grey-700'>Remember me</span>
            </label>
            <a href="#" className='text-teal-600 space-x-2'> Forget Password</a>
          </div>
          <button 
          type='submit'
          className='w-full bg-teal-600 text-white py-2'
          >Login</button>
        </form>
        </div>     
        
    </div>
  )
}


export default Login