import React from 'react';
import img from '../../assets/images/signupbg.jpg';

function Card() {
  return (
    <>
     <div className='w-80 h-72 bg-green-600 rounded-md absolute mt-14'>

    </div>      
        <div className='w-72 h-80 bg-slate-500 rounded-md relative ml-4 mb-9'>
            <div className='w-full h-1/3'>
               
                <img src={img} className='rounded-md'/>
            </div>
            <div className='w-full h-2/3 flex-col items-center'>
                <h4>Lounge Name</h4>
                <p>lounge address</p>
                <span className='mt-3'>Rating</span>
                <div>rating</div>
            </div>
        
        </div>
       
      
    </>
    
  )
}

export default Card
