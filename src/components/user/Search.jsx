import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserLoungeCard from './UserLoungeCard';
import { useNavigate } from 'react-router-dom';

function Search() {
  const lounges = useSelector((state) => state.loungeuser).lounges;
  const [filteredLounges, setFilteredLounges] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate=useNavigate();

  const filterLounges = (query) => {
    const filtered = lounges.filter(
      (lounge) =>
        !lounge.isBlocked && lounge.isApproved === 'approved' && lounge.loungeDistrict.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLounges(filtered);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterLounges(query);
  };
  const handleclick=()=>{
    navigate('/search-lounges')
  }

  useEffect(() => {
    filterLounges(searchQuery);
  }, []);

  return (
    <div className="mb-3 m-5">
      <div className="mb-4 flex w-full flex-wrap items-stretch">
        <input
          type="search"
          className="m-0 block w-40 min-w-0 flex-auto rounded border border-solid  bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-gray-400 dark:focus:border-primary"
          placeholder="Search for district"
          aria-label="Search"
          aria-describedby="button-addon2"
          value={searchQuery}
          onChange={handleSearch}
        />




        {/* Search icon */}
        <span
          className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
          id="basic-addon2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor "
            className="h-5 w-5 cursor-pointer"
            onClick={handleclick}
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      <div className='flex flex-wrap max-h-[calc(100vh-64px)]'>
        {filteredLounges.map((lounge) => (
          <UserLoungeCard key={lounge._id} lounge={lounge} />
        ))}
      </div>
    </div>
  );
}

export default Search;


