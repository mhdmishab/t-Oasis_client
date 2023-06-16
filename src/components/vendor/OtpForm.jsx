import React, { useEffect, useState } from 'react';
import OTPInput from 'otp-input-react';
import { useDispatch, useSelector } from 'react-redux';
import { otpVerification, resendotp } from '../../slices/vendor/Auth';
import { useNavigate } from 'react-router-dom';

function OtpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timer, settimer] = useState();
  const [OTP, setOTP] = useState('');
  const { isLoggedIn } = useSelector(state => state.vendorauth);
  const { loading } = useSelector(state => state.vendorauth);
  const errorMessage = useSelector((state) => state.vendorauth.errorMessage);

  const token = localStorage.getItem("vendorToken");


  useEffect(() => {
    if (isLoggedIn) {

      if (token) {
        navigate('/manager/dashboard');
      }
    }

  }, [isLoggedIn, navigate])

  let startTimer = (timer) => {
    if (timer === 0) {
      return;
    }
    setTimeout(() => {
      settimer(timer - 1);
    }, 1000);

  };

  useEffect(() => {
    const otpToken = localStorage.getItem("otptoken");

    if (otpToken) {
      const otpObj = JSON.parse(otpToken);
      const expirationTime = otpObj.expiresAt;
      const currentTime = Date.now();

      if (expirationTime > currentTime) {
        const newTimer = Math.floor((expirationTime - currentTime) / 1000);
        settimer(newTimer);
        startTimer(timer);

      } else {
        settimer(0);
      }
    }



  }, [startTimer]);




  const handleOTPChange = (otp) => {
    setOTP(otp);
    if (otp.length === 6) {
      console.log(otp);

      dispatch(otpVerification(otp));

    }
  };

  const handleResendOTP = () => {

    
    console.log('iniside vendor otp form');
    dispatch(resendotp()).then((response) => {
      console.log(response);
      navigate('/manager/otp');
    }).catch((err) => {
      console.log("error catched");
      console.log(err);

    })

  };



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

      <button className="w-full mt-9 my-5 py-5 p-2 bg-teal-500 shadow-lg shadow-teal-500/60 text-white font-semibold rounded-lg flex justify-between cursor-text">
        {loading ? "Loading..." : (timer > 0 ? `${timer} s` : <p className='cursor-pointer' onClick={handleResendOTP}>Resend OTP</p>)}
      </button>
      {errorMessage && <p className="text-red-500 ">{errorMessage}</p>}
    </>
  );
}

export default OtpForm;