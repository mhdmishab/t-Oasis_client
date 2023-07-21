import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addnewfacility } from '../../slices/admin/Facility';
import { useNavigate } from 'react-router-dom';

function FacilitytypeForm() {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const formik = useFormik({
    initialValues: {
      facilitytypeName: '',
    },
    validationSchema: Yup.object({
      facilitytypeName: Yup.string()
        .min(4, 'Name must be 4 characters or more')
        .max(17, 'Name must be 17 characters or less')
        .required('Required'),
    }),
    onSubmit: async(facilitytypeName) => {
        try{
      console.log(facilitytypeName);
      
      const response=await dispatch(addnewfacility({facilitytypeName}));
      if(response.payload?.data?.success){
        navigate('/admin/dashboard');
      }
    }catch(error){
        console.log(error);
    }
    },
  });

  return (
    <div className='flex-col'>
      <form onSubmit={formik.handleSubmit}>
        <input
          type='text'
          className='py-2 px-4 border border-gray-600 text-gray-700 rounded w-full bg-white mt-2 text-sm'
          placeholder='Facility Name'
          name='facilitytypeName'
          value={formik.values.facilitytypeName}
          onChange={formik.handleChange}
        />
        {formik.touched.facilitytypeName && formik.errors.facilitytypeName && (
          <p className='text-red-600 text-sm'>{formik.errors.facilitytypeName}</p>
        )}

        <button type='submit' className='px-3 py-3 text-white rounded-md bg-green-800 mt-10 mr-5'>
          Add
        </button>
      </form>
    </div>
  );
}

export default FacilitytypeForm;

