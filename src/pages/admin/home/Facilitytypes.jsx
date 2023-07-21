import React from 'react'
import FacilitytypesManagment from '../../../components/admin/FacilitytypesManagment'
import AdminSideBar from '../../../components/admin/AdminSideBar'

function Facilitytypes() {




  return (
    <section className='flex gap-6'>
      
       
         <AdminSideBar/>
      
      <div className='p-7 text-2xl font-semibold flex-1 h-screen overflow-auto'>
           
        <FacilitytypesManagment/>
      </div>

    </section>
  )
}

export default Facilitytypes
