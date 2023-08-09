

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetDashboard } from '../../slices/vendor/Lounges';
import DashboardCard from '../helpers/DashboardCard'
import LineChart from '../helpers/LineChart'
import { FaStar } from 'react-icons/fa';
import SalesReport from '../helpers/SalesReport';




function Dashboard() {

  const vendorToken = localStorage.getItem('vendorToken');
  const parsedVendorToken = JSON.parse(vendorToken);
  const id = parsedVendorToken?.vendorId;
  const {chartData}=useSelector(state=>state?.loungevendor)
  
  const dispatch=useDispatch();
  
  useEffect(()=>{
    dispatch(GetDashboard({id})).then((response)=>{
      console.log(response)
    })
  },[id,dispatch])

  console.log(chartData);


  const statsData = [
    { title: "Average Lounge Rating", value:Math.floor(chartData?.avgLoungeRating[0]?.averageRating) , icon:<svg className='w-8 h-8' fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>, description: (
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, index) => {
            const starNumber = index + 1;
            return (
              <FaStar
                key={starNumber}
                className="w-4 h-4 fill-current text-yellow-400"
                color={Math.floor(chartData?.avgLoungeRating[0]?.averageRating) >= starNumber ? '#ffc107' : '#e4e5e9'}
              />
            );
          })}
        </div>
      ) },
    { title: "Total Revenue", value:`₹${chartData?.totalRevenue[0]?.totalRevenue}`, icon: <svg  className='w-8 h-8' fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
  </svg>, description: "" },
    { title: "Pending bookings", value: chartData?.pendingbookingnumbers, icon: <svg fill="none" className='w-8 h-8' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
  </svg>, description: `${chartData?.compleatedbookingnumbers} compleated bookings` },
    { title: "Active Lounges", value: chartData?.loungenumbers, icon: <svg className='w-8 h-8' fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>, description:`${chartData?.pendingloungenumbers} Pending` },
  ];


  const allsalesReport=chartData?.bookings;

  return (
    <>
      <div className="flex flex-wrap justify-between ">
        {statsData.map((d, k) => (
          <DashboardCard key={k} {...d} colorIndex={k}/>
        ))}
      </div>
      

      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <LineChart datas={chartData?.bookingChart} title={"Monthly Bookings"}/>
        <LineChart datas={chartData?.revenueChart} title={"Monthly Revenue"}/>
        {/* <BarChart /> */}
      </div>
      

      <div>
        <SalesReport allsalesReport={allsalesReport}/>
      </div>
    </>
  );
}

export default Dashboard;










