import React from 'react'
import LoginForm from '../../../components/user/LoginForm'
import loginImg from '../../../assets/images/signupbg.jpg'



function Login() {
  return (
    
  <div className="font-alata w-full h-full flex justify-center items-center pt-32 sm:p-9 md:p-28 lg:p-32">
  <div className="flex bg-white-100 shadow-xl shadow-white-600/80 sm:flex-col md:flex-row lg:flex-row">
    <div className="hidden lg:block flex-1">
      <img className="" src={loginImg} alt="loginpic" />
    </div>
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full sm:w-96 md:w-96 lg:w-96">
        <LoginForm />
      </div>
    </div>
  </div>
</div>
 

  
  )
}

export default Login
