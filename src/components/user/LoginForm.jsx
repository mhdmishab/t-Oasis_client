import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../../slices/user/Auth';
import { clearmessage } from '../../slices/Message';




function LoginForm() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const {loading } = useSelector((state) => state.userauth);
  const {message} = useSelector((state)=>state.message);
  
  
 

  const user={
      email: '',
      password: ''
  }
  
  

  useEffect(() => {
   
      dispatch(clearmessage());
    }, [dispatch]);

 


  const validationSchema = Yup.object().shape({
      email: Yup.string()
          .email('This is not a valid email.')
          .required('This field is required!'),
      password: Yup.string()
          .min(6, 'The password must be at least 6 characters.')
          .max(40, 'The password must be at most 40 characters.')
          .required('This field is required!'),
  });


  const handleSubmit = (user) => {
      
      dispatch(login(user)).then((response)=>{
        console.log(response);
        if(response.payload?.success || response.payload?.data?.success){
          navigate('/profile');
        }
      })
    
  
  };


  return (
    <div>
    <Formik
        initialValues={user}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
    >
        <Form className='p-8 px-8 rounded-lg'>
          <h2 className='text-4xl dark:text-gray-800 font-bold text-center m-4'>Login </h2>
            <div className='flex flex-col  py-2'>
                <label className='text-gray-800'>Email</label>
                <Field
                    className="pl-8 m-2 border-b-2 opacity-70 font-display focus:outline-none focus:border-black  text-base"
                    type='text'
                    name='email'
                />
                <ErrorMessage
                    name='email'
                    component='div'
                    className='text-red-500' 
                />
            </div>
            <div className='flex flex-col  py-2'>
                <label className='text-gray-800'>Password</label>
                <Field
                    className='pl-8 m-2 border-b-2 opacity-70 font-display focus:outline-none focus:border-black text-base'
                    type='password'
                    name='password'
                />
                <ErrorMessage
                    name='password'
                    component='div'
                    className='text-red-500' 
                />
            </div>
            <button className='w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/50 text-white font-semibold rounded-lg' disabled={loading}  type='submit'>
            {loading ? 'Loading...' : 'Login'} 
            </button>
            <div className='flex justify-between '>
                  <p className='text-gray-400'><NavLink to={'/register'}>Need a account?</NavLink></p>
                  <p className='text-gray-400'><NavLink to={'/manager/login'}>Manager Login?</NavLink></p>
              </div>
        </Form>
    </Formik>
    
    {message && (
    <div className="form-group">
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    </div>
  )}
      </div>
  )
}

export default LoginForm;
