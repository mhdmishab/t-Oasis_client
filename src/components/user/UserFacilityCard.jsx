

// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { setFacilityId } from '../../slices/user/Facility';

// function UserFacilityCard({ facility }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleInsideCard = (facilityId) => {
//     try {
//       dispatch(setFacilityId({ id: facilityId }));
//       navigate('/facilitybooking');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div
//       onClick={() => handleInsideCard(facility._id)}
//       className="cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4  p-2"
//     >
//       <div className="w-full max-w-sm mx-auto bg-white rounded-md overflow-hidden shadow-md">
//         <div className="w-full h-36">
//           <img
//             src={facility.facilityImage?.url}
//             className="object-cover w-full h-full"
//             alt="facility"
//           />
//         </div>
//         <div className="px-4 py-3 md:px-6">
//           <h5 className="text-base  font-semibold truncate">
//             {facility.facilityName}
//           </h5>
         
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserFacilityCard;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFacilityId } from '../../slices/user/Facility';
import { FaStar } from 'react-icons/fa';

function UserFacilityCard({lounge,facility}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  

  const handleInsideCard = (facilityId) => {
    try {
      dispatch(setFacilityId({ id: facilityId }));
      navigate('/facilitybooking');
    } catch (error) {
      console.log(error);
    }
  };


  const ratingsFacility = facility.reviews?.map((review) => review.rating);
  const totalRatingFacility = ratingsFacility?.reduce((sum, rating) => sum + rating, 0) || 0;
  const averageRatingFacility = totalRatingFacility / (ratingsFacility?.length || 1);
  const outOfFiveRatingFacility = Math.floor((averageRatingFacility / 5) * 5);


  
  const ratingsLounge = lounge[0].reviews?.map((review) => review.rating);
  const totalRatingLounge = ratingsLounge?.reduce((sum, rating) => sum + rating, 0) || 0;
  const averageRatingLounge = totalRatingLounge / (ratingsLounge?.length || 1);
  const outOfFiveRatingLounge = Math.floor((averageRatingLounge / 5) * 5);

  
  const outOfFiveRating = Math.floor((outOfFiveRatingFacility + outOfFiveRatingLounge) / 2);


  return (
    <div
      onClick={() => handleInsideCard(facility._id)}
      className="cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4  p-2"
    >
      <div className="w-full max-w-sm mx-auto bg-white rounded-md overflow-hidden shadow-md">
        <div className="w-full h-36">
          <img
            src={facility.facilityImage?.url}
            className="object-cover w-full h-full"
            alt="facility"
          />
        </div>
        <div className="px-4 py-3 md:px-6">
          <h5 className="text-base  font-semibold truncate">
            {facility.facilityName}
          </h5>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => {
              const starNumber = index + 1;
              return (
                <FaStar
                  key={starNumber}
                  className="w-4 h-4 fill-current text-yellow-400"
                  color={starNumber <= outOfFiveRating ? '#ffc107' : '#e4e5e9'}
                />
              );
            })}
            {/* <span className="ml-1 text-gray-600">{outOfFiveRating}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserFacilityCard;


