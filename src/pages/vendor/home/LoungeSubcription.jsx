import React from 'react'
import LoungeSidebar from '../../../components/vendor/LoungeSidebar'
import Subcriptions from '../../../components/vendor/Subcriptions'

function LoungeSubcription() {
  return (
    <section className='flex gap-6'>


            <LoungeSidebar/>

            <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
                <Subcriptions/>

            </div>

        </section>
  )
}

export default LoungeSubcription
