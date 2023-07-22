import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddComplaint, AddReview, CancelBooking, UploadUserImage, getuserprofile } from '../../../slices/user/Lounges';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineCloudUpload } from 'react-icons/ai'
import moment from 'moment';
import { Modal } from 'antd';
import RatingForm from '../../../components/user/RatingForm';
import ComplaintLetter from '../../../components/user/ComplaintLetter';

function UserProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userToken = localStorage?.getItem('userToken');
    const parsedUserToken = JSON?.parse(userToken);
    const user_id = parsedUserToken?.userId;
    const { user, bookings } = useSelector(state => state.loungeuser);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [bookId, setBookId] = useState(null);

   


    const showModal = (id) => {
        console.log(id);
        setBookId(id);
        setIsModalOpen(true);
    };
    const showRatingModal = (id) => {
        console.log(id);
        setIsRatingModalOpen(true);
        setBookId(id);
        // setIsModalOpen(true);
    };
    const showReportModal = (id) => {
        console.log(id);
        setBookId(id);
        setIsReportModalOpen(true);
    };
    const handleCancel = () => {
        setComplaint(null);
        setRating(null);
        setRatingText(null);
        setBookId(null);
        setIsModalOpen(false);
        setIsRatingModalOpen(false);
        setIsReportModalOpen(false);
    };
    console.log(user_id)


 

    useEffect(() => {
        if (!user_id) {
          navigate('/login');
        } else {
          dispatch(getuserprofile(user_id));
          
        }
      }, [dispatch,user_id]);

    console.log(user);

    const [selectedStatus, setSelectedStatus] = useState('');
    const [rating, setRating] = useState(null);
    const [ratingText, setRatingText] = useState(null);
    const [complaint, setComplaint] = useState(null);

    useEffect(() => {
        if (rating) {
          const submitReview = async () => {
            console.log(rating);
            console.log(ratingText);
            console.log(bookId);
            const data = { rating, ratingText };
            await dispatch(AddReview({ bookId, data })).then((response) => {
              console.log(response);
              setRating(null);
              setRatingText(null);
              handleCancel();
            });
          };

          submitReview();
        }
      }, [rating, ratingText, bookId, dispatch]);

      useEffect(() => {
        if (complaint) {
          const submitComplaint = async () => {
            console.log(complaint)
            
            await dispatch(AddComplaint({ bookId,complaint })).then((response) => {
              console.log(response);
              setComplaint(null);
              handleCancel();
            });
          };

          submitComplaint();
        }
      }, [complaint, bookId, dispatch]);
      

    const handleStatusFilter = (e) => {
        setSelectedStatus(e.target.value);
    };

    const filteredBookings = selectedStatus
        ? bookings.filter((booking) => booking.status === selectedStatus)
        : bookings;

    console.log(filteredBookings);

    const [userImage, setUserImage] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    setTimeout(() => {
        { isHovered && setIsHovered(false) }
    }, 5000)

    const formik = useFormik({
        initialValues: {
            userImage: (user && user[0]?.image?.url) || null,
            name: (user && user[0]?.name) || '',
        },
        validationSchema: Yup.object().shape({
            userImage: Yup.mixed()
                .required('Image is required')
                .test('fileFormat', 'Invalid file format', (value) => {
                    if (!value) {
                        return false;
                    }
                    return ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
                })
                .test('fileSize', 'Image size must be less than 2MB', (value) => {
                    if (!value) {
                        return false;
                    }
                    return value.size <= 2 * 1024 * 1024; // 2MB
                }),
            name: Yup.string().required('Name is required'),
        }),

    });

    const handleCancelBooking = async () => {
        console.log(bookId, "cancel booking id");
        dispatch(CancelBooking({user_id,bookId})).then((response)=>{
            console.log(response);
            navigate('/profile')
        })

    }


    const handleImageChange = async (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue("userImage", file);
        setUserImage(URL.createObjectURL(file));

        if (file) {
            const data = new FormData();
            data.append('image', file);
            try {
                const response = await dispatch(UploadUserImage({ user_id, data }));
                console.log(response);
                if (response) {
                    dispatch(getuserprofile(user_id)).then((response) => {
                        console.log(response)
                    })
                }

            } catch (error) {
                console.log(error);
            }
        }
    };



    return (
        <main className="profile-page">
            <link
                rel="stylesheet"
                href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
            />
            <link
                rel="stylesheet"
                href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
            />
            <section className="relative block h-500-px">
                <div className="absolute top-0 w-full h-full bg-center bg-cover" >
                    <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                </div>
                <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: "translateZ(0px)" }}>
                    <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </section>
            <section className="relative py-16 bg-blueGray-200">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div className="absolute -top-16">


                                        <div className=" flex flex-col items-center justify-center pt-4 pl-2 bg-white rounded-full w-32 h-32">
                                            <label htmlFor="dropzone-file" className="mb-2 text-sm text-gray-500 dark:text-gray-400 relative cursor-pointer flex flex-col justify-center items-center">
                                                <div className="w-32 h-32 rounded-full overflow-hidden flex justify-center items-center">
                                                    {formik.values.userImage ? (
                                                        <img
                                                            src={user[0]?.image?.url || ''}
                                                            alt="User Image"
                                                            className="object-cover w-full h-full cursor-pointer"
                                                        />
                                                    ) : (
                                                        <>
                                                            <AiOutlineCloudUpload className="w-16 h-12 ml-3 mt-6 animate-bounce" />
                                                            <span className="font-semibold">Click to upload Image</span>
                                                        </>
                                                    )}
                                                </div>
                                            </label>

                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                className="hidden"
                                                multiple
                                                name="image"
                                                onChange={handleImageChange}
                                            />
                                        </div>

                                    </div>

                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                    <div className="py-6 px-3 mt-32 sm:mt-0">
                                        <a href='/search-lounges'><button className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                            Book Now
                                        </button></a>
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{bookings?.length}</span><span className="text-sm text-blueGray-400">Bookings</span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Reviews</span>
                                        </div>
                                        <div className="lg:mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-12">
                                <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                                    <span className="inline-block relative">
                                        {user && user[0]?.name}
                                        <i className="fas fa-pencil-alt ml-2 text-lg text-blueGray-400 absolute top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => formik.setFieldTouched('name', true)}></i>
                                    </span>
                                </h3>
                                {formik.touched.name && formik.errors.name && (
                                    <div className="text-red-500">{formik.errors.name}</div>
                                )}
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold ">
                                    <i className="fas fa-envelope-alt mr-2 text-lg text-blueGray-400"></i>
                                    {user && user[0]?.email}
                                </div>
                                <div className="mb-2 text-blueGray-600 mt-10">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Solution Manager - Creative Tim Officer
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>University of Computer Science
                                </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        <div className="mb-4 text-lg leading-relaxed text-blueGray-700 w-full">
                                            {bookings.length !== 0 && (
                                                <div className="w-full overflow-x-auto">
                                                    <table className="w-full text-sm text-left text-gray-500">
                                                        <thead className="text-xs bg-gray-50 text-gray-700">
                                                            <tr>
                                                                <th scope="col" className="px-6 py-3">
                                                                    Lounge
                                                                </th>
                                                                <th scope="col" className="px-6 py-3">
                                                                    Place
                                                                </th>
                                                                <th scope="col" className="px-6 py-3">
                                                                    Facility
                                                                </th>
                                                                <th scope="col" className="px-6 py-3">
                                                                    Date
                                                                </th>
                                                                <th scope="col" className="px-6 py-3">
                                                                    Slots
                                                                </th>
                                                                <th scope="col" className="px-6 py-3">
                                                                    Amount Paid
                                                                </th>
                                                                <th scope="col" className="px-6 py-3">
                                                                    <div className="relative">
                                                                        <select
                                                                            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                                            onChange={handleStatusFilter}
                                                                        >
                                                                            <option value="">All</option>
                                                                            <option value="booked">Booked</option>
                                                                            <option value="cancelled">Cancelled</option>
                                                                        </select>
                                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                                            <svg
                                                                                className="fill-current h-4 w-4"
                                                                                viewBox="0 0 20 20"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                                                                                    clipRule="evenodd"
                                                                                />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filteredBookings?.map((booking, index) => (
                                                                <tr key={index} className="bg-white border-b cursor-pointer">
                                                                    <td className="px-6 py-4">{booking.lounge_id.loungeName}</td>
                                                                    <td className="px-6 py-4">{booking.lounge_id.loungeDistrict}</td>
                                                                    <td className="px-6 py-4">{booking.facility_id.facilityName}</td>
                                                                    <td className="px-6 py-4">{moment(booking.booked_date).format("DD/MM/YY")}</td>
                                                                    <td className="px-6 py-4">{booking.booked_slots?.join(', ')}</td>
                                                                    <td className="px-6 py-4">{booking.amount_paid}</td>
                                                                    <td className="px-6 py-4">
                                                                        <div className="flex flex-col justify-center items-center">
                                                                            {booking.status}
                                                                            {booking.status === "booked" ? (
                                                                                <a className="text-xs text-red-400 mt-0 cursor-pointer" onClick={() => showModal(booking._id)}>cancel</a>
                                                                            ) : null}
                                                                            {booking.status === "completed" ? (
                                                                                <div className='flex flex-col'>
                                                                                    {booking.review_added ? <a className="text-xs text-blue-400 mt-0  disabled" >Rated</a> : <a className="text-xs text-blue-400 mt-0 cursor-pointer" onClick={() => showRatingModal(booking._id)}>Rate Now</a>}
                                                                                    {booking.complaint_added?<a className="text-xs text-red-400 mt-0  disabled">Reported</a>:<a className="text-xs text-red-400 mt-0 cursor-pointer" onClick={() => showReportModal(booking._id)}>Report</a>}
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                    </td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
                <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center md:justify-between justify-center">
                            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                                <div className="text-sm text-blueGray-500 font-semibold py-1">
                                    <a href="#" className="text-blueGray-500 hover:text-gray-800" target="_blank" rel="noreferrer">Wishes</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank" rel="noreferrer">t-Oasis</a>.
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </section>
            <Modal
                title=""
                open={isModalOpen}
                onCancel={handleCancel}
                className=""
                footer={null}
            >


                <div className="flex-col items-center ">
                    <p>
                        Are you sure you wanna cancel this Booking
                    </p>

                    <button
                        type="submit"
                        className="px-5 py-1 rounded-md bg-red-700 text-white hover:bg-red-300 mt-5"
                        onClick={handleCancelBooking}
                    >

                        Cancel
                    </button>

                </div>

            </Modal>
            <Modal
                    title="Rate Now"
                    open={isRatingModalOpen}
                    onCancel={handleCancel}
                    className="flex justify-center"
                    footer={null}
                    bodyStyle={{height:'400px',overflow:'auto'}}
                    width={525}
                >

                   <RatingForm  setRating={setRating}  setRatingText={setRatingText}/>
            </Modal>
           

<Modal
  
  open={isReportModalOpen}
  onCancel={handleCancel}
  className="flex justify-center"
  footer={null}
  bodyStyle={{ height: '400px', overflow: 'auto' }}
  width={1000}
>
    <div className='flex justify-center top-0'>

  <ComplaintLetter setComplaint={setComplaint}/>
    </div>
</Modal>

        </main>
    );
}

export default UserProfile;











