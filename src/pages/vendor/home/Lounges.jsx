import React from 'react'

import LoungesManagement from '../../../components/vendor/LoungesManagement'
import VendorSidebar from '../../../components/vendor/VendorSidebar'


function Lounges() {
  return (
    <section className='flex gap-6'>
      
       
         <VendorSidebar/>
      
      <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
          <LoungesManagement/>
        
      </div>

    </section>
  )
}

export default Lounges
