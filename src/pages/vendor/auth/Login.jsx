import React from 'react'
import LoginForm from '../../../components/vendor/LoginForm';
import loginImg from '../../../assets/images/vendorbg.jpg';

function Login() {
  return (
    <div className="font-alata w-screen h-screen flex justify-center items-center p-4 sm:p-8 md:p-12 lg:p-16">
    <div className="flex bg-white shadow-xl shadow-white-600/80 sm:flex-col md:flex-row lg:flex-row">
      <div className="hidden md:block flex-1">
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
