import React from 'react'
import LoginForm from '../../../components/user/auth/LoginForm'
import loginImg from '../../../assets/images/signupbg.jpg'



function Login() {
  return (
    

    <div className='font-alata pt-16 flex'>
       <div className='h-full flex-1 flex items-center justify-end'>
        
          <img className='w-3/5 h-full ' src={loginImg} alt='loginpic'/>

        
       </div>
       <div className='h-full flex-1 top-[20%]'>
        
          <LoginForm/>

        
       </div>
       
    </div>
  
  )
}

export default Login
