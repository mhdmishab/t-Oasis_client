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
    const navigate=useNavigate();

    
    
    const dispatch = useDispatch();
    const loungeData = {
        loungeName: "",
        loungeDescription: "",
        loungeDistrict: "",
        loungeState: "",
        loungeImage:null,
        loungeLocation: ""

    }




    const [isModalVisible, setIsModalVisible] = useState(false);

 

    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [location,setLocation]=useState('');

    const handleModalOpen = () => {
        setIsModalVisible(true);
      };
    
      const handleModalClose = () => {
        setIsModalVisible(false);
      };
    
      const handleModalOk = () => {
        setIsModalVisible(false);
      };
    


    const updateLocation=(name)=>{
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

    const { vendor } = useSelector(state => state.vendorauth);

    const handleSubmit = (loungeData) => {
        try {

           
            

        console.log(lat,lng)
          console.log(loungeData);
      
          const { loungeImage, loungeAddress, loungeDescription, loungeDistrict, loungeLocation, loungeName, loungeState } = loungeData;
          console.log(loungeImage);
      
          const data = new FormData();
          data.append('loungeImage', loungeImage);
          data.append('loungeLat', lat);
          data.append('loungeLng', lng);
          data.append('loungeDescription', loungeDescription);
          data.append('loungeDistrict', loungeDistrict);
          data.append('loungeLocation', location);
          data.append('loungeName', loungeName);
          data.append('loungeState', loungeState);
      
          console.log(data);
      
          
        

          dispatch(addlounge({data:data,id:vendor.vendor_id})).then((response)=>{
            console.log("response is here",response);
            navigate('/manager/lounges');
          }).catch((err)=>{
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

                    <Form className='p-8 px-8 rounded-lg' encType='multipart/form-data'>
                        <div className='flex flex-wrap text-black py-2'>
                            <div className='m-5'>
                                <label className='text-gray-800 text-lg'>Lounge Name :</label>

                                <Field
                                    className="pl-8 m-5 border-b-2 font-display focus:outline-none focus:border-black  text-base"
                                    type='text'
                                    name='loungeName'
                                    placeholder='Lounge Name'
                                />
                                <ErrorMessage
                                    name='loungeName'
                                    component='div'
                                    className='text-red-500 text-sm' />
                            </div>


                            <div className='m-5'>
                                <label className='text-gray-800 text-lg'>District :</label>
                                <Field
                                    className="pl-8 m-5 border-b-2 font-display focus:outline-none focus:border-black  text-base"
                                    type='text'
                                    name='loungeDistrict'
                                    placeholder='District'
                                />
                                <ErrorMessage
                                    name='loungeDistrict'
                                    component='div'
                                    className='text-red-500 text-sm' />

                            </div>

                            <div className='m-5'>
                                <label className='text-gray-800 text-lg'>State :</label>
                                <Field
                                    className="pl-8 m-5 border-b-2 font-display focus:outline-none focus:border-black  text-base"
                                    type='text'
                                    name='loungeState'
                                    placeholder='State'
                                />
                                <ErrorMessage
                                    name='loungeState'
                                    component='div'
                                    className='text-red-500 text-sm' />
                            </div>

                            <div className='m-5'>
                                <label className='text-gray-800 text-lg'>Description :</label>
                                <Field
                                    className="pl-8 m-5 border-b-2 font-display focus:outline-none focus:border-black  text-base"
                                    type='text'
                                    name='loungeDescription'
                                    placeholder='Description'
                                   
                                />

                                  
                                <ErrorMessage
                                    name='loungeDescription'
                                    component='div'
                                    className='text-red-500 text-sm' />

                            </div >

                            <div className='m-5'>
                                <label className='text-gray-800 text-lg'>Location :</label>
                                <button
                                    type="button"
                                    className="bg-green-700 hover:bg-green-300 px-2  ml-2 rounded-md text-white  active:bg-[#D0DFFF] focus:outline-none focus:ring focus:ring-[#10244e]"
                                    onClick={handleModalOpen}
                                >
                                    Get Location
                                </button>
                                <input disabled className="pl-8 m-5 border-b-2 font-display focus:outline-none focus:border-black  text-base" defaultValue={location?location:""} />
                                <ErrorMessage
                                    name='loungeLocation'
                                    component='div'
                                    className='text-red-500 text-sm' />

                            </div >

                            <div className='m-5'>

                                <label className='text-gray-800 text-lg'>Images :</label>
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
                                                <div className="mb-4 aspect-w-1 aspect-h-1 mt-4 rounded-sm ">
                                                    <img src={imgPreview} alt="" />
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


                        </div>
                        <button type='submit' className='px-5 m-5 py-1 rounded-md bg-green-700 text-white hover:bg-green-300 mt-5'>
                            Submit
                        </button>
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
