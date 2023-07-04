import React from 'react'

function FacilityDetails({facilityId,facilities}) {
    console.log(facilities,facilityId)
    const filteredFacility = facilities?.filter((facility) => facility._id === facilityId);

    return (
      <>
        {filteredFacility?.map((facility) => (
          <div className="flex text-center" key={facility._id}>
            <div className="w-1/2">
              <img
                src={facility.facilityImage?.url}
                alt="facility"
                className="w-96 h-80 rounded-md object-cover custom-image"
              />
            </div>
            <div className="w-1/2 p-4">
              <h2 className="text-2xl text-green-700 font-bold mb-2">Facility Name: {facility.facilityName}</h2>
              <br />
              <p className="text-lg mb-2 font-semibold"> Tokens Facility Needed: {facility.facilityToken}</p>
              <p className="text-lg font-semibold">No of Facility Slots: {facility.facilitySlots}</p>
           
            </div>
          </div>
        ))}
        {filteredFacility?.map((facility) => (
          <div className="flex flex-col mt-4" key={facility._id}>
            <h3 className="text-lg font-bold mb-2 text-green-700">Description</h3>
            <div className="bg-gray-200 mt-2 p-4 rounded-md">
              <p className="text-lg">{facility.facilityDescription}</p>
            </div>
          </div>
        ))}
      </>
    );
  }

export default FacilityDetails
