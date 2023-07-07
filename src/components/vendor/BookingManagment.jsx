import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetBookings } from '../../slices/vendor/Bookings';
import { Pagination } from 'antd';
import moment from 'moment';

function BookingManagment() {


  const vendorToken = localStorage.getItem('vendorToken');
    const parsedVendorToken = JSON.parse(vendorToken);
    const id = parsedVendorToken?.vendorId;

  const dispatch=useDispatch();
  const {bookings}=useSelector(state=>state.bookingvendor);
  const [selectedStatus, setSelectedStatus] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, settotalItems] = useState(1);
  

  const filteredBookings = selectedStatus
    ? bookings.filter((booking) => booking.status === selectedStatus)
    : bookings;



  const handlePageChange = (pageNumber,pagesize) => {
    console.log(pageNumber,pagesize);
    setCurrentPage(pageNumber);
  };

  

  const handleStatusFilter = (e) => {
    setSelectedStatus(e.target.value);
  };

  useEffect(()=>{
    if(currentPage){
         dispatch(GetBookings({id,currentPage}));
        
        
    }
    if(bookings?.length>1){
      console.log(bookings);
      console.log(bookings.length)

      settotalItems((currentPage+1)*1)
  
    }
   
  },[currentPage])




                                                             
  return (
    <>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs bg-gray-50 text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              User Mail
            </th>
            <th scope="col" className="px-6 py-3">
              Lounge
            </th>
            <th scope="col" className="px-6 py-3">
              Place
            </th>
            <th scope="col" className="px-6 py-3">
              Facility
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Slots
            </th>
            <th scope="col" className="px-6 py-3">
              Amount Paid
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={handleStatusFilter}
                >
                  <option value="">All</option>
                  <option value="booked">Booked</option>
                  <option value="cancelled">Cancelled</option>
                  
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
        {filteredBookings?.map((booking, index) => (
              <tr key={index} className="bg-white border-b cursor-pointer">
               
                
                <td className="px-6 py-4">{booking.user_id.email}</td>
                <td className="px-6 py-4">{booking.lounge_id.loungeName}</td>
                <td className="px-6 py-4">{booking.lounge_id.loungeDistrict}</td>
                <td className="px-6 py-4">{booking.facility_id.facilityName}</td>
                <td className="px-6 py-4">{moment(booking.booked_date).format("DD/MM/YY")}</td>
                <td className="px-6 py-4">{booking.booked_slots?.join(', ')}</td>
                <td className="px-6 py-4">{booking.amount_paid}</td>
                <td className="px-6 py-4">{booking.status}</td>
              </tr>
            ))}
         
        </tbody>
      </table>
    </div>
    <Pagination className='pt-5' total={bookings?.length<1?totalItems-1:totalItems}  pageSize={1} onChange={handlePageChange}/>
    
  </>
  )
}

export default BookingManagment
