import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserFacilityDetail from '../../../components/user/UserFacilityDetail';
import { DatePicker, TimePicker, Space, message, Modal, Button } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { GetAvailableSlots, bookFacility} from '../../../slices/user/Facility';
import { useEffect } from 'react';
import { useState } from 'react';


function FacilityBooking() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [facilityPrice, setFacilityPrice] = useState(null);
    const { facilities } = useSelector(state => state.facilityuser);
    const { facilityId } = useSelector(state => state.facilityuser);
    const { loungeId } = useSelector(state => state.loungeuser);
    const { user_id } = useSelector(state => state?.userauth);
    const { bookedSlots } = useSelector(state => state?.facilityuser)
    
    console.log(bookedSlots)

    console.log(loungeId, user_id, facilityId);

   

    

    useEffect(()=>{
        if (selectedDate) {
            const date= selectedDate.toISOString().substring(0, 10);
            console.log(date)
            dispatch(GetAvailableSlots({date,loungeId,facilityId}));
            
        }
        
    },[selectedDate])
    


    const handleDateChange = (date) => {

        setSelectedDate(date);
    };

    const handleSlotClick = (hour) => {
        if (!selectedDate) {
            message.error('Please select date');
            return;
        }
       
        if (selectedSlots.includes(hour)) {
          setSelectedSlots(selectedSlots.filter((slot) => slot !== hour));
        } else {
            if(selectedSlots.length<6){
          setSelectedSlots([...selectedSlots, hour]);
            }
        }
   
      };

      if(selectedSlots.length==6){
         message.error('Max 6 slots are allowed')
      }

    

    const DisabledDate = (date) => {
        const currentDate = moment().startOf('day');

        if (date.isBefore(currentDate) || date.isAfter(currentDate.clone().add(4, 'days'))) {
            return true;
        }

        return false;
    };
    


    const handleBooking = () => {

        if (!user_id) {
            message.error("user is not loged in");
            return
        }
        
        if (!selectedDate) {
            message.error('Please select date');
            return;
        }

        if(selectedSlots.length===0){

            message.error('Please select atleast one slot')
            return 
        }

       
        const currentDateTime = moment();

        if (selectedDate.isBefore(currentDateTime, 'day')) {
            message.error('Selected date and time should be in the future');
            return;
        }

        
        const bookedDate = selectedDate.toISOString().substring(0, 10);
        const bookedSlots=selectedSlots;
        const bookedData = { bookedDate,bookedSlots};

        

        // dispatch(bookFacility({ user_id, loungeId, facilityId, bookedData })).then((response) => {
        //     console.log(response);

        //     setSelectedSlots([]);
        //     console.log('Booking successful');
        //     message.success('booking succesful');
        //     console.log('Date:', selectedDate.format('YYYY-MM-DD'));
        // })



    };

    
    
        // if (!user_id) {
        //     message.error("user is not loged in");
        //     return
        // }
        
        // if (!selectedDate) {
        //     message.error('Please select date');
        //     return;
        // }

        // if(selectedSlots.length===0){

        //     message.error('Please select atleast one slot')
        //     return 
        // }
   

    
   
    

    const facility = facilities?.filter(facility => facility._id === facilityId);
    const price=facility[0].facilityPrice;
    

    return (
        <div>
            <UserFacilityDetail facility={facility} key={facility?._id} />
            <div className='m-4 flex-col flex justify-center items-center'>
    
                    <DatePicker onChange={handleDateChange} changeOnBlur={true} disabledDate={DisabledDate} className='bg-blue-100 ' />

                <div className='w-full flex justify-between'>

                    <div className='w-2/3'>

                    <div className='flex flex-wrap m-3'>
                        {Array.from({ length: 24 }).map((_, index) => {
                            const hour = index.toString().padStart(2, '0');
                            const slotLabel = `${hour}:00-${hour}:59`;
                            const isSelected = selectedSlots.includes(hour);
                            const isDisabled = bookedSlots?.includes(hour);
                            let slotClassName;
                            if (isDisabled) {
                                
                                slotClassName = 'm-1 rounded-lg bg-red-500 w-full sm:w-1/3 md:w-1/6 lg:w-1/9 xl:w-1/12 p-2  ';
                                //   return null; 
                            } else {
                                slotClassName = `m-1 rounded-lg w-full sm:w-1/3 md:w-1/6 lg:w-1/9 xl:w-1/12 p-2 ${isSelected ? 'bg-blue-500' : 'bg-green-300'
                            }`;
                        }
                        
                        return (
                            <div
                            key={index}
                            className={slotClassName}
                            onClick={() => isDisabled ? '' : handleSlotClick(hour)}
                            >
                                    <div className='w-full h-20 sm:h-12 rounded-md flex justify-center items-center cursor-pointer'>
                                        {slotLabel}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                    <div className='w-1/3 h-[30rem] bg-green-200 p-3 rounded-lg m-1 flex justify-start overflow-auto'>
                        <div className='h-full w-full flex-col flex justify-around items-center'>
                            <div className='w-full h-full m-3 p-3 flex-col flex justify-between'>
                                <div>
                                    <h3 className='flex justify-between font-semibold mb-3 '>Amount Required for one Slot: <span>Rs {price}/-</span></h3>
                                    <h3 className='flex justify-between '>Booked Date: <span>{selectedDate?.toISOString().substring(0, 10)}</span></h3>
                                    <h3 className='flex justify-between mt-1'>Booked Slots: <span>{selectedSlots && selectedSlots.map((slot) => (
                                        <p key={slot}>{`${slot}:00-${slot}:59`}</p>))}</span></h3>
                                    <h3 className='flex justify-between mt-1'>No of Slots Booked:<span>{selectedSlots.length}</span> </h3>
                                </div>
                                <div>
                                    {selectedSlots.length > 0 ? <h3 className='flex justify-between  font-bold mt-14'>Total Amount to be Paid:<span>Rs {selectedSlots.length * price}/-</span> </h3> : null}
                                </div>
                            </div>
                            <button className=' bg-green-800 text-white  px-3 py-3 rounded-md' >proceed to payment</button>
                        </div>
                    </div>

                </div>
            
                {/* <button className='bg-green-800 text-white  px-3 py-3 rounded-md' onClick={showModal}>Book Facility</button> */}
            </div>
            
            {/* <Modal
                    title="Booking Details"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    className="w-96 scroll-"
                    footer={null}
                    bodyStyle={{height:'300px',overflow:'auto'}}
                    width={400}
                >

                   <div className='h-full w-full flex-col flex justify-around items-center'>
                    <div className='w-full h-full m-3 p-3'>
                        <h3 className='flex justify-between'>Booked Date: <p>{selectedDate?.toISOString().substring(0, 10)}</p></h3>
                        <h3 className='flex justify-between'>Booked Slots: <p>{selectedSlots && selectedSlots.map((slot) => (
                        <p key={slot}>{`${slot}:00-${slot}:59`}</p>))}</p></h3>
                        <h3 className='flex justify-between'>No of Slots Booked:<p>{selectedSlots.length}</p> </h3>
                        <h3 className='flex justify-between'>Total amount to be <p>{selectedSlots.length}</p> </h3>

                    </div>
                    <button className=' bg-green-800 text-white  px-3 py-3 rounded-md'>proceed to payment</button>
                   </div>
            </Modal> */}
        
        </div>
    )
}

export default FacilityBooking;


