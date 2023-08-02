
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoungeId, setVendorId } from '../../slices/user/Lounges';
import { FaStar } from 'react-icons/fa';

function UserLoungeCard({ lounge }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInsideCard = (vendorId, loungeId) => {
    try {
      dispatch(setVendorId({ id: vendorId }));
      dispatch(setLoungeId({ id: loungeId }));
      navigate('/lounge');
    } catch (error) {
      console.log(error);
    }
  };

  const ratings = lounge.reviews?.map(review => review.rating);
  const totalRating = ratings?.reduce((sum, rating) => sum + rating, 0) || 0;
  const averageRating = totalRating / (ratings?.length || 1);
  const outOfFiveRating = Math.floor((averageRating / 5) * 5);



  return (
    <div
      onClick={() => handleInsideCard(lounge.vendor_id, lounge._id)}
      className="cursor-pointer w-full sm:w-1/2 md:w-1/3  p-2"
    >
      <div className="w-full max-w-sm mx-auto bg-white rounded-md overflow-hidden shadow-md">
        <div className="w-full h-36">
          <img
            src={lounge.loungeImages[0]?.url}
            className="object-cover w-full h-full"
            alt="Lounge"
          />
        </div>
        <div className="px-4 py-3 md:px-6">
          <h5 className="text-base  font-semibold truncate">
            {lounge.loungeName} || {lounge.loungeDistrict}
          </h5>
          <p className="mt-1 text-sm md:text-base  text-gray-600">
            {lounge.loungeState}
          </p>
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

export default UserLoungeCard;






