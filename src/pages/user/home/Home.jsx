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
            t-Oasis stands out from the conventional restrooms owing to this
            distinctive and exceptional feature, what we call “TOLOO”. It is a set of
            toilet stations installed within the Travlounge restrooms. This is the
            major revival in the Travlounge initiative, brought in to address a
            relevant community cause as well as to introduce a convenient
            sophisticated sanitation culture.
          </p>
        </div>
        <div className="hidden md:block w-1/2 md:h-64 lg:h-80 xl:h-96 md:-ml-12 bg-cover bg-center bg-no-repeat"  style={{ backgroundImage: `url(${bgImg})` }}></div>
      </div>

      <div className="h-72 w-full bg-purple-400 mt-5"></div>
      <footer className="h-16 bg-blue-900 text-white text-center flex items-center justify-center">
        © {new Date().getFullYear()} t-Oasis. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;










