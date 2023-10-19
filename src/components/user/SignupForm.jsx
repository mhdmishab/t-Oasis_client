
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../../slices/user/Auth';
import { clearmessage } from '../../slices/Message';
function SignupForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.userauth);

    const { message } = useSelector((state) => state.message);




    const user = {
        name: '',
        email: '',
        password: ''
    }


    useEffect(() => {

        dispatch(clearmessage());
    }, [dispatch]);




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


    const handleSubmit = (user) => {

        
        
        dispatch(register(user)).unwrap().then((response) => {

            console.log(response);
            if(response?.data || response.payload?.data?.success){
            navigate('/otp')
            }

        }).catch((err) => {
            console.log("error catched");
            console.log(err);

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
                    <h2 className='text-4xl mb-5 dark:text-gray-800 font-bold text-center'>Sign up </h2>
                    <div className='flex flex-col text-black py-2'>
                        <label className='text-gray-800'>Name</label>
                        <Field
                            className='pl-8 m-2 border-b-2 opacity-70 font-display focus:outline-none focus:border-black  text-base'
                            type='text'
                            name='name'
                        />
                        <ErrorMessage
                            name='name'
                            component='div'
                            className='text-red-500' // Set the error text color to red
                        />
                    </div>
                    <div className='flex flex-col text-black py-2'>
                        <label className='text-gray-800'>Email</label>
                        <Field
                            className='pl-8 m-2 border-b-2 opacity-70 font-display focus:outline-none focus:border-black  text-base'
                            type='text'
                            name='email'
                        />
                        <ErrorMessage
                            name='email'
                            component='div'
                            className='text-red-500'
                        />
                    </div>
                    <div className='flex flex-col text-black py-2'>
                        <label className='text-gray-800'>Password</label>
                        <Field
                            className='pl-8 m-2 opacity-70 border-b-2 font-display focus:outline-none focus:border-black  text-base'
                            type='password'
                            name='password'
                        />
                        <ErrorMessage
                            name='password'
                            component='div'
                            className='text-red-500'
                        />
                    </div>
                    {/* <div className='flex flex-col text-black py-2'>
                        <label className='text-gray-800'>Confirm Password</label>
                        <Field
                            className='pl-8 m-2 border-b-2 font-display focus:outline-none focus:border-black  text-base'
                            type='password'
                            name='confirmPassword'
                        />
                        <ErrorMessage
                            name='confirmPassword'
                            component='div'
                            className='text-red-500'
                        />
                    </div> */}
                    <button className='w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/60 text-white font-semibold rounded-lg' disabled={loading} type='submit'>
                        {loading ? 'Loading...' : 'Sign Up'}
                    </button>
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

    );

}

export default SignupForm;

