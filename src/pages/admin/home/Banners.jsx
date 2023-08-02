import React from 'react'
import AdminSidebar from '../../../components/admin/AdminSideBar'
import Banner from '../../../components/admin/Banner'

function Banners() {
  return (
      <section className='flex gap-6'>


          <AdminSidebar />

          <div className='p-7 text-2xl font-semibold flex-1 h-screen overflow-auto'>
              <Banner/>

          </div>

      </section>
  )
}

export default Banners
