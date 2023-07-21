// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setLoungeId, setVendorId } from '../../slices/user/Lounges';



// function UserLoungeCard({lounge}) {
//     const dispatch=useDispatch();
//     const navigate=useNavigate();

//     const handleInsideCard=(vendorId,loungeId)=>{
//         console.log(vendorId,"vendor id");
        
//         try{
            
//            dispatch(setVendorId({ id: vendorId }));
//            dispatch(setLoungeId({ id: loungeId }));
           
//             navigate('/lounge');
       
            
//         }catch(error){
//             console.log(error);
//         }
   
    
//     }



//     return (
//         <>
           
//                 <div  onClick={()=>handleInsideCard(lounge.vendor_id,lounge._id)} className='cursor-pointer w-72 h-48 bg-white rounded-lg mt-16 relative drop-shadow-[0_15px_15px_rgba(0,0,0,0.16)] hover:drop-shadow-xl m-3'>
//                     <div className='w-60 h-52 bg-white rounded-md ml-6 -mt-12 absolute'>
//                         <div className='flex-1 hover:cursor-pointer flex justify-center'>
//                             <img src={lounge.loungeImages[0]?.url} className='rounded-lg w-56  h-44' alt='Lounge' />
//                         </div>
//                         <div className='flex-1 flex-col items-center mt-2'>
//                             <div className='flex'>

//                             <h5 className='text-sm text-bold flex justify-between'>
//                                 {lounge.loungeName} || {lounge.loungeDistrict}                                   
//                             </h5>
//                             {/* <p className='mt-1 text-xs text-gray-600 '>{lounge.isApproved === 'approved' ? <span className='text-green-400'>Active</span> : lounge.isApproved === 'pending' ? <span className='text-orange-400'>Approval Pending</span> : <span className='text-red-400'>Rejected</span>}</p>  */}
//                             </div>
//                             <p className='mt-1 text-xs text-gray-600'>{lounge.loungeState}

//                             </p>
//                         </div>
//                     </div>
                
//                 </div>
 

//         </>
//     );
// }

// export default UserLoungeCard

import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoungeId, setVendorId } from '../../slices/user/Lounges';

function UserLoungeCard({ lounge }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInsideCard = (vendorId, loungeId) => {
    try {
      dispatch(setVendorId({ id: vendorId }));
      dispatch(setLoungeId({ id: loungeId }));
      navigate('/lounge');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={() => handleInsideCard(lounge.vendor_id, lounge._id)}
      className="cursor-pointer w-full sm:w-1/2 md:w-1/3  p-2"
    >
      <div className="w-full max-w-sm mx-auto bg-white rounded-md overflow-hidden shadow-md">
        <div className="w-full h-36">
          <img
            src={lounge.loungeImages[0]?.url}
            className="object-cover w-full h-full"
            alt="Lounge"
          />
        </div>
        <div className="px-4 py-3 md:px-6">
          <h5 className="text-base  font-semibold truncate">
            {lounge.loungeName} || {lounge.loungeDistrict}
          </h5>
          <p className="mt-1 text-sm md:text-base  text-gray-600">
            {lounge.loungeState}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserLoungeCard;






