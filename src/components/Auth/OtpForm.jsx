import React, { useEffect, useState } from 'react';
import OTPInput, { ResendOTP } from 'otp-input-react';
import { useDispatch, useSelector } from 'react-redux';
import { otpVerification } from '../../slices/vendor/Auth';
import { useNavigate } from 'react-router-dom';

function OtpForm() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [OTP, setOTP] = useState('');
  const {isLoggedIn}=useSelector(state=>state.authe);

  

  useEffect(()=>{
    if(isLoggedIn){
      navigate('/');
    }
      
  },[isLoggedIn,navigate])

  const handleOTPChange = (otp) => {
    setOTP(otp);
    if(otp.length==6){
      console.log(otp);
      dispatch(otpVerification(otp));
    }
  };

  const handleResendOTP = () => {
    
    console.log('Resend OTP clicked');

  };

  var innerHeight=30;

  return (
    <>
    
      <OTPInput
        value={OTP}
        onChange={handleOTPChange}
        autoFocus
        OTPLength={6}
        otpType="number"
        disabled={false}
        inputClassName="w-full rounded-lg text-white bg-[#9D9D9D] text-center  focus:border-blue-500 focus:bg-gray-800 focus:outline-none shadow-lg shadow-teal-800/50"
        className="flex justify-center"
      />
      <ResendOTP
        onResendClick={handleResendOTP}
        text="Resend OTP"
        className="w-full mt-9 my-5 py-5 p-2 bg-teal-500 shadow-lg shadow-teal-500/50 text-white font-semibold rounded-lg"
        style={{ color: 'white', cursor: '' }}
        maxTime={4}
      />
    </>
  );
}

export default OtpForm;