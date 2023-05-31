import React, { useState, useRef,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { otpVerification } from '../../../store/actions/AuthActions';
import { useNavigate } from 'react-router-dom';

function OtpForm() {
  const [otp, setOtp] = useState('');
  const inputRefs = useRef([]);
  const dispatch=useDispatch();
    const otpToken=localStorage.getItem("token");
const navigate=useNavigate();
const State=useSelector(state=>state.auth)
useEffect(() => {
  // Check for dispatch response here
  if (State.error) {
    // Handle error
    console.log('Signup error:', State.error);
  } else if (State._id) {
    // Handle success
    console.log('verification success:', State);
    navigate('/');
    
    
  }
}, [State,navigate]);

   
  const handleSubmit = e => {
    e.preventDefault();
    // Handle OTP verification logic here
    console.log('OTP submitted:', otp);
    const otpData={otp,otpToken};
    setOtp('');
    console.log(otpData);
    dispatch(otpVerification(otpData));
  };

  const handleChange = (index, value) => {
    const newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(''));

    if (value) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Handle backspace/delete key press
      handleChange(index - 1, '');
      inputRefs.current[index - 1].focus();
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold mb-8">OTP Verification</h2>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="flex">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              className="rounded-lg text-white bg-[#9D9D9D] p-2 mr-2 text-center w-12 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              maxLength={1}
              value={otp[index] || ''}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
            />
          ))}
        </div>
        <button className="py-3 px-6 mt-8 bg-teal-500 text-white font-semibold rounded-lg">
          Verify OTP
        </button>
      </form>
    </div>
  );
}

export default OtpForm;
