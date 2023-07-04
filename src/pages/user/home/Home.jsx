import React, { useEffect, useState } from 'react';
import bgImg from '../../../assets/images/signupbg.jpg';
import Navbar from '../../../components/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getlounges } from '../../../slices/user/Lounges';
import Search from '../../../components/user/Search';
import UserLoungeCard from '../../../components/user/UserLoungeCard';

function Home() {
  const lounges = useSelector((state) => state.loungeuser).lounges;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getlounges());
  }, [dispatch]);

  console.log(lounges);

  const containerStyle = {
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
  };
  const containerStyle2 = {
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '70vh',
  };

  const containerStyle3 = {
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // height: '45vh',
  };



 

  return (
    <div className="p-5">
      <div style={containerStyle} className="rounded-xl mt-16">
        <div
          className="h-4/5 w-1/3 bg-slate-300  ml-32 p-24 pt-48"
          style={{ backgroundColor: 'rgba(138, 43, 226, 0.4)' }}
        >
          <h3 className="text-white text-6xl" style={{ lineHeight: '1.5' }}>
            <p className="text-lg">t-Oasis</p>A fertile spot for travellers. <br />
          </h3>
        </div>
      </div>
      <div className="h-96 w-full pt-5 ">
        <div className=' flex justify-center items-center '>

            <Search />
        </div>
    
      </div>
      <div style={containerStyle2} className="rounded-xl h-44 w-full">
        <div
          className="h-full w-full bg-slate-300  p-24 pt-48"
          style={{ backgroundColor: 'rgba(138, 43, 226, 0.4)' }}
        >
          
        </div>
      </div>
      <div className='h-96 w-full m-5 flex items-center'>
        <div className='w-1/2 h-full ml-8 bg-blue-300 p-20 flex justify-start items-center flex-col'>
            <h1 className='text-white text-2xl mb-5'>About Us</h1>
            <p className='text-white' style={{lineHeight:'1.5'}}>t-Oasis stands out from the conventional restrooms owing to this distinctive and exceptional feature, what we call “TOLOO”.It is a set of toilet stations installed within the Travlounge restrooms. This is the major revival in the Travlounge initiative,
             brought in to address a relevant community cause as well as to introduce a convenient sophisticated sanitation culture.</p>

        </div>
        <div className='w-2/5 h-5/6 bg-red-300 -ml-12' style={containerStyle3}>
          
        </div>
      </div>
      <div className='h-96 w-full flex items-center bg-purple-400'>
        
        </div>
     
    </div>
  );
}

export default Home;







