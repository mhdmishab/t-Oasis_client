import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Login } from '../../../store/actions/AuthActions';



function LoginForm() {

  const [user,setuser]=useState({
    email:"",
    password:""
  });
  const navigate=useNavigate();
  const State=useSelector(state=>state.auth)
  useEffect(()=>{
    if (State.error) {
      // Handle error
      console.log('Signup error:', State.error);
    } else if (State._id) {
      // Handle success
      console.log('login success:', State);
      navigate('/');
  }},[navigate,State])


  const dispatch=useDispatch();
  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(Login(user));
    setuser({
      email:"",
      password:""
    })
  }


  return (
    <div>
       <form className='max-w-[400px] w-full mx-auto bg-white p-8 px-8 rounded-lg shadow-teal-50 ' onSubmit={handleSubmit}>
      <h2 className='text-4xl dark:text-gray-800 font-bold text-center'>Login</h2>
      
      <div className='flex flex-col text-white py-2'>
          <label className='text-gray-800'>Email</label>
          <input className='rounded-lg bg-[#9D9D9D] mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type='text' value={user.email} onChange={(e)=>setuser({...user,email:e.target.value})}/>
      </div>

      <div className='flex flex-col text-white py-2'>
          <label className='text-gray-800'>Password</label>
          <input className='rounded-lg bg-[#9D9D9D] mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type='password' value={user.password} onChange={(e)=>setuser({...user,password:e.target.value})}/>
      </div>
      <div className='flex justify-end'>
          <p className='text-gray-400'>forgetpassword?</p>
      </div>
      <button className='w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/50 text-white font-semibold rounded-lg' >Login</button>
      <div className='flex justify-center'>
          <p className='text-gray-400'><NavLink to={'/signup'}>Need a account?</NavLink></p>
      </div>


    </form>
    </div>
  )
}

export default LoginForm;
