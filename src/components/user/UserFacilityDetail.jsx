// import React from 'react'

// function UserFacilityDetail({facility}) {
//     console.log(facility)
//   return (
//        <div className="flex-col flex justify-center  items-center p-16">
//           <div className="w-96 h-48 mt-3 " >
//             <img
//               src={facility[0].facilityImage?.url}
//               alt="facility"
//               className="w-full h-full  object-cover custom-image"
//             />
//           </div>
          
       
//           <div className="bg-blue-200 p-4 rounded-md  h-40 w-[60rem]">
//             <p className="text-lg">{facility[0].facilityDescription}</p>
//           </div>
    
//         </div>

//   )
// }

// export default UserFacilityDetail

import React from 'react';

function UserFacilityDetail({ facility }) {
  console.log(facility);

  return (
    <div className="flex flex-col justify-center items-center p-6 md:p-16">
      <div className="w-72 md:w-96 h-48 mt-3">
        <img
          src={facility[0].facilityImage?.url}
          alt="facility"
          className="w-full h-full object-cover custom-image"
        />
      </div>

      <div className="bg-white-200 text-center p-4 rounded-md mt-4 md:mt-0 w-full md:w-[60rem]">
        <p className="text-lg">{facility[0].facilityDescription}</p>
      </div>
    </div>
  );
}

export default UserFacilityDetail;

