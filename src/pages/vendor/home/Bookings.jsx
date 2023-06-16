import React from 'react'
import BookingManagment from '../../../components/vendor/BookingManagment'
import SideBar from '../../../components/vendor/SideBar'

function Bookings() {
  return (
    <section className='flex gap-6'>
      
       
    <SideBar/>
      
      <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
    <BookingManagment/>
        
      </div>

    </section>
  )
}

export default Bookings
