import React from 'react';
import bgImg from '../../../assets/images/signupbg.jpg';
import { useDispatch, useSelector } from 'react-redux';
import LoungeDetails from '../../../components/user/UserLoungeDetails';
import { useEffect } from 'react';
import { getfacilities } from '../../../slices/user/Facility';
import UserFacilityCard from '../../../components/user/UserFacilityCard';

function LoungeHome() {

    const dispatch=useDispatch();
    const {loungeId}=useSelector(state=>state.loungeuser);
    const {vendorId}=useSelector(state=>state.loungeuser);
    const {lounges}=useSelector(state=>state.loungeuser);
    const {facilities}=useSelector(state=>state.facilityuser);

    console.log(facilities);
    

    console.log(loungeId,lounges);

    useEffect(()=>{
        console.log(vendorId)
        dispatch(getfacilities(vendorId))
    },[dispatch])

    const lounge=lounges?.filter((lounge)=>lounge._id===loungeId);

    console.log(lounge);

    const containerStyle1 = {
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '40vh',
      };

      const containerStyle2 = {
        backgroundImage: `url(${lounge[0].loungeImages[0]?.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // height: '40vh',
      };
  return (
    <div  className='flex-col '>
        <div className=' w-full  flex justify-center items-end ' style={containerStyle1} >
            <div className='flex-col'>

            <h4 className='text-white mb-2 ml-14 text-2xl'>{lounge[0].loungeName}</h4>
            <div className='rounded-full w-72 h-72 bg-red-300 -mb-36' style={containerStyle2}></div>
            </div>
        </div>
        <div className='w-full h-96 flex-col p-20' >
       
            <LoungeDetails lounge={lounge}/>
        </div>
        <div className='w-full h-96 flex p-10 mt-20'>

            {facilities?.map((facility)=>{
                return  <UserFacilityCard facility={facility} key={lounge.id} />
            })}
        
         </div>


      
      
    </div>
  )
}

export default LoungeHome
