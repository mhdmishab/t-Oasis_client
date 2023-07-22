import React from 'react'
import { FaStar } from 'react-icons/fa';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RatingForm({setRating,setRatingText}) {
    const [hoverRating, setHoverRating] = useState(null);
    const navigate=useNavigate();

    const formik = useFormik({
      initialValues: {
        rating: 0,
        reviewText: '',
      },
      onSubmit: (values) => {
        // Handle form submission, for example, send the rating and review text to the server
        console.log('Rating:', values.rating);
        console.log('Review Text:', values.reviewText);
        setRating(values.rating);
        setRatingText(values.reviewText);
        
      },
    });
  
    const handleRatingChange = (rating) => {
      formik.setFieldValue('rating', rating);
    };
  
    const handleTextChange = (event) => {
      formik.handleChange(event);
    };
  
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-xl  overflow-hidden mt-5">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            {/* <img className="h-full w-full object-cover md:w-96" src={roomData?.url} alt="Review" /> */}
          </div>
          <div className="p-8 flex flex-col justify-between">
            <div>
              {/* <h2 className="text-lg font-semibold">{roomData?.title}</h2>
              <p className="mt-2 text-gray-600">{roomData?.description}</p> */}
            </div>
            <div className="flex items-center mt-4">
              <div className="ml-2">
                {[...Array(5)].map((_, index) => {
                  const currentRating = index + 1;
                  return (
                    <label key={currentRating} className="text-yellow-400">
                      <input
                        type="radio"
                        name="rating"
                        className="hidden"
                        value={currentRating}
                        onChange={() => handleRatingChange(currentRating)}
                      />
                      <FaStar
                        className="inline-block w-6 h-6 fill-current"
                        color={currentRating <= (formik.values.rating || hoverRating) ? '#ffc107' : '#e4e5e9'}
                        onMouseEnter={() => setHoverRating(currentRating)}
                        onMouseLeave={() => setHoverRating(null)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            {formik.errors.rating && formik.touched.rating && (
              <div className="text-red-500 mt-2">{formik.errors.rating}</div>
            )}
            <div>
              <label htmlFor="reviewTextArea" className="block text-sm font-medium text-gray-700 mt-4">
                Review Text
              </label>
              <textarea
                id="reviewTextArea"
                name="reviewText"
                className="mt-1 block none w-full md:w-[27rem] border h-[10rem] bg-white border-gray-950 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Write your review here..."
                value={formik.values.reviewText}
                onChange={handleTextChange}
              ></textarea>
              {formik.errors.reviewText && formik.touched.reviewText && (
                <div className="text-red-500 mt-2">{formik.errors.reviewText}</div>
              )}
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-20 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="submit"
                onClick={formik.handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default RatingForm
