import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFacilityId } from '../../slices/user/Facility';

function UserFacilityCard({ facility }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInsideCard = (facilityId) => {
    console.log(facilityId, 'facility id');
    try {
       dispatch(setFacilityId({id: facilityId }));
        navigate('/facilitybooking');
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <>
      <div onClick={() => handleInsideCard(facility._id)} className=' cursor-pointer w-72 h-48 bg-white rounded-lg  relative drop-shadow-[0_15px_15px_rgba(0,0,0,0.16)] hover:drop-shadow-xl m-3'>
        <div className='w-60 h-52 bg-white rounded-md ml-6 -mt-12 absolute'>
          <div className='flex-1 hover:cursor-pointer flex justify-center'>
            <img src={facility.facilityImage?.url} className='rounded-lg w-56 h-44' alt='facility' />
          </div>
          <div className='flex-1 flex-col items-center mt-2'>
            <div className='flex'>
              <h5 className='text-sm text-bold flex justify-between'>
                {facility.facilityName}
              </h5>
            </div>
            <p className='mt-1 text-xs text-gray-600 flex justify-between'>No of token needed: {facility.facilityToken}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserFacilityCard;
