import React from 'react'

function UserFacilityDetail({facility}) {
    console.log(facility)
  return (
       <div className="flex-col flex justify-center items-center p-16">
          <div className="w-96 h-48 mt-3" >
            <img
              src={facility[0].facilityImage?.url}
              alt="facility"
              className="w-full h-full rounded-md object-cover custom-image"
            />
          </div>
          
       
          <div className="bg-blue-200 p-4 rounded-md -mt-2">
            <p className="text-lg">{facility[0].facilityDescription}</p>
          </div>
    
        </div>

  )
}

export default UserFacilityDetail
