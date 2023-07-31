import React from 'react';

function DashboardCard({ title, icon, value, description, colorIndex }) {


  return (
    <div className=" shadow-md  h-44 w-64 m-2 flex items-center justify-center">
      <div className="">
        <div className="text-purple-800">
          {icon}
        </div>
        <div className='flex justify-around '>

            <div className=" text-slate-300 text-sm mr-10 mt-2 mb-2">{title}</div>
            <div className="text-purple-800 text-md">{value}</div>
        </div>
        <div className="text-sm ">{description}</div>
      </div>
    </div>
  );
}

export default DashboardCard;



