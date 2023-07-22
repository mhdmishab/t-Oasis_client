
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserFacilityDetail from '../../../components/user/UserFacilityDetail';
import { DatePicker, TimePicker, Space, message, Modal, Button } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { BookingPayment, GetAvailableSlots, VerifyPayment, bookFacility } from '../../../slices/user/Facility';
import { useEffect } from 'react';
import { useState } from 'react';
import logo from '../../../assets/images/t-oasis logo.png'
import ReviewBox from '../../../components/user/ReviewBox';



function FacilityBooking() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const { facilities } = useSelector(state => state.facilityuser);
    const { facilityId } = useSelector(state => state.facilityuser);
    const { vendorId } = useSelector(state => state.loungeuser);
    const { loungeId } = useSelector(state => state.loungeuser);
    // const { user_id } = useSelector(state => state?.userauth);
    const { bookedSlots } = useSelector(state => state?.facilityuser);

    let updatedBookedSlots = [];
    let formattedselectedDate=null

    if (bookedSlots) {
        updatedBookedSlots = [...bookedSlots];
    }

    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    const disabledHoursInCurrentDay = Array.from({ length: currentHour + 1 }, (_, index) =>
        index.toString().padStart(2, '0')
    );

    if (selectedDate) {

        console.log(currentDate);
        console.log(selectedDate)

        let formattedcurrentDate = moment(currentDate).format('YYYY-MM-DD');

        const dateObj = new Date(selectedDate.$y, selectedDate.$M, selectedDate.$D);

        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        
        const formattedDate = `${year}-${month}-${day}`;

        formattedselectedDate = formattedDate;
        


        console.log(formattedcurrentDate);
        console.log(formattedselectedDate);

        if (formattedcurrentDate === formattedselectedDate) {
            console.log("here")
            updatedBookedSlots.push(...disabledHoursInCurrentDay);

        }
    }
    console.log(updatedBookedSlots);

    // console.log(disabledHoursInCurrentDay);

    // console.log(bookedSlots)


    const userToken = localStorage?.getItem('userToken');
    const parsedUserToken = JSON?.parse(userToken);
    const user_id = parsedUserToken?.userId;

    console.log(vendorId, user_id, facilityId);


    const initPayment = async (datas) => {
        const options = {
            key: "rzp_test_TI7s3WQB1jrFOA",
            amount: datas.amount,
            currency: datas.currency,
            name: facility[0].facilityName,
            description: "Booking Payment",
            image: logo,
            order_id: datas.id,
            handler: async (response) => {
                try {

                    console.log("inside hacdler", response);
                    const data = await dispatch(VerifyPayment({ response }));
                    console.log(data);
                    if (data) {
                        const amount_paid = datas.amount / 100;
                        const {
                            razorpay_order_id,
                            razorpay_payment_id,
                            razorpay_signature } = response;
                        const bookedDate = selectedDate.toISOString().substring(0, 10);
                        const bookedSlots = selectedSlots;
                        const bookedData = { bookedDate, bookedSlots, razorpay_order_id, razorpay_payment_id, amount_paid };


                        dispatch(bookFacility({ user_id, vendorId, loungeId, facilityId, bookedData })).then((response) => {
                            console.log(response);

                            setSelectedSlots([]);
                            console.log('Booking successful');
                            message.success('booking and payment successful');
                            console.log('Date:', selectedDate.format('YYYY-MM-DD'));

                            navigate('/profile');

                        })

                    }
                } catch (error) {
                    console.log(error)
                }
            },

        }
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }


    useEffect(() => {
        if (selectedDate) {
            const date = selectedDate.toISOString().substring(0, 10);
            console.log(date)
            dispatch(GetAvailableSlots({ date, vendorId, facilityId }));

        }

    }, [selectedDate])



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
            if (selectedSlots.length < 6) {
                setSelectedSlots([...selectedSlots, hour]);
            }
        }

    };

    if (selectedSlots.length == 6) {
        message.error('Max 6 slots are allowed')
    }



    const DisabledDate = (date) => {
        const currentDate = moment().startOf('day');

        if (date.isBefore(currentDate) || date.isAfter(currentDate.clone().add(4, 'days'))) {
            return true;
        }

        return false;
    };



    const handleBooking = async () => {

        if (!user_id) {
            message.error("user is not loged in");
            return
        }

        if (!selectedDate) {
            message.error('Please select date');
            return;
        }

        if (selectedSlots.length === 0) {

            message.error('Please select atleast one slot')
            return
        }


        const currentDateTime = moment();

        if (selectedDate.isBefore(currentDateTime, 'day')) {
            message.error('Selected date and time should be in the future');
            return;
        }



        const numberOfSlots = selectedSlots.length;
        console.log(numberOfSlots);


        const response = await dispatch(BookingPayment({ facilityId, numberOfSlots }));
        console.log(response.payload.data.data);

        initPayment(response.payload.data.data);


    };


    const facility = facilities?.filter(facility => facility._id === facilityId);
    const price = facility[0]?.facilityPrice;


    return (
        <div>
            <UserFacilityDetail facility={facility} key={facility?._id} />
            <div className='m-4 flex flex-col justify-center items-center'>

                <DatePicker onChange={handleDateChange} changeOnBlur={true} disabledDate={DisabledDate} className='bg-blue-100 ' />

                <div className='w-full flex flex-col sm:flex-row justify-between'>
                    <div className='w-full sm:w-2/3'>
                        <div className='flex flex-wrap m-3'>
                            {Array.from({ length: 24 }).map((_, index) => {
                                const hour = index.toString().padStart(2, '0');
                                const slotLabel = `${hour}:00-${hour}:59`;
                                const isSelected = selectedSlots.includes(hour);
                                const isDisabled = updatedBookedSlots?.includes(hour);

                                let slotClassName;
                                if (isDisabled) {
                                    slotClassName = 'm-1 rounded-lg bg-red-500 w-full sm:w-1/3 md:w-1/6 lg:w-1/9 xl:w-1/12 p-2';
                                } else {
                                    slotClassName = `m-1 rounded-lg w-full sm:w-1/3 md:w-1/6 lg:w-1/9 xl:w-1/12 p-2 ${isSelected ? 'bg-blue-500' : 'bg-green-300'}`;
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
                    <div className="w-full md:w-1/3 bg-green-200 p-3 rounded-lg m-1 flex flex-col justify-start overflow-auto">
                        <div className="h-full flex flex-col justify-around items-center">
                            <div className="w-full m-3 p-3 flex flex-col justify-between">
                                <div>
                                    <h3 className="flex justify-between font-semibold mb-3">
                                        Amount Required for one Slot: <span>Rs {price}/-</span>
                                    </h3>
                                    <h3 className="flex justify-between">
                                        Booked Date: <span>{formattedselectedDate}</span>
                                    </h3>
                                    <h3 className="flex justify-between mt-1">
                                        Booked Slots:
                                        <span>
                                            {selectedSlots &&
                                                selectedSlots.map((slot) => (
                                                    <p key={slot}>{`${slot}:00-${slot}:59`}</p>
                                                ))}
                                        </span>
                                    </h3>
                                    <h3 className="flex justify-between mt-1">
                                        No of Slots Booked:<span>{selectedSlots.length}</span>{" "}
                                    </h3>
                                </div>
                                <div>
                                    {selectedSlots.length > 0 ? (
                                        <h3 className="flex justify-between font-bold mt-14">
                                            Total Amount to be Paid:<span>Rs {selectedSlots.length * price}/-</span>
                                        </h3>
                                    ) : null}
                                </div>
                            </div>
                            <button className="bg-green-800 text-white px-3 py-3 rounded-md" onClick={handleBooking}>
                                Pay Now
                            </button>
                        </div>
                    </div>

                </div>

            </div>
            <div className='w-full flex justify-start'>
                <ReviewBox facility={facility}/>
            </div>
        </div>
    );

}

export default FacilityBooking;






