import React from 'react'
import VendorSidebar from '../../../components/vendor/VendorSidebar'
import LoungeSidebar from '../../../components/vendor/LoungeSidebar'
import Facilities from '../../../components/vendor/Facilities'

function LoungeFacilities() {
    return (
        <section className='flex gap-6'>


            <LoungeSidebar />

            <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
                <Facilities />

            </div>

        </section>
    )
}

export default LoungeFacilities
