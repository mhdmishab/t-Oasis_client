import imgPreview from '../../assets/images/signupbg.jpg'
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addfacility } from '../../slices/vendor/Facility';

function FacilityForm() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    // const {loungeId}=useSelector(state=>state.loungevendor);
    const vendorId=useSelector((state)=>state.facilityvendor).vendor_id;
    const {facilitytypes}=useSelector(state=>state.facilityvendor);
    console.log(facilitytypes);

    const formik = useFormik({
      initialValues: {
        facilityToken: '',
        facilityPrice: '',
        facilityName: '',
        facilityImage: null,
        facilityDescription: ''
      },
      validationSchema: Yup.object({
        facilityToken: Yup.number().min(1).max(3)
          .required('Required')
          .positive('Should be a positive number'),
        facilityPrice: Yup.number().min(1).max(4000)
          .required('Required')
          .positive('Should be a positive number'),
        facilityName: Yup.string()
          .min(4, 'Name must be 4 characters or more')
          .max(17, 'Name must be 17 characters or less')
          .required('Required'),
        facilityDescription: Yup.string().min(5).required('Required'),
        facilityImage: Yup.mixed()
          .required('Document is required')
          .test('FILE_SIZE', 'Too big!', (value) => value && value.size < 1024 * 1024)
          .test('FILE_TYPE', 'Invalid', (value) =>
            value && ['image/png', 'image/jpeg'].includes(value.type)
          ).test('FILE_DIMENSIONS', 'Invalid image dimensions supported width and height is lessthan 5000*4000', (value) => {
            if (!value) {
              return false;
            }
            return new Promise((resolve, reject) => {
              const image = new Image();
              image.src = URL.createObjectURL(value);
              image.onload = function () {
                const { width, height } = this;
                URL.revokeObjectURL(image.src);
                if (width && height && width <= 5000 && height <= 4000) {
                  resolve(true);
                } else {
                  reject(false);
                }
              };
            });
          }),
        facilityDescription: Yup.string().required('Required')
      }),
      onSubmit: (facilityData) => {
        console.log(facilityData);
        const {facilityName,facilityToken,facilityPrice,facilityDescription,facilityImage}=facilityData;

        const data = new FormData();
          data.append('facilityName', facilityName);
          data.append('facilityToken', facilityToken);
          data.append('facilityPrice', facilityPrice);
          data.append('facilityDescription', facilityDescription);
          data.append('image', facilityImage);
        
      
          console.log(data);
          console.log("checking",vendorId);
          
          dispatch(addfacility({data:data,vendorId:vendorId})).then((response)=>{
            console.log(response,"response of facility dispatch")
            navigate('/manager/dashboard');

          }).catch((err)=>{
            console.log(err);
          })
          

      },
    });
  
    return (
      <div className="bg-[#ffff] py-4 pb-16">
        <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg pb-10 px-10 py-10">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap">
              <div className="w-full sm:w-1/2 pr-4">
                <div className="mb-4 aspect-w-1 aspect-h-1">
                  <label className="text-gray-800 text-sm">Images:</label>
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="object-cover rounded-lg"
                      style={{ width: "1425px", height: "300px" }}
                    />
                  ) : (
                    <div className="mb-4 aspect-w-1 aspect-h-1 mt-4 rounded-sm">
                      <img src={imgPreview} alt="" />
                    </div>
                  )}
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      formik.setFieldValue("facilityImage", file);
                      setImagePreview(URL.createObjectURL(file));
                    }}
                    className="py-2 px-4 border border-gray-700 rounded bg-white w-full text-sm"
                  />
                </div>
                {formik.touched.facilityImage && formik.errors.facilityImage && (
                  <p className="text-red-600 text-sm">{formik.errors.facilityImage}</p>
                )}
              </div>
              <div className="w-full sm:w-1/2">
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Facility Name
                  </label>
                                <select
                                    name="facilityName"
                                    onBlur={formik.handleBlur}
                                    value={formik.values.facilityName}
                                    onChange={formik.handleChange}
                                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

                                >
                                    <option value='' >Select a Facility</option>
                                    {facilitytypes?.map((facility, index) => (
                                        <option value={facility.facilitytypeName} key={index}>{facility.facilitytypeName}</option>
                                    ))}
                                </select>
              
                  {formik.touched.facilityName && formik.errors.facilityName && (
                    <p className="text-red-600 text-sm">{formik.errors.facilityName}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="input1" className="block text-gray-700 font-semibold mb-2 text-sm">
                    Price per Slot
                  </label>
                  <input
                    type="number"
                    className="py-2 px-4 border border-gray-600 text-gray-700 rounded w-full bg-white mt-2 text-sm"
                    placeholder="No of Price"
                    name="facilityPrice"
                    onBlur={formik.handleBlur}
                    value={formik.values.facilityPrice}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.facilityPrice && formik.errors.facilityPrice && (
                    <p className="text-red-600 text-sm">{formik.errors.facilityPrice}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="input1" className="block text-gray-700 font-semibold mb-2 text-sm">
                    No of Token Required
                  </label>
                  <input
                    type="number"
                    className="py-2 px-4 border border-gray-600 text-gray-700 rounded w-full bg-white mt-2 text-sm"
                    placeholder="No of Tokens Requied"
                    name="facilityToken"
                    onBlur={formik.handleBlur}
                    value={formik.values.facilityToken}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.facilityToken && formik.errors.facilityToken && (
                    <p className="text-red-600 text-sm">{formik.errors.facilityToken}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="description" className="block text-gray-700 font-semibold mb-2 text-sm">
                    Description
                  </label>
                  <textarea
                    className="py-2 px-4 border border-gray-700 rounded text-gray-700 w-full h-48 bg-white text-sm"
                    name="facilityDescription"
                    onBlur={formik.handleBlur}
                    value={formik.values.facilityDescription}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.facilityDescription && formik.errors.facilityDescription && (
                    <p className="text-red-600 text-sm">{formik.errors.facilityDescription}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-500 py-4 px-11 rounded-full text-white font-bold active:bg-[#D0DFFF] focus:outline-none focus:ring focus:ring-white text-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
       </div>
    );
  }

export default FacilityForm
