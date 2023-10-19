import React from 'react'
import { useNavigate } from 'react-router-dom'

function Errorpage() {
    const navigate=useNavigate();
    const handleClick=()=>{
        navigate('/')

    }
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
  <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
    <div className="relative">
      <div className="absolute">
        <div className="">
          <h1 className="my-2 text-gray-800 font-bold text-2xl">
            Looks like you've found the doorway to the great nothing
          </h1>
          <p className="my-2 text-gray-800">
            Sorry about that! Please visit our homepage to get where you need
            to go.
          </p>
          <button onClick={handleClick} className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50">
            Take me there!
          </button>
        </div>
      </div>
      <div>
        <img
          src="https://i.ibb.co/G9DC8S0/404-2.png"
          alt="Error 404 Illustration"
        />
      </div>
    </div>
  </div>
  <div>
    <img src="https://i.ibb.co/ck1SGFJ/Group.png" alt="Illustration" />
  </div>
</div>
  )
}

export default Errorpage