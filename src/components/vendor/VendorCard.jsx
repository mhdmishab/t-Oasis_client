import React from 'react';
import img from '../../assets/images/signupbg.jpg';

function VendorCard({ lounges }) {
    return (
        <>
            {lounges?.map((lounge, index) => (
                <div key={index} className='w-72 h-48 bg-white rounded-lg mt-16 relative drop-shadow-[0_15px_15px_rgba(0,0,0,0.16)] hover:drop-shadow-xl m-3'>
                    <div className='w-60 h-52 bg-white rounded-md ml-6 -mt-12 absolute'>
                        <div className='flex-1 hover:cursor-pointer'>
                            <img src={lounge.loungeImages[0]?.url} className='rounded-lg' alt='Lounge' />
                        </div>
                        <div className='flex-1 flex-col items-center mt-2'>
                            <h5 className='text-sm text-bold'>
                                {lounge.loungeName} || {lounge.loungeDistrict}
                            </h5>
                            <p className='mt-1 text-xs text-gray-600 flex justify-between'>{lounge.loungeState}

                                {lounge.isApproved === 'approved' ? <span className='text-green-400'>Active</span> : lounge.isApproved === 'pending' ? <span className='text-orange-400'>Approval Pending</span> : <span className='text-red-400'>Rejected</span>}
                            </p>
                        </div>
                    </div>
                    <button className='w-7 h-7 border-2 border-gray-500 bg-white rounded-full cursor-pointer absolute left-60 top-44 ml-1'>
                        <svg fill='none' stroke='gray' strokeWidth={1.5} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0' />
                        </svg>
                    </button>
                    <button className='w-7 h-7 border-2 border-gray-500 bg-white rounded-full cursor-pointer absolute left-52 top-44'>
                        <svg fill='none' stroke='gray' strokeWidth={1.5} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' />
                        </svg>
                    </button>
                </div>
            ))}
        </>
    );
}

export default VendorCard;

