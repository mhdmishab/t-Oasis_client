import React, { useEffect, useState } from 'react';
import bgImg from '../../../assets/images/signupbg.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getlounges } from '../../../slices/user/Lounges';
import Search from '../../../components/user/Search';

function Home() {
  const lounges = useSelector((state) => state.loungeuser).lounges;
  const dispatch = useDispatch();
  const text = "t-Oasis";
  const [animatedText, setAnimatedText] = useState('');
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setAnimatedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(getlounges()).then((response) => {
      console.log(response);
    });
  }, [dispatch]);

  console.log(lounges);

  return (
    <div className="p-5">
      <div
        className="rounded-xl  bg-cover bg-center bg-no-repeat h-[70vh] md:h-[100vh]"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="h-4/5 w-4/5 mx-auto md:w-1/3 bg-slate-300 mt-20 p-8 md:p-24 sm:mt-48 md:mt-0 md:pt-48 bg-opacity-40">
          <h3 className="text-white text-5xl font-semibold md:text-6xl leading-tight">
            {animatedText}
          </h3>
          <p className="text-white text-lg mt-4 md:text-xl md:leading-relaxed">
            A fertile spot for travellers.
          </p>
        </div>
      </div>
      <div className="h-auto md:h-96 w-full mt-10">
        <div className="">
          <Search limit={3}/>
        </div>
      </div>
{/* 
      <div
        className="rounded-xl h-40 md:h-60 lg:h-80 w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="h-full w-11/12 mx-auto md:w-1/2 lg:w-1/3 bg-slate-300 p-8 md:p-16 lg:p-24 bg-opacity-70 flex justify-center items-center flex-col">
    
        </div>
      </div> */}

      <div className="h-auto w-full mx-auto px-5 md:px-0 md:flex md:items-center">
        <div className="w-full md:w-1/2 md:ml-8 bg-blue-300 p-8 md:p-10 lg:p-16 flex justify-start items-center flex-col">
          <h1 className="text-white text-xl md:text-3xl lg:text-4xl font-semibold mb-4">
            About Us
          </h1>
          <p className="text-white md:text-base md:leading-relaxed lg:text-lg xl:text-xl">
            t-Oasis stands out from the conventional facilities owing to this
            distinctive and exceptional feature. It is a set of
             stations installed within the Travlounge facilities. This is the
            major revival in the Travlounge initiative, brought in to address a
            relevant community cause as well as to introduce a convenient
            sophisticated sanitation culture.
          </p>
        </div>
        <div className="hidden md:block w-1/2 md:h-64 lg:h-80 xl:h-96 md:-ml-12 bg-cover bg-center bg-no-repeat"  style={{ backgroundImage: `url(${bgImg})` }}></div>
      </div>

      <div className="h-72 w-full bg-purple-400 mt-5 px-10 py-16">
        <div className='flex justify-around items-center text-white'>
          <div className='hidden sm:block flex-col items-center justify-center '>
            <h3 className="text-white text-2xl font-semibold md:text-4xl leading-tight">
              {animatedText}
            </h3>
          </div>
          <div className='flex-col items-center justify-center'>
            <h2 className='mb-5 text-lg font-semibold'>Contact</h2>
            <p className='mb-2 flex'><svg fill="none" className='w-5 h-5 mr-1' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>Calicut-08,Kerala</p>
            <p className='mb-2 flex'><svg fill="none" className='w-5 h-5 mr-1' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>toasisofficial@gmail.com</p>
            <p className='mb-2 flex'><svg className='w-5 h-5 mr-1' fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>+91 7732901234</p>
          </div>
          
        </div>
      </div>
      <footer className="h-16 bg-blue-900 text-white text-center flex items-center justify-center">
        © {new Date().getFullYear()} t-Oasis. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;










