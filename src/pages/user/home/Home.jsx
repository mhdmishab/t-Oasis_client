import React, { useEffect, useState } from 'react';
import bgImg from '../../../assets/images/signupbg.jpg';
import toasis from '../../../assets/images/toasis3.jpg';
import carWash from '../../../assets/images/carWash4.avif'
import evCharge from '../../../assets/images/evCharge2.jpg'
import roadMap from '../../../assets/images/roadMap.png';
import liveChat from '../../../assets/images/liveChat2.png';
import twentyFour from '../../../assets/images/twentyFour.png';
import gameZone from '../../../assets/images/gameZone2.jpg'
import search from '../../../assets/images/searching.gif'
import sleepPods from '../../../assets/images/sleepPods5.webp'
import { useDispatch, useSelector } from 'react-redux';
import { getlounges } from '../../../slices/user/Lounges';
import { Carousel } from 'antd'
import { useNavigate } from 'react-router-dom';

function Home() {
  const lounges = useSelector((state) => state.loungeuser).lounges;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [more,setMore]=useState(false);
  const handleclick = () => {
    navigate('/search-lounges')
  }
  
  const contentStyle = {
    margin: '67px 0 0',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    height: '85vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };


  

  useEffect(() => {
    dispatch(getlounges()).then((response) => {
      console.log(response);
    });
  }, [dispatch]);

  console.log(lounges);

  return (
    <>
    <div className="p-6 m-0">

      <Carousel autoplay>
        <div>
          <h3 style={{ ...contentStyle, backgroundImage: `url(${toasis})` }} className="text-white flex-col  items-center justify-around text-5xl font-semibold md:text-6xl leading-tight">
            T-Oasis
            <p className="text-black text-lg mt-4 md:text-xl md:leading-relaxed">
            A welcoming haven for travelers,<br/> we are dedicated to catering to your every need,<br/>  enhancing your journey with unmatched service and care.
            </p>
          </h3>

        </div>
        <div>
          <h3 style={{ ...contentStyle, backgroundImage: `url(${sleepPods})` }} className="text-white flex-col  items-center justify-around text-5xl font-semibold md:text-6xl leading-tight">
            Sleep Pods
            <p className="text-black text-lg mt-4 md:text-xl md:leading-relaxed">
            Good SleepPods service provides travelers with a haven of rest <br/>and relaxation, offering comfortable, private sleeping accommodations.<br/>
             With a focus on quality sleep, these pods offer a peaceful<br/> escape within busy environments,ensuring that travelers can <br/>rejuvenate and recharge, ready for their next journey.
         
            </p>
          </h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, backgroundImage: `url(${carWash})` }} className="text-white flex-col  items-center justify-around text-5xl font-semibold md:text-6xl leading-tight">
            Car Wash
            <p className="text-black text-lg mt-4 md:text-xl md:leading-relaxed">
            A good car wash service delivers more than just a clean vehicle.<br/> It's a seamless experience that combines efficiency, quality, and<br/> attention to detail. From the thorough cleaning of every nook and<br/>
             cranny to a sparkling finish, it ensures your vehicle <br/>not only looks great but also maintains its value and appeal.
            </p>
          </h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, backgroundImage: `url(${evCharge})` }} className="text-white flex-col  items-center justify-around text-5xl font-semibold md:text-6xl leading-tight">
            Ev Charge
            <p className="text-black text-lg mt-4 md:text-xl md:leading-relaxed">
              
            EV charging service is the future of sustainable transportation. It provides a network <br/>of charging stations that enable electric vehicle owners to recharge conveniently.<br/>
             With a focus on eco-friendliness and accessibility, it empowers <br/>individuals to reduce their carbon footprint and transition to clean, <br/>efficient electric mobility.
            </p>
          </h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, backgroundImage: `url(${gameZone})` }} className="text-white flex-col items-center justify-around text-5xl font-semibold md:text-6xl leading-tight">
            Game Station
            <p className="text-black text-lg mt-4 md:text-xl md:leading-relaxed">
            A game station service is a gaming enthusiast's haven, offering a wide array<br/> of games, accessories, and an immersive gaming environment. Gamers can enjoy the<br/>
             latest releases, compete with friends, and explore new worlds. It's a hub where<br/> entertainment, competition, and community converge for an unforgettable<br/> gaming experience.
            </p>
          </h3>
        </div>

      </Carousel>

      <div className=" mt-5 flex justify-center items-center">
      
      <img className='cursor-pointer w-32 h-32' onClick={handleclick} src={search} alt="search-locations" />
      </div>

      <div className='h-auto w-auto flex flex-wrap justify-center items-center  bg-opacity-40'>
        <div className='flex-col'>
          <div className='w-72 h-72 m-3 flex items-center justify-center'>
            <img src={roadMap} alt="Description" />
          </div>
          <div className='my-4 flex justify-center items-center'>
            <p className='text-2xl font-semibold'>ALL AROUND COUNTRY</p>
          </div>
        </div>
        <div className='flex-col'>
          <div className='w-72 h-72 m-3 flex items-center justify-center'>
            <img src={liveChat} alt="Description" />
          </div>
          <div className='my-4 flex justify-center items-center'>
            <p className='text-2xl font-semibold'>LIVE CHAT SUPPORT</p>
          </div>
        </div>
        <div className='flex-col'>
          <div className='w-72 h-72 m-3 flex items-center justify-center'>
            <img src={twentyFour} alt="Description" />
          </div>
          <div className='my-4 flex justify-center items-center'>
            <p className='text-2xl font-semibold'>24/7 SERVICE</p>
          </div>
        </div>
        
      </div>



      <div className="flex justify-center items-center p-10 md:p-28" >
        
       <div className='flex-col'>
        
          <h1 className="text-black text-xl md:text-3xl lg:text-4xl font-semibold mb-4">
            About Us
          </h1>
          <p className={`text-black md:text-base md:leading-relaxed lg:text-lg font-roboto ${more?'line-clamp-none':'line-clamp-none lg:line-clamp-4'}`}>
          T-Oasis is a game-changer in the realm of travel experiences. It revolutionizes the concept of rest stops, introducing travelers to a whole new level of relaxation and convenience. With a strong emphasis on innovation and sustainability, T-Oasis delivers a fresh and inventive take on comfort and cleanliness that sets it apart from traditional travel facilities.
At the heart of this visionary initiative is a commitment to enhancing the overall travel experience. It's not just about a brief pause on a journey; it's about redefining the standards of travel convenience and comfort. Moreover, T-Oasis stands as a testament to a profound dedication to promoting responsible and sophisticated sanitation practices,{more?null:<span className={`text-sm cursor-pointer`} onClick={()=>setMore(true)}>more</span>} aligning with the evolving needs of the community.
Incorporating T-Oasis within the Travlounge network marks a significant step forward in making travel not just a means of reaching a destination, but an enriching and rejuvenating experience in its own right. It's a testament to Travlounge's leadership in catering to the changing demands and expectations of modern travelers, all while ensuring a sustainable and responsible approach to travel services.
          </p>
          </div>
      </div>
      </div>

      <div className="h-full flex justify-around flex-wrap text-white w-full bg-blue-900 px-10 py-16 ">


      <div className='flex-col items-start hidden md:block mt-3 md:mt-0'>
            <h2 className='mb-2 text-lg font-semibold'>Contact</h2>
            <p className='flex'><svg fill="none" className='w-5 h-5 mr-1' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>Calicut-08,Kerala</p>
            <p className='flex'><svg fill="none" className='w-5 h-5 mr-1' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>toasisofficial@gmail.com</p>
            <p className='flex'><svg className='w-5 h-5 mr-1' fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>+91 7732901234</p>
          </div>
       
          <div className='flex-col items-center justify-center mt-5 md:mt-0'>
        
          <h2 className='mb-2 text-lg font-semibold'>Privacy Notice</h2>
                <p><span className='font-semibold text-xl'>t-Oasis</span>, Inc. is committed to protecting your privacy.<br/> We will not share or sell your personal information<br/> to third parties. For more information, please review our<br/> <a href="/privacy-policy">Privacy Policy</a>.</p>
          </div>

          <div className='flex-col items-center justify-center mt-5 md:mt-0'>
           
            <h2 className='mb-2 text-lg font-semibold'>Cookies Notice</h2>
                <p>This website uses cookies to enhance your browsing experience<br/> and provide personalized content. By using this website,<br/> you consent to our use of cookies. For more information,<br/> please review our <a href="/cookie-policy">Cookie Policy</a>.</p>
          
          </div>
          


        
      </div>
      <footer className="h-10 bg-blue-900 text-white text-center flex items-center justify-center bg-opacity-80">
        © {new Date().getFullYear()} t-Oasis. All rights reserved.
      </footer>
      </>
  );
}

export default Home;










