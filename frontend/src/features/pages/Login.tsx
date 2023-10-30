import { Link } from 'react-router-dom';
import Logo1 from '/logo1.png';
import PasswordInput from '@/components/PagesComponent/PasswordField/PasswordField';
import GoogleButton from '@/components/PagesComponent/GoogleButton/GoogleButton';
import React from 'react';
const Login: React.FC = () => {
  return (
    <section className="min-h-screen flex justify-center items-center font-ibm py-[6rem] ml:py-0  page">
      {/*  Login Card */}
      <div className="rounded-[24px] overflow-hidden w-[70%] flex  ml:flex-row  flex-col-reverse">
        <div className="ml:w-2/3  left-login px-[1/9rem] ml:p-[3rem] py-[2.5rem]">
          {/*  inside  Login*/}
          <div className="flex flex-col gap-[1.4rem]">
            <h2 className="font-bold text-[3rem] text-white">Login</h2>
            <p className="text-[.9rem] font-light">
              Not a member? Sign up{' '}
              <Link to="/signup" className="text-[#5B9BFF] underline">
                here
              </Link>
            </p>
            <div className="relative">
              <div className="absolute top-1/2 transform -translate-y-1/2 left-6 cursor-pointer text-[#152D4B]">
                @
              </div>
              <input
                type="text"
                placeholder="Email"
                className="w-full px-[2.5rem] outline-none py-[.9rem] rounded-[10px] text-[1rem] font-light text-[#152D4B] placeholder-[#152D4B] 
              "
              />
            </div>
            <PasswordInput />
            <p className="text-[.9rem] font-light">
              Forget password? Reset{' '}
              <a href="#" className="text-[#5B9BFF] underline">
                here
              </a>
            </p>
            <GoogleButton />
          </div>
        </div>
        {/*   Right */}
        <div className="ml:w-1/3 right-login px-[2rem] py-[2.5rem] ml:px-[2.5rem] ml:py-[3.8rem]">
          <div className="flex flex-col justify-between  gap-[3rem] ">
            <div>
              <img src={Logo1} alt="logo" />
            </div>
            <div className="flex flex-col gap-[2rem]">
              <h4 className="text-[1.4rem] font-semibold">
                Become a member today for free
              </h4>
              <p className="text-[.8rem] font-normal">
                Limited data unless subscription is upgraded{' '}
              </p>
            </div>
            {/*   3circles */}
            <div className="flex gap-[.7rem] justify-center">
              <div className="w-[7px] h-[7px] rounded-full bg-white"></div>
              <div className="w-[7px] h-[7px] rounded-full bg-white"></div>
              <div className="w-[7px] h-[7px] rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
