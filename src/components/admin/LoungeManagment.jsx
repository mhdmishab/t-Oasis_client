import React, { useEffect, useRef, useState } from 'react';
import { getlounge } from '../../slices/admin/Lounges';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoungeApproval from '../../pages/admin/home/LoungeApproval';

function LoungeManagment() {
    const navigate=useNavigate();
  const dispatch = useDispatch();
  const { lounges } = useSelector((state) => state.loungeadmin);
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleStatusFilter = (e) => {
    setSelectedStatus(e.target.value);
  };

  useEffect(() => {
    try {
      dispatch(getlounge()).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const handleLounge = (loungeId) => {
    console.log("inside ")
    navigate('/admin/approval', { state: { loungeId, lounges } });
  };

  const filteredLounges = selectedStatus
    ? lounges.filter((lounge) => lounge.isApproved === selectedStatus)
    : lounges;

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs bg-gray-50 text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Lounge Name
              </th>
              <th scope="col" className="px-6 py-3">
                Place
              </th>
              <th scope="col" className="px-6 py-3">
                District
              </th>
              <th scope="col" className="px-6 py-3">
                State
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    onChange={handleStatusFilter}
                  >
                    <option value="">All</option>
                    <option value="approved">Active</option>
                    <option value="pending">Approval Pending</option>
                    <option value="rejected">Rejected</option>
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
            {filteredLounges?.map((lounge, index) => (
              <tr key={index} className="bg-white border-b cursor-pointer" onClick={()=>handleLounge(lounge._id)}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {lounge.loungeName}
                </th>
                <td className="px-6 py-4">{lounge.loungeLocation}</td>
                <td className="px-6 py-4">{lounge.loungeDistrict}</td>
                <td className="px-6 py-4">{lounge.loungeState}</td>
                <td className="px-6 py-4">{lounge.isApproved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default LoungeManagment;

