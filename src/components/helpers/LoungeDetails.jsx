import React from 'react';

function LoungeDetails({ loungeId, lounges }) {
  const filteredLounge = lounges?.filter((lounge) => lounge._id === loungeId);

  return (
    <>
      {filteredLounge?.map((lounge) => (
        <div className="flex text-center" key={lounge._id}>
          <div className="w-1/2">
            <img
              src={lounge.loungeImages[0]?.url}
              alt="Lounge"
              className="w-full h-full rounded-md object-cover custom-image"
            />
          </div>
          <div className="w-1/2 p-4">
            <h2 className="text-2xl text-green-700 font-bold mb-2">Lounge Name: {lounge.loungeName}</h2>
            <br />
            <p className="text-lg mb-2 font-semibold">Lounge Location: {lounge.loungeLocation}</p>
            <p className="text-lg font-semibold">Lounge Distict: {lounge.loungeDistrict}</p>
            <p className="text-lg font-semibold">Lounge State: {lounge.loungeState}</p>
            {/* <p className="text-lg mb-2 font-semibold">Hostel Location: {lounge.location}</p> */}
          </div>
        </div>
      ))}
      {filteredLounge?.map((lounge) => (
        <div className="flex flex-col mt-4" key={lounge._id}>
          <h3 className="text-lg font-bold mb-2 text-green-700">Description</h3>
          <div className="bg-gray-200 mt-2 p-4 rounded-md">
            <p className="text-lg">{lounge.loungeDescription}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default LoungeDetails;

