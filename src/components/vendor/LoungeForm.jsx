import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { addlounge } from '../../slices/vendor/Lounges';
import { Button, Modal } from 'antd';
import Map from '../helpers/Map';
import imgPreview from '../../assets/images/signupbg.jpg'
import { useNavigate } from 'react-router-dom';


function LoungeForm() {
    const navigate = useNavigate();

    const vendorId = useSelector((state) => state.loungevendor).vendor_id;
    const { loading } = useSelector((state) => state.loungevendor);

    const dispatch = useDispatch();
    const loungeData = {
        loungeName: "",
        loungeDescription: "",
        loungeDistrict: "",
        loungeState: "",
        loungeImage: null,
        loungeLocation: ""

    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [location, setLocation] = useState('');

    const handleModalOpen = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
    };



    const updateLocation = (name) => {
        setLocation(name)

    }

    const validationSchema = Yup.object().shape({

        loungeName: Yup.string()
            .min(3, 'The loungename must be at least 3 characters.')
            .max(20, 'The loungename must be at most 20 characters.')
            .required('This field is required!'),
        loungeDescription: Yup.string()
            .min(5, "Description must be atleast 5 letters").required(),
        loungeDistrict: Yup.string()
            .required(),
        loungeState: Yup.string()
            .required(),
        loungeImage: Yup.mixed()
            .required('Image is required')
            .test('fileFormat', 'Invalid file format', (value) => {
                if (!value) {
                    return false;
                }
                return ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
            }),
    })



    const handleSubmit = async (loungeData) => {
        try {

            console.log(lat, lng)
            console.log(loungeData);

            const { loungeImage, loungeAddress, loungeDescription, loungeDistrict, loungeLocation, loungeName, loungeState } = loungeData;
            console.log(loungeImage);

            const data = new FormData();
            data.append('image', loungeImage);
            data.append('loungeLat', lat);
            data.append('loungeLng', lng);
            data.append('loungeDescription', loungeDescription);
            data.append('loungeDistrict', loungeDistrict);
            data.append('loungeLocation', location);
            data.append('loungeName', loungeName);
            data.append('loungeState', loungeState);

            console.log(data);
            console.log(vendorId);

            dispatch(addlounge({ data: data, id: vendorId })).then((response) => {
                
                navigate('/manager/lounges');

                console.log("response is here", response);
            }).catch((err) => {
                console.log(err);
            })


        } catch (error) {
            console.log(error);
        }
    };




    return (
        <>
            <div>
                <Formik

                    initialValues={loungeData}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >

                    <Form className='max-w-3xl mx-auto p-2 bg-white rounded-lg  ' encType='multipart/form-data'>
                        <div className='flex flex-wrap text-black py-2'>
                            <div className='w-full sm:w-1/2 pr-4'>

                                <label className='block text-gray-700 font-semibold mb-2 text-sm'>Lounge Name :</label>

                                <Field
                                    className="py-2 px-4 border border-gray-600 text-gray-700 rounded w-full bg-white mt-2 text-sm"
                                    type='text'
                                    name='loungeName'
                                    placeholder='Lounge Name'
                                />
                                <ErrorMessage
                                    name='loungeName'
                                    component='div'
                                    className='text-red-500 text-sm' />
                            </div>


                            <div className='w-full sm:w-1/2 pr-4'>
                                <label className='block text-gray-700 font-semibold mb-2 text-sm'>District :</label>
                                <Field
                                    className="py-2 px-4 border border-gray-600 text-gray-700 rounded w-full bg-white mt-2 text-sm"
                                    type='text'
                                    name='loungeDistrict'
                                    placeholder='District'
                                />
                                <ErrorMessage
                                    name='loungeDistrict'
                                    component='div'
                                    className='text-red-500 text-sm' />

                            </div>

                            <div className='w-full sm:w-1/2 pr-4 mt-6'>
                                <label className='block text-gray-700 font-semibold mb-2 text-sm'>State :</label>
                                <Field
                                    className="py-2 px-4 border border-gray-600 text-gray-700 rounded w-full bg-white mt-2 text-sm"
                                    type='text'
                                    name='loungeState'
                                    placeholder='State'
                                />
                                <ErrorMessage
                                    name='loungeState'
                                    component='div'
                                    className='text-red-500 text-sm' />
                            </div>



                            <div className='w-full sm:w-1/2 pr-4'>
                                <label className='block text-gray-700 font-semibold mb-2 text-sm'>Location :</label>
                                <button
                                    type="button"
                                    className="bg-green-700 hover:bg-green-300 px-2  ml-2 rounded-md text-white  active:bg-[#D0DFFF] focus:outline-none focus:ring focus:ring-[#10244e]"
                                    onClick={handleModalOpen}
                                >
                                    Get Location
                                </button>
                                <input disabled className="py-2 px-4 border border-gray-600 text-gray-700 rounded w-full bg-white mt-2 text-sm" defaultValue={location ? location : ""} />
                                <ErrorMessage
                                    name='loungeLocation'
                                    component='div'
                                    className='text-red-500 text-sm' />

                            </div >
                            <div className='w-full sm:w-1/2 pr-4 mt-3 '>
                                <label className='block text-gray-700 font-semibold mb-2 text-sm'>Description :</label>
                                <Field
                                    className="py-2 px-4 border border-gray-700 rounded text-gray-700 w-full h-56 bg-white text-sm"
                                    type='textarea'
                                    name='loungeDescription'
                                    placeholder='Description'

                                />


                                <ErrorMessage
                                    name='loungeDescription'
                                    component='div'
                                    className='text-red-500 text-sm' />

                            </div >

                            <div className='w-full sm:w-1/2 pr-4 '>

                                <label className='text-gray-800 text-sm'>Images :</label>
                                <Field name="loungeImage">
                                    {({ form, field }) => (
                                        <>
                                            {field.value ? (
                                                <img
                                                    src={URL.createObjectURL(field.value)}
                                                    alt="Preview"
                                                    className="object-cover rounded-lg"
                                                    style={{ width: "1425px", height: "300px" }}
                                                />
                                            ) : (
                                                <div className=" aspect-w-1 aspect-h-1 mt-4 rounded-sm ">
                                                    <img src={imgPreview} alt="" style={{ width: "400px", height: "220px" }} />
                                                </div>
                                            )}
                                            <br />
                                            <input
                                                type="file"
                                                id="image"
                                                accept="image/*"
                                                onChange={(event) => {
                                                    form.setFieldValue(field.name, event.currentTarget.files[0]);
                                                }}
                                                className="py-2 px-4 border border-gray-700 rounded bg-white w-full"
                                            />
                                        </>
                                    )}
                                </Field>
                                <ErrorMessage
                                    name='loungeImage'
                                    component='div'
                                    className='text-red-500 text-sm' />

                            </div>
                            <div className=''>
                                <button type='submit' className='px-5 py-2  rounded-md bg-green-700 text-white hover:bg-green-300 '>
                                    {loading ? 'Loading...' : 'Submit'}
                                </button>
                            </div>


                        </div>
                    </Form>


                </Formik>
            </div>

            <Modal
                title=""
                open={isModalVisible}
                onCancel={handleModalClose}
                footer={[
                    <Button key="cancel" className="bg-red-400 text-white" onClick={handleModalClose}>
                        Cancel
                    </Button>,
                    <Button key="ok" onClick={handleModalOk}>
                        Submit
                    </Button>,
                ]}

                bodyStyle={{ height: '400px', overflow: 'auto' }}
                width={800}>

                <Map lat={lat} setLat={setLat} lng={lng} setLng={setLng} updatePlaceName={updateLocation} />



            </Modal>
        </>
    )
}

export default LoungeForm;










