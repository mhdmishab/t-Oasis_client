

// import React from 'react';
// import bgImg from '../../../assets/images/signupbg.jpg';
// import { useDispatch, useSelector } from 'react-redux';
// import LoungeDetails from '../../../components/user/UserLoungeDetails';
// import { useEffect } from 'react';
// import { getfacilities } from '../../../slices/user/Facility';
// import UserFacilityCard from '../../../components/user/UserFacilityCard';
// import UserChatBox from '../../../components/user/UserChatBox';

// function LoungeHome() {
//   const dispatch = useDispatch();
//   const { loungeId } = useSelector((state) => state.loungeuser);
//   const { vendorId } = useSelector((state) => state.loungeuser);
//   const { lounges } = useSelector((state) => state.loungeuser);
//   const { facilities } = useSelector((state) => state.facilityuser);

//   useEffect(() => {
//     dispatch(getfacilities(vendorId));
//   }, [dispatch, vendorId]);

//   const lounge = lounges?.filter((lounge) => lounge._id === loungeId);

//   const containerStyle1 = {
//     backgroundImage: `url(${bgImg})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//     height: '40vh',
//   };

//   const containerStyle2 = {
//     backgroundImage: `url(${lounge[0]?.loungeImages[0]?.url})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//   };

//   return (
//     <div className="flex flex-col w-full">
//       <div className="w-full flex items-end justify-center " style={containerStyle1}>
//         <div className="flex flex-col">
//           <div className="rounded-full w-48 h-48  bg-red-300 -mb-20" style={containerStyle2}></div>
//         </div>
//       </div>
//       <div className="w-full h-full sm:h-72  flex flex-col justify-center items-center mt-36 sm:mt-10  ">

//         <LoungeDetails lounge={lounge} />
        
//       </div>
//       <div className="w-full flex flex-wrap justify-center p-8 mt-10 sm:mt-0 ">
//         {facilities?.map((facility) => (
//           <UserFacilityCard lounge={lounge} facility={facility} key={facility._id} />
//         ))}
//       </div>
//       <UserChatBox/>
//     </div>
//   );
// }

// export default LoungeHome;


import React, { useState } from 'react';
import bgImg from '../../../assets/images/signupbg.jpg';
import { useDispatch, useSelector } from 'react-redux';
import LoungeDetails from '../../../components/user/UserLoungeDetails';
import { useEffect } from 'react';
import { getfacilities } from '../../../slices/user/Facility';
import UserFacilityCard from '../../../components/user/UserFacilityCard';
import UserChatBox from '../../../components/user/UserChatBox'; 

function LoungeHome() {
  const dispatch = useDispatch();
  const { loungeId } = useSelector((state) => state.loungeuser);
  const { vendorId } = useSelector((state) => state.loungeuser);
  const { lounges } = useSelector((state) => state.loungeuser);
  const { facilities } = useSelector((state) => state.facilityuser);

  const userToken = localStorage?.getItem('userToken');
    const parsedUserToken = JSON?.parse(userToken);
    const userId = parsedUserToken?.userId;

  useEffect(() => {
    dispatch(getfacilities(vendorId));
  }, [dispatch, vendorId]);

  const lounge = lounges?.filter((lounge) => lounge._id === loungeId);

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
      <div className="w-full h-full sm:h-72  flex flex-col justify-center items-center mt-36 sm:mt-10  ">
        <LoungeDetails lounge={lounge} />
      </div>
      <div className="w-full flex flex-wrap justify-center p-8 mt-10 sm:mt-0 ">
        {facilities?.map((facility) => (
          <UserFacilityCard lounge={lounge} facility={facility} key={facility._id} />
        ))}
      </div>
      {/* Chat button at the bottom */}
      {userId && <div
        className="fixed bottom-4 right-4 z-10 bg-blue-500 text-white p-4 rounded-full cursor-pointer"
        onClick={handleChatToggle}
      >
        Chat
      </div>}

      {/* UserChatBox as a drop-up */}
      <div className={`${isChatOpen ? 'block' : 'hidden'
        } fixed bottom-11 right-0 left-0 bg-white p-4 shadow-lg sm:w-1/2 lg:w-1/3 lg:bottom-0  lg:right-4 mx-auto`}>
        {userId && isChatOpen && <UserChatBox vendorId={vendorId} userId={userId} />}
      </div>
    </div>
  );
}

export default LoungeHome;







