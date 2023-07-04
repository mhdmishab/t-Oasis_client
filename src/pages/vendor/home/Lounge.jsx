import React from 'react'
import LoungeSidebar from '../../../components/vendor/LoungeSidebar'
import { useSelector } from 'react-redux';
import LoungeDetails from '../../../components/helpers/LoungeDetails';


function Lounge() {
    const {lounges}=useSelector((state)=>state.loungevendor);
    const {loungeId}=useSelector((state)=>state.loungevendor);
    return (
        <section className='flex gap-6'>


            <LoungeSidebar />

            <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
            <LoungeDetails loungeId={loungeId} lounges={lounges}/>

            </div>

        </section>
    )
}

export default Lounge

