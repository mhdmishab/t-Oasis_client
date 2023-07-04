import React, { useState } from 'react'
import LoungeDetails from '../../../components/helpers/LoungeDetails'
import AdminSideBar from '../../../components/admin/AdminSideBar'
import { useLocation, useNavigate } from 'react-router-dom'
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { approveLounge, rejectLounge } from '../../../slices/admin/Lounges';

function LoungeApproval() {
    const location=useLocation();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {loungeId,lounges}=location.state;
    console.log(loungeId,lounges);

    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

    
    const showRejectModal = () => {
        setIsRejectModalOpen(true);
    };

    const showApproveModal = () => {
        setIsApproveModalOpen(true);
    };

    const handleRejectCancel = () => {
        setIsRejectModalOpen(false);
    };

    const handleApproveCancel = () => {
        setIsApproveModalOpen(false);
    };

    const handleReject = () => {
        try{

            dispatch(rejectLounge(loungeId)).then((response)=>{
                console.log(response);
            })
            
            setIsRejectModalOpen(false);
            navigate('/admin/lounges');
        }catch(error){
            console.log(error);
        }
        

    }
    const handleApprove = () => {
        try{

            dispatch(approveLounge(loungeId)).then((response)=>{
                console.log(response);
            })
            
            setIsApproveModalOpen(false);
            navigate('/admin/lounges');
        }catch(error){
            console.log(error);
        }
        

    }




  return (
    <section className='flex gap-6'>
      
       
    <AdminSideBar/>
 
 <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
      <LoungeDetails loungeId={loungeId} lounges={lounges}/>
      <div className='pt-10 flex justify-between'>
        <button className='px-3 py-3 rounded-md bg-red-400 text-sm text-white' onClick={showRejectModal} >Reject</button>
        <button className='px-3 py-3 rounded-md bg-green-400 text-sm text-white' onClick={showApproveModal}>Approve</button>
      </div>
   
 </div>

          <Modal
              title=""
              open={isRejectModalOpen}
              onCancel={handleRejectCancel}
              className=""
              footer={null}
          >


              <div className="flex-col items-center ">
                  <p>
                      Are you sure you wanna Reject this lounge
                  </p>
                  <button
                      type="submit"
                      className="px-5 py-1 rounded-md bg-red-700 text-white hover:bg-red-300 mt-5"
                      onClick={handleReject}
                  >
                      Reject
                  </button>
              </div>

          </Modal>
          <Modal
              title=""
              open={isApproveModalOpen}
              onCancel={handleApproveCancel}
              className=""
              footer={null}
          >


              <div className="flex-col items-center ">
                  <p>
                      Are you sure you wanna Approve this lounge
                  </p>
                  <button
                      type="submit"
                      className="px-5 py-1 rounded-md bg-green-700 text-white hover:bg-green-300 mt-5"
                      onClick={handleApprove}
                  >
                      Approve
                  </button>
              </div>

          </Modal>

</section>
  )
}

export default LoungeApproval
