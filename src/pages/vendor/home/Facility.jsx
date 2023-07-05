import React from 'react'
import FacilityDetails from '../../../components/helpers/FacilityDetails';
import { useSelector } from 'react-redux';
import VendorSidebar from '../../../components/vendor/VendorSidebar';

function Facility() {
    
    const {facilities}=useSelector((state)=>state.facilityvendor);
    const {facilityId}=useSelector((state)=>state.facilityvendor);
    console.log("hellooo",facilityId);
    
    return (
       

            <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
            <FacilityDetails facilityId={facilityId} facilities={facilities}/>

            </div>

        
    )
}

export default Facility
