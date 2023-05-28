import React from 'react'
import { NavLink } from 'react-router-dom';



function LoginForm() {
  return (
    <div>
       <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg shadow-teal-50'>
      <h2 className='text-4xl dark:text-white font-bold text-center'>Login</h2>
      
      <div className='flex flex-col text-gray-400 py-2'>
          <label>Email</label>
          <input className='rounded-lg bg-[#9D9D9D] mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type='text'/>
      </div>

      <div className='flex flex-col text-gray-400 py-2'>
          <label>Password</label>
          <input className='rounded-lg bg-[#9D9D9D] mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type='password'/>
      </div>
      <div className='flex justify-end'>
          <p className='text-gray-400'>forgetpassword?</p>
      </div>
      <button className='w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/50 text-white font-semibold rounded-lg'>Login</button>
      <div className='flex justify-center'>
          <p className='text-gray-400'><NavLink to={'/signup'}>Need a account?</NavLink></p>
      </div>


    </form>
    </div>
  )
}

export default LoginForm;
