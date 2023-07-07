import React from 'react'
import LoungeSidebar from '../../../components/vendor/LoungeSidebar'
import { useSelector } from 'react-redux';
import LoungeDetails from '../../../components/helpers/LoungeDetails';
import VendorSidebar from '../../../components/vendor/VendorSidebar';


function Lounge() {
    const {lounges}=useSelector((state)=>state.loungevendor);
    const {loungeId}=useSelector((state)=>state.loungevendor);
    return (
       

            <div className='p-7 text-2xl font-semibold flex-1 h-screen overflow-auto'>
            <LoungeDetails loungeId={loungeId} lounges={lounges}/>

            </div>

       
    )
}

export default Lounge

