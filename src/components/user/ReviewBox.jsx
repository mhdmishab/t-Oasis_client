import React from 'react';
import { FaStar } from 'react-icons/fa';

function ReviewBox({ facility }) {
  console.log(facility);

  return (
    <div className="bg-slate-200 rounded-lg p-6 shadow-md w-1/2  mx-4">
      <h2 className="text-xl font-bold mb-4 text-gray-500 flex justify-center  ">Reviews</h2>
      <div>
        {facility[0].reviews?.map((review, index) => (
          <div key={index} className="mb-8 border-b pb-4 ">
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, starIndex) => {
                const starNumber = starIndex + 1;
                return (
                  <FaStar
                    key={starNumber}
                    className="w-5 h-5 fill-current text-yellow-400"
                    color={starNumber <= review.rating ? '#ffc107' : '#e4e5e9'}
                  />
                );
              })}
              <span className="ml-2 text-gray-600">Rating: {review.rating}</span>
            </div>
            <div>
              <p className="text-gray-800">{review.review_text}</p>
            </div>
            <span>---------------------------------------------------------------------------------------------------------</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewBox;


