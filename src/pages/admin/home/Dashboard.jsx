import React from 'react';
import DashboardManagement from '../../../components/vendor/DashboardManagement'
import AdminSidebar from '../../../components/admin/AdminSideBar'



function Dashboard() {
  return (
    <section className='flex gap-6'>
      
       
    <AdminSidebar/>
      
      <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
            <DashboardManagement/>
        
      </div>

    </section>
  )
}

export default Dashboard