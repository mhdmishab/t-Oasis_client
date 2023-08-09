import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addlounge, editlounge } from '../../slices/vendor/Lounges';
import { Button, Modal } from 'antd';
import Map from '../helpers/Map';
import imgPreview from '../../assets/images/signupbg.jpg';
import { useNavigate } from 'react-router-dom';

function LoungeEditForm({ loungeId}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [imagePreview, setImagePreview] = useState(null);
    const { lounges } = useSelector((state) => state.loungevendor);
    const vendorId = useSelector((state) => state.loungevendor).vendor_id;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [location, setLocation] = useState('');

    useEffect(() => {
        const lounge = lounges?.find((lounge) => lounge._id === loungeId);
        if (lounge) {
            setImagePreview(lounge.loungeImages[0]);

            formik.setValues({
                loungeName: lounge.loungeName,
                loungeDescription: lounge.loungeDescription,
                loungeDistrict: lounge.loungeDistrict,
                loungeState: lounge.loungeState,
                existingLoungeImage: lounge.loungeImages, // Use a different field for existing image
                loungeImage: null,
                existingLoungeLocation: lounge.loungeLocation,
                loungeLocation:null
            });
        }
    }, [loungeId, lounges]);

    const formik = useFormik({
        initialValues: {
            loungeName: '',
            loungeDescription: '',
            loungeDistrict: '',
            loungeState: '',
            existingLoungeImage: null,
            loungeImage: null,
            loungeLocation: '',
            existingLoungeLocation:null
        },
        validationSchema: Yup.object({
            loungeName: Yup.string()
                .min(3, 'The loungename must be at least 3 characters.')
                .max(20, 'The loungename must be at most 20 characters.')
                .required('This field is required!'),
            loungeDescription: Yup.string().min(5, 'Description must be at least 5 letters').max(100,"Description must be maximum 100 letters").required(),
            loungeDistrict: Yup.string().required(),
            loungeState: Yup.string().required(),
            loungeName: Yup.string()
                .min(3, 'The lounge name must be at least 3 characters.')
                .max(20, 'The lounge name must be at most 20 characters.')
                .required('This field is required!'),
            loungeDescription: Yup.string()
                .min(5, 'Description must be at least 5 letters')
                .required('This field is required!'),
            loungeDistrict: Yup.string().required('This field is required!'),
            loungeState: Yup.string().required('This field is required!'),
            loungeImage: Yup.mixed().nullable().test('fileFormat', 'Invalid file format', function (value) {
                if (this.parent.loungeImage && !value) {
                    // New image not selected, no validation required
                    return true;
                }
                if (value) {
                    return ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
                }
                return true;
            }),
        }),
        onSubmit: (loungeData) => {
            const { loungeImage, loungeDescription, loungeDistrict, loungeLocation, loungeName, loungeState, existingLoungeImage,existingLoungeLocation } = loungeData;


            const data = new FormData();
            if (loungeImage) {
                console.log(2)
                // New image is selected, add it to the form data
                data.append('image', loungeImage);
            } else if (existingLoungeImage) {
                // No new image selected, but an existing image is present
                // Add the existing image URL to the form data
                console.log(1)
                console.log(existingLoungeImage[0])
                data.append('existingImage', existingLoungeImage[0]);
            }

            if(location){
                console.log(3)
                data.append('loungeLocation',location);   
                data.append('loungeLat', lat);
                data.append('loungeLng', lng);
            }else{
                console.log(4)
                data.append('existingLoungeLocation',existingLoungeLocation)
            }
            
            data.append('loungeDescription', loungeDescription);
            data.append('loungeDistrict', loungeDistrict);
            // data.append('loungeLocation', loungeLocation);
            data.append('loungeName', loungeName);
            data.append('loungeState', loungeState);

            console.log(data)

            dispatch(editlounge({ data: data, vendorId: vendorId, loungeId:loungeId }))
                .then((response) => {
                    navigate('/manager/dashboard');
                 
                    console.log('response is here', response);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    });

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
        setLocation(name);
    };

    return (
        <div className="bg-[#ffff] py-4 pb-16">
            <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg pb-10 px-10 py-10">
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-wrap">
                        <div className="w-full sm:w-1/2 pr-4 mb-4">
                            <label htmlFor="loungeName" className="block text-gray-700 font-semibold mb-2 text-sm">
                                Lounge Name
                            </label>
                            <input
                                type="text"
                                id="loungeName"
                                className="py-2 px-4 border border-gray-600 text-gray-700 rounded w-full bg-white mt-2 text-sm"
                                placeholder="Lounge Name"
                                {...formik.getFieldProps('loungeName')}
                            />
                            {formik.touched.loungeName && formik.errors.loungeName && (
                                <p className="text-red-600 text-sm">{formik.errors.loungeName}</p>
                            )}
                        </div>

                        <div className="w-full sm:w-1/2 pr-4 mb-4">
                            <label htmlFor="loungeDistrict" className="block text-gray-700 font-semibold mb-2 text-sm">
                                District:
                            </label>
                            <input
                                type="text"
                                id="loungeDistrict"
                                className="py-2 px-4 border border-gray-600 text-gray-700 rounded w-full bg-white mt-2 text-sm"
                                placeholder="Lounge District"
                                {...formik.getFieldProps('loungeDistrict')}
                            />
                            {formik.touched.loungeDistrict && formik.errors.loungeDistrict && (
                                <p className="text-red-600 text-sm">{formik.errors.loungeDistrict}</p>
                            )}
                        </div>

                        <div className="w-full sm:w-1/2 pr-4 mb-4">
                            <label htmlFor="loungeState" className="block text-gray-700 font-semibold mb-2 text-sm">
                                State
                            </label>
                            <input
                                type="text"
                                id="loungeState"
                                className="py-2 px-4 border border-gray-600 text-gray-700 rounded w-full bg-white mt-2 text-sm"
                                placeholder="State"
                                {...formik.getFieldProps('loungeState')}
                            />
                            {formik.touched.loungeState && formik.errors.loungeState && (
                                <p className="text-red-600 text-sm">{formik.errors.loungeState}</p>
                            )}
                        </div>

                        {/* ... Other fields ... */}

                        <div className="w-full sm:w-1/2 pr-4 mb-4">
                            <label className="block text-gray-700 font-semibold mb-2 text-sm">Location:</label>
                            <button
                                type="button"
                                className="bg-green-700 hover:bg-green-300 px-2 ml-2 rounded-md text-white active:bg-[#D0DFFF] focus:outline-none focus:ring focus:ring-[#10244e]"
                                onClick={handleModalOpen}
                            >
                                Get Location
                            </button>
                            <input
                                disabled
                                className="py-2 px-4 border border-gray-600 text-gray-700 rounded w-full bg-white mt-2 text-sm"
                                value={location || formik.values.existingLoungeLocation || ""}
                                readOnly
                            />
                            {formik.touched.loungeLocation && formik.errors.loungeLocation && (
                                <p className="text-red-600 text-sm">{formik.errors.loungeLocation}</p>
                            )}
                        </div>

                        <div className="w-full sm:w-1/2 pr-4 mb-4">
                            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2 text-sm">
                                Description
                            </label>
                            <textarea
                                className="py-2 px-4 border border-gray-700 rounded text-gray-700 w-full h-48 bg-white text-sm"
                                name="loungeDescription"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                {...formik.getFieldProps('loungeDescription')}
                            />
                            {formik.touched.loungeDescription && formik.errors.loungeDescription && (
                                <p className="text-red-600 text-sm">{formik.errors.loungeDescription}</p>
                            )}
                        </div>

                        <div className="w-full sm:w-1/2 pr-4 mb-4">
                            <div className="aspect-w-1 aspect-h-1">
                                <label className="text-gray-800 text-sm">Images:</label>
                                {imagePreview ? (
                                    <img
                                        src={imagePreview?.url || imagePreview}
                                        alt="Preview"
                                        className="object-cover rounded-lg"
                                        style={{ width: '1425px', height: '300px' }}
                                    />
                                ) : (
                                    <div className="aspect-w-1 aspect-h-1 mt-4 rounded-sm">
                                        <img src={imagePreview?.url} alt="" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    id="loungeImage"
                                    accept="image/*"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files[0];
                                        formik.setFieldValue('loungeImage', file);
                                        if (file) {
                                            setImagePreview(URL.createObjectURL(file));
                                        } else {
                                            setImagePreview(null);
                                        }
                                    }}
                                    className="py-2 px-4 border border-gray-700 rounded bg-white w-full text-sm"
                                />
                                {formik.touched.loungeImage && formik.errors.loungeImage && (
                                    <p className="text-red-600 text-sm">{formik.errors.loungeImage}</p>
                                )}
                            </div>
                        </div>

                        <div className="w-full flex justify-center mt-5">
                            <button
                                type="submit"
                                className="bg-green-700 hover:bg-green-500 py-4 px-11 rounded-full text-white font-bold active:bg-[#D0DFFF] focus:outline-none focus:ring focus:ring-white text-sm"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
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
                width={800}
            >
                <Map lat={lat} setLat={setLat} lng={lng} setLng={setLng} updatePlaceName={updateLocation} />
            </Modal>
        </div>
    );
}

export default LoungeEditForm;


