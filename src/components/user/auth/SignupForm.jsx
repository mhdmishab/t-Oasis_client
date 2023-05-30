
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Signup } from '../../../store/actions/AuthActions';

function SignupForm() {

  const [user,setUser]=useState({
    name:"",
    email:"",
    password:""
  })
const dispatch=useDispatch();
const State=useSelector(state=>state)
console.log(State);
const handleSubmit=(e)=>{
  e.preventDefault();
  dispatch(Signup(user));
  setUser({
    name:"",
    email:"",
    password:""
  })
}

  return (
    <form className=' p-8 px-8 rounded-lg' onSubmit={handleSubmit}>
      <h2 className='text-4xl dark:text-gray-800 font-bold text-center'>Signup</h2>
      <div className='flex flex-col text-white py-2'>
          <label className='text-gray-800'>Name</label>
          <input className='rounded-lg bg-[#9D9D9D] mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type='text' value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})}/>
      </div>
      <div className='flex flex-col text-white py-2'>
          <label className='text-gray-800'>Email</label>
          <input className='rounded-lg bg-[#9D9D9D] mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type='text' value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
      </div>

      <div className='flex flex-col text-white py-2'>
          <label className='text-gray-800'>Password</label>
          <input className='rounded-lg bg-[#9D9D9D] mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type='password' value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
      </div>
      <div className='flex flex-col text-white py-2'>
          <label className='text-gray-800'>Password</label>
          <input className='rounded-lg bg-[#9D9D9D] mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type='password' value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
      </div>
     
      <button className='w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/50 text-white font-semibold rounded-lg'>Sign Up</button>


    </form>
  )
}

export default SignupForm
