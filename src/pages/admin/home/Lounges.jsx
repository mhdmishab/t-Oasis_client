import React from 'react'


import AdminSidebar from '../../../components/admin/AdminSideBar'
import LoungeManagment from '../../../components/admin/LoungeManagment'


function Lounges() {
  return (
    <section className='flex gap-6'>
      
       
         <AdminSidebar/>
      
      <div className='p-7 text-2xl font-semibold flex-1 h-screen overflow-auto'>
           <LoungeManagment/>
        
      </div>

    </section>
  )
}

export default Lounges