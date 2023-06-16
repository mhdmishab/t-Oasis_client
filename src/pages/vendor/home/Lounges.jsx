import React from 'react'
import SideBar from '../../../components/vendor/SideBar'
import LoungesManagement from '../../../components/vendor/LoungesManagement'


function Lounges() {
  return (
    <section className='flex gap-6'>
      
       
            <SideBar/>
      
      <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
            <LoungesManagement/>
        
      </div>

    </section>
  )
}

export default Lounges
