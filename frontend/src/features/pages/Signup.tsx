import PasswordInput from '@/components/PagesComponent/PasswordField/PasswordField';
import Logo1 from '/logo1.png';
import { Link } from 'react-router-dom';
import GoogleButton from '@/components/PagesComponent/GoogleButton/GoogleButton';
import PlusIcon from '@/assets/icons/PlusIcon';

const Signup = () => {
  return (
    <section className="min-h-screen flex justify-center items-center font-ibm py-[6rem] ml:py-0  page">
      {/*  Signup Card */}
      <div className="rounded-[24px] overflow-hidden w-[70%] flex  ml:flex-row  flex-col-reverse">
        <div className="ml:w-2/3  left-login px-[1.8rem] ml:p-[3rem]  2xl:p-[5rem] py-[2.4rem] pb-[3rem]">
          {/*  inside  Signup*/}
          <div className="flex flex-col gap-[1.2rem]">
            <h2 className="font-bold text-[3rem] 2xl:text-[52px] text-white">
              Signup
            </h2>
            <p className="text-[.9rem] 2xl:text-[18px] font-light">
              If You are already a member? Log In{' '}
              <Link to="/login" className="text-[#5B9BFF] underline">
                here
              </Link>
            </p>
            {/*   Name */}
            <div className="relative">
              <div className="absolute top-1/2 transform -translate-y-1/2 left-6 cursor-pointer text-[#152D4B]">
                <PlusIcon />
              </div>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-[2.6rem] outline-none py-[.9rem] rounded-[10px] text-[1rem] font-light text-[#152D4B] placeholder-[#152D4B] 
              "
              />
            </div>
            {/*   Email */}
            <div className="relative">
              <div className="absolute top-1/2 transform -translate-y-1/2 left-6 cursor-pointer text-[#152D4B]">
                @
              </div>
              <input
                type="text"
                placeholder="Email"
                className="w-full px-[2.6rem] outline-none py-[.9rem] rounded-[10px] text-[1rem] font-light text-[#152D4B] placeholder-[#152D4B] 
              "
              />
            </div>
            <PasswordInput />

            <GoogleButton />
          </div>
        </div>
        {/*   Right */}
        <div className="ml:w-1/3 right-login px-[2rem] py-[2.5rem] ml:px-[2.7rem] ml:py-[3.7rem]">
          <div className="flex flex-col justify-between  gap-[3rem] ">
            <div>
              <img src={Logo1} alt="logo" />
            </div>
            <div className="flex flex-col gap-[1rem] 2xl:gap-[1.2rem]">
              <h4 className="text-[1.4rem] 2xl:text-[1.6rem] font-semibold">
                “Lorem ipsum dolor sit amet consectetur ”
              </h4>
              <p className="text-[.8rem] font-normal 2xl:text-[1rem]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore
              </p>
              {/*   Uer Profile */}
              <div className="flex gap-[.8rem] items-center ">
                <div className="w-[40px] h-[40px] rounded-full bg-[#0B0B0B] flex justify-center items-center">
                  <h3 className="text-[1.5rem] font-semibold text-[#5B9BFF]">
                    M
                  </h3>
                </div>
                <h4 className="text-[1rem] font-semibold text-white">
                  Martin John
                </h4>
              </div>
            </div>
            {/*   3circles */}
            <div className="flex gap-[1rem] justify-center ">
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

export default Signup;
