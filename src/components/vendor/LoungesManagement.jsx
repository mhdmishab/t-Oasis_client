import React, { useState } from 'react'
import Card from '../helpers/Card'
import VendorCard from './VendorCard'
import { Button, Modal } from 'antd';
import LoungeForm from './LoungeForm';

function LoungesManagement() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = () => {
        console.log("dasda");
        
    };



    return (
        <div className='flex'>
            <Button className='w-44 h-44 mr-7 mt-10 shadow-lg flex-col  items-center cursor-pointer pt-9 text-md' onClick={showModal} ><svg fill="none" stroke="gray" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" className='' /> 
            </svg>Add Lounge</Button>



            <VendorCard />



                <Modal
                    title="Add Lounge"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    className="w-96"
                    footer={null}
                    bodyStyle={{height:'500px',overflow:'auto'}}
                    width={1000}
                >

                   <LoungeForm/>
                </Modal>
        </div>
    )
}

export default LoungesManagement
