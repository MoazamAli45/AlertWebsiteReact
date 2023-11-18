import React, { useEffect, useState } from 'react';
import CustomTable from '../../PagesComponent/CustomTable/CustomTable';
import { useNavigate } from 'react-router-dom';
import RightArrow from '@/assets/icons/RightArrow';
import { Link } from 'react-scroll';
// import GreenCircularProgress from '@/assets/icons/GreenCircularProgress';
const Hero: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem('User');
    // console.log(user);
    let user;
    if (userString) {
      user = JSON.parse(userString);
      setIsLogin(true);
    }
    console.log(user);
  }, []);

  return (
    <section className="flex  gap-[5rem] lg:my-[2.5rem] py-[1.5rem] 2xl:py-[3.2rem] flex-wrap relative  flex-col lg:flex-row">
      {/*  Calls FLow Card */}
      {/* <div className=" card-progress_bar w-[200px]   justify-between  px-[1rem] items-center absolute -z-[10]  left-[480px] hidden lg:flex">
        <div className="flex flex-col gap-[.7rem] -mt-4">
          <h4 className="font-bold text-white opacity-[.5]  text-[.6rem] ">
            CALLS FLOW
          </h4>
          <p className="font-medium text-white text-[.8rem]">$22,457,169</p>
        </div>
        <div className="realtive">
          <GreenCircularProgress />
          <span className="text-[13px] font-medium text-white absolute  bottom-[66px]  right-[60px] ">
            78.7%
          </span>
        </div>
      </div> */}
      {/*  left content */}
      <div
        className="flex flex-col gap-[2rem] flex-1 flex-wrap ml:pt-[1rem] w-[97%]  sm:w-full 2xl:w-[90%]  mx-auto sm:m-0"
        data-aos="fade-right"
      >
        <h1 className="text-center   text-white font-bold text-[3rem]  2xl:text-[70px] ">
          The most
          <span className="text-secondary"> affordable </span>
          options platform
        </h1>
        <p className="tracking-wide text-[1rem] 2xl:text-[24px] font-[400] pb-[.5rem] text-center ">
          Stop overpaying for market data and become a member now.{' '}
          <p className="tracking-wide text-[1rem] 2xl:text-[24px]  text-center">
            Starting at only $14.99 a month
          </p>
        </p>

        {/*  button */}
        <div className="flex gap-[1.4rem] justify-center  lg:ml-[5rem] 2xl:justify-center">
          {!isLogin && (
            <button
              className="btn-signup px-[2.1rem] py-[.7rem] 2xl:text-[20px]"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          )}
          {isLogin && (
            <button
              className="btn-signup px-[2.1rem] py-[.7rem] 2xl:text-[20px]"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </button>
          )}
          <Link to="price" spy={true} smooth={true} duration={500}>
            <button className="btn-login px-[2rem] py-[.7rem] rounded-full 2xl:text-[20px] flex items-center gap-[.6rem] justify-center">
              Pricing <RightArrow />
            </button>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex-wrap" data-aos="fade-left">
        <CustomTable />
      </div>
    </section>
  );
};

export default Hero;
