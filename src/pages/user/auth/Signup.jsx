import React from 'react'
import SignupForm from '../../../components/user/auth/SignupForm'
import signupImg from '../../../assets/images/signupbg.jpg'

function Signup() {
  return (
    <div className='font-alata w-screen h-screen pt-16 flex'>
       <div className='h-full flex-1 flex items-center justify-end relative'>
        
          <img className='w-2/3 h-2/3 absolute right-[-100px]' src={signupImg} alt=''/>

        
       </div>
       <div className='h-full flex-1 relative'>
        <div className='w-96 absolute top-[20%] left-[-100px]'>
            <SignupForm/>

        </div>
       </div>
       
    </div>
  )
}

export default Signup
