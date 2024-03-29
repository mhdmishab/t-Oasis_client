import React, { useEffect, useState } from 'react'
import VendorCard from './VendorCard'
import { Button, Modal } from 'antd';
import LoungeForm from './LoungeForm';
import { useDispatch, useSelector } from 'react-redux';
import { getlounge } from '../../slices/vendor/Lounges';


function LoungesManagement() {
    const dispatch=useDispatch();
    const {isLoggedInVendor}=useSelector(state=>state.vendorauth);
    const {lounges}=useSelector(state=>state.loungevendor);


    const vendorToken = localStorage.getItem('vendorToken');
    const parsedVendorToken = JSON.parse(vendorToken);
    const id = parsedVendorToken?.vendorId;

    

   
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    useEffect(()=>{
        try{
            if(isLoggedInVendor){
        dispatch(getlounge(id));
        setIsModalOpen(false);
        
            }
        }catch(error){
            console.log(error)
        }
    },[dispatch,isLoggedInVendor,id])
    

    const handleCancel = () => {
        setIsModalOpen(false);
    };




    return (
        <div className='flex flex-wrap m-2'>
            <Button className='w-44 h-44 m-16 shadow-lg flex-col  items-center cursor-pointer pt-9 text-md' onClick={showModal} ><svg fill="none" stroke="gray" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" className='' /> 
            </svg>Add Lounge</Button>



            <VendorCard lounges={lounges} vendorId={id}/>



                <Modal
                    title="Add Lounge"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    className="w-96 scroll-"
                    footer={null}
                    bodyStyle={{height:'525px',overflow:'auto'}}
                    width={1000}
                >

                   <LoungeForm />
                </Modal>
        </div>
    )
}

export default LoungesManagement
