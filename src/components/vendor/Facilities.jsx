import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FacilityForm from './FacilityForm';
import { getfacilities } from '../../slices/vendor/Facility';
import FacilityCard from '../helpers/FacilityCard';

function Facilities() {
  const navigate=useNavigate();
    const dispatch=useDispatch();
    // const id=useSelector(state=>state.loungevendor).vendor_id;
    const facilities=useSelector(state=>state.facilityvendor).facilities;

    const vendorToken = localStorage.getItem('vendorToken');
    const parsedVendorToken = JSON.parse(vendorToken);
    const id = parsedVendorToken?.vendorId;

    

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    useEffect(()=>{
        try{
           
        dispatch(getfacilities(id));
            }
      catch(error){
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
        <div className='flex flex-wrap'>
            <Button className='w-44 h-44 mr-7 mt-10 shadow-lg flex-col  items-center cursor-pointer pt-9 text-md' onClick={showModal} ><svg fill="none" stroke="gray" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" className='' /> 
            </svg>Add Facility</Button>



       
          <FacilityCard facilities={facilities} vendorId={id} />
     



                <Modal
                    title="Add Facility"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    className="w-96 scroll-"
                    footer={null}
                    bodyStyle={{height:'525px',overflow:'auto'}}
                    width={1000}
                >

                   <FacilityForm/>
                </Modal>
        </div>
    )
}


export default Facilities



