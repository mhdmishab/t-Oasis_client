import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getnewfacility, managestatusfacility } from '../../slices/admin/Facility';
import { Modal } from 'antd';
import { useState } from 'react';
import FacilitytypeForm from './FacilitytypeForm';
import { useNavigate } from 'react-router-dom';

function FacilitytypesManagment() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {newfacilitys}=useSelector(state=>state.facilityadmin);
    const [statusUpdated,setStatusUpdated]=useState(false);

    useEffect(()=>{
        dispatch(getnewfacility());
        if(statusUpdated){
          setStatusUpdated(false)
        }    
    },[dispatch,statusUpdated])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    
    const handleFacilityBlock=async(id)=>{
        console.log(id);
        const response=await dispatch(managestatusfacility(id));
        if(response.payload?.data?.success){
            setStatusUpdated(true);
            navigate('/admin/facilities');
        }

    }
  return (
    <>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <button className='px-3 py-3 bg-green-600 rounded-md text-white mb-3 ' onClick={showModal}>Add New Facility</button>
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs bg-gray-50 text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              Facility Name
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
           
            
          </tr>
        </thead>
        <tbody>
          {newfacilitys?.map((facility, index) => (
            <tr key={index} className="bg-white border-b cursor-pointer">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {facility.facilitytypeName}
              </th>
              
              <td onClick={()=>handleFacilityBlock(facility._id)} className="px-6 py-4">{facility.isBlocked?<button className='px-3 py-3 bg-red-400 rounded-md text-white'>Blocked</button>:
              <button  className='px-3 py-3 rounded-md bg-green-400 text-white'>Active</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Modal
    title="Add New Facility"
    open={isModalOpen}
    onCancel={handleCancel}
    className="w-96 scroll-"
    footer={null}
    bodyStyle={{height:'200px',overflow:'auto'}}
    width={600}
    
    
    
    >
        <FacilitytypeForm/>

    </Modal>
  </>
  )
}

export default FacilitytypesManagment
