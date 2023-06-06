
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function SignupForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const extraState = useSelector(state => state.extra);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'The username must be at least 3 characters.')
      .max(20, 'The username must be at most 20 characters.')
      .required('This field is required!'),
    email: Yup.string()
      .email('This is not a valid email.')
      .required('This field is required!'),
    password: Yup.string()
      .min(6, 'The password must be at least 6 characters.')
      .max(40, 'The password must be at most 40 characters.')
      .required('This field is required!'),
  });

  useEffect(() => {
    console.log(authState);
    if (extraState.loading) {
      console.log('loading');
    }

    if (extraState.error) {
      console.log('Signup error:', extraState.error);
    } else if (authState.otp) {
      console.log('Signup success:', authState);
      navigate('/otp');
    }
  }, [authState, extraState, navigate]);

  const handleSubmit = (values) => {
    
    setUser({
      name: '',
      email: '',
      password: ''
    });
  };

  return (
    <Formik
      initialValues={user}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className='p-8 px-8 rounded-lg'>
        <h2 className='text-4xl dark:text-gray-800 font-bold text-center'>Signup</h2>
        <div className='flex flex-col text-white py-2'>
          <label className='text-gray-800'>Name</label>
          <Field
            className='rounded-lg bg-[#9D9D9D] mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
            type='text'
            name='name'
          />
          <ErrorMessage
            name='name'
            component='div'
            className='text-red-500' // Set the error text color to red
          />
        </div>
        <div className='flex flex-col text-white py-2'>
          <label className='text-gray-800'>Email</label>
          <Field
            className='rounded-lg bg-[#9D9D9D] mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
            type='text'
            name='email'
          />
          <ErrorMessage
            name='email'
            component='div'
            className='text-red-500' // Set the error text color to red
          />
        </div>
        <div className='flex flex-col text-white py-2'>
          <label className='text-gray-800'>Password</label>
          <Field
            className='rounded-lg bg-[#9D9D9D] mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
            type='password'
            name='password'
          />
          <ErrorMessage
            name='password'
            component='div'
            className='text-red-500' // Set the error text color to red
          />
        </div>
        <button className='w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/50 text-white font-semibold rounded-lg' type='submit'>
          Sign Up
        </button>
      </Form>
    </Formik>
  );
}

export default SignupForm;

