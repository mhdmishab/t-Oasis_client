import React from 'react';
import DashboardManagement from '../../../components/vendor/DashboardManagement'
import VendorSidebar from '../../../components/vendor/VendorSidebar'



function Dashboard() {
  return (
    <section className='flex gap-6'>
      
       
    <VendorSidebar/>
      
      <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
            <DashboardManagement/>
        
      </div>

    </section>
  )
}

export default Dashboard
