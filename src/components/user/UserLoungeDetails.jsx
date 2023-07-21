// import React from 'react';

// function LoungeDetails({lounge}) {


//   return (
//     <>
   
//         <div className="flex text-center" key={lounge._id}>
//           <div className="w-1/2 p-4">
//             <h2 className="text-2xl text-green-700 font-bold mb-2"> {lounge[0].loungeName}</h2>
//             <br />
//             <p className="text-lg mb-2 font-semibold"> {lounge[0].loungeLocation}</p>
//             <p className="text-lg font-semibold"> {lounge[0].loungeDistrict}</p>
//             <p className="text-lg font-semibold">{lounge[0].loungeState}</p>
          
//           </div>
//         </div>

    
//         <div className="flex flex-col mt-4" key={lounge[0]._id}>
       
//           <div className="bg-gray-200 mt-2 p-4 rounded-md">
//             <p className="text-lg">{lounge[0].loungeDescription}</p>
//           </div>
//         </div>
 
//     </>
//   );
// }

// export default LoungeDetails;

import React from 'react';

function LoungeDetails({ lounge }) {
  return (
    <>
      <div className="flex flex-col items-center  md:flex-row text-center">
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl text-green-700 font-bold mb-2"> {lounge[0].loungeName}</h2>
          <br />
          <p className="text-lg mb-2 font-semibold"> {lounge[0].loungeLocation}</p>
          <p className="text-lg font-semibold"> {lounge[0].loungeDistrict}</p>
          <p className="text-lg font-semibold">{lounge[0].loungeState}</p>
        </div>

        <div className="w-full md:w-1/2 p-4">
          <div className="bg-gray-200 mt-2 p-4 rounded-md">
            <p className="text-lg">{lounge[0].loungeDescription}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoungeDetails;
