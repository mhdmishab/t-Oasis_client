import React, { useEffect, useState } from 'react'
import Card from '../helpers/Card'
import VendorCard from './VendorCard'
import { Button, Modal } from 'antd';
import LoungeForm from './LoungeForm';
import { useDispatch, useSelector } from 'react-redux';
import { getlounge } from '../../slices/vendor/Lounges';

function LoungesManagement() {
    const {vendor}=useSelector(state=>state.vendorauth);
    const {lounges}=useSelector(state=>state.loungevendor);
    
    const id = vendor.vendor_id;
    const dispatch=useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    useEffect(()=>{
        try{
        dispatch(getlounge(id));
        }catch(error){
            console.log(error)
        }
    },[dispatch])
    

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



            <VendorCard lounges={lounges}/>



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
