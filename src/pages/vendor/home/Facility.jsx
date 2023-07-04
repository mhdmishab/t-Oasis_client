import React from 'react'
import LoungeSidebar from '../../../components/vendor/LoungeSidebar';
import FacilityDetails from '../../../components/helpers/FacilityDetails';
import { useSelector } from 'react-redux';

function Facility() {
    
    const {facilities}=useSelector((state)=>state.facilityvendor);
    const {facilityId}=useSelector((state)=>state.facilityvendor);
    console.log("hellooo",facilityId);
    
    return (
        <section className='flex gap-6'>
            

            <LoungeSidebar />

            <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
            <FacilityDetails facilityId={facilityId} facilities={facilities}/>

            </div>

        </section>
    )
}

export default Facility
