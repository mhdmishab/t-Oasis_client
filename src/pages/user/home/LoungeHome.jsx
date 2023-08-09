
import React, { useState } from 'react';
import bgImg from '../../../assets/images/signupbg.jpg';
import { useDispatch, useSelector } from 'react-redux';
import LoungeDetails from '../../../components/user/UserLoungeDetails';
import { useEffect } from 'react';
import { getfacilities } from '../../../slices/user/Facility';
import UserFacilityCard from '../../../components/user/UserFacilityCard';
import UserChatBox from '../../../components/user/UserChatBox'; 
import { useRef } from 'react';



function LoungeHome() {
  const dispatch = useDispatch();
  const { loungeId } = useSelector((state) => state.loungeuser);
  const { vendorId } = useSelector((state) => state.loungeuser);
  const { lounges } = useSelector((state) => state.loungeuser);
  const { facilities } = useSelector((state) => state.facilityuser);
  const {notifications} = useSelector((state) => state.facilityuser);
  
  
    const userToken = localStorage?.getItem('userToken');
    const parsedUserToken = JSON?.parse(userToken);
    const userId = parsedUserToken?.userId;

  useEffect(() => {
    dispatch(getfacilities(vendorId));
    
  }, [dispatch, vendorId]);

  const lounge = lounges?.filter((lounge) => lounge._id === loungeId);

  console.log(notifications);

  const containerStyle1 = {
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '40vh',
  };

  const containerStyle2 = {
    backgroundImage: `url(${lounge[0]?.loungeImages[0]?.url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Function to handle opening and closing the chat
  const handleChatToggle = () => {
  
    setIsChatOpen((prevIsChatOpen) => !prevIsChatOpen);
  };


  return (

    <div className="flex flex-col w-full">
      <div className="w-full flex items-end justify-center " style={containerStyle1}>
        <div className="flex flex-col">
          <div className="rounded-full w-48 h-48  bg-red-300 -mb-20" style={containerStyle2}></div>
        </div>
      </div>
      <div className="w-full h-full sm:h-72  flex flex-col justify-center items-center mt-40 sm:mt-10  ">
        <LoungeDetails lounge={lounge} />
      </div>
      <div className="w-full flex flex-wrap justify-center p-8 mt-10 sm:mt-0 ">
        {facilities?.map((facility) => (
          <UserFacilityCard lounge={lounge} facility={facility} key={facility._id}  />
        ))}
      </div>
      {/* Chat button at the bottom */}
      {userId && (
        <>
        
       <button
       className={`fixed transition duration-150 ease-out hover:ease-in right-4  sm:right-10 z-10 bg-green-500 hover:bg-green-400 rounded-full p-4 cursor-pointer  ${
         isChatOpen ? "opacity-75 bottom-2/4 sm:bottom-10 " : "opacity-100  bottom-10"
       }`}
       onClick={handleChatToggle}
     >
      
       {isChatOpen ? (
         <h4 className="text-red-800 flex "><span className='text-white mr-2'>Close</span>X</h4>
       ) : (
        <>
        {notifications && <span className='absolute -mt-6 ml-8 px-2  bg-red-500 rounded-full text-white text-sm'>1</span>}
         <h4 className="text-white">Chat with Manager</h4>
        </>
       )}
     </button>
     </>
     
      )}

      {/* UserChatBox as a drop-up */}
      <div className={`${
    isChatOpen ? "block" : "hidden"
  } fixed bottom-0 duration-500 right-0 left-0 rounded-lg bg-white p-4 shadow-lg sm:w-1/2 lg:w-1/3 lg:bottom-0 lg:right-4 mx-auto transition-opacity animate-inside-out ${
    isChatOpen ? "opacity-96" : "opacity-0"
  }`}>
        {userId && <UserChatBox vendorId={vendorId} userId={userId} />}
      </div>
    </div>
  );
}

export default LoungeHome;







