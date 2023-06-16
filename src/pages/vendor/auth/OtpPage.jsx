import React from 'react'
import OtpForm from '../../../components/vendor/OtpForm';
import otpImg from '../../../assets/images/vendorbg.jpg';

function OtpPage() {
  return (
    <div>
        <div className="font-alata w-screen h-screen flex justify-center items-center p-4 sm:p-8 md:p-12 lg:p-16">
    <div className="flex  bg-white h-4/5 shadow-xl shadow-white-600/80 sm:flex-col  md:flex-row lg:flex-row">
      <div className="hidden md:block pt-4 flex-1 ">
        <img className="" src={otpImg} alt="loginpic" />
      </div>
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="w-full sm:w-96 md:w-96 lg:w-96">
          <OtpForm/>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default OtpPage
