import React from 'react'
import BookingManagment from '../../../components/vendor/BookingManagment'
import VendorSidebar from '../../../components/vendor/VendorSidebar'


function Bookings() {


  return (
    <section className='flex gap-6'>
      
       
    <VendorSidebar/>
      
      <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
    <BookingManagment/>
        
      </div>

    </section>
  )
}

export default Bookings
