import React from 'react';
import Category from '/Category.png';
import DatePicker from '/DatePickerImage.png';
import PurchaseTable from '/PurchaseTable.png';
import BackgroundImage from '/Design.png';
import GreenCircularProgress from '@/assets/icons/GreenCircularProgress';
import RedCircularProgress from '@/assets/icons/RedCircularProgress';
import SmallBackground from '/smallBackground.png';
const FeaturesSection: React.FC = () => {
  return (
    <section className="flex flex-col  py-[3rem] lg:my-[4rem] gap-[4rem] ">
      {/*   1st Div */}
      <div className="flex gap-[1.25rem] flex-wrap items-center  flex-col-reverse lg:flex-row ">
        <div className="lg:w-[50%] ">
          <img src={Category} alt="Category" className="lg:w-[80%]" />
        </div>
        <div className="flex flex-col gap-[2.5rem] lg:w-[45%] ml-auto">
          <h2 className="text-[3.25rem]  font-semibold text-white ">
            Features That Make It
            <span className="text-secondary"> Easy </span>
            For You
          </h2>
          <p className="text-[1rem] text-white font-normal leading-8">
            Our web app is in early access, here is what he currently offer.
            Some features require a premium membership with us, others are free
            if you have an account.
          </p>
        </div>
      </div>
      {/*   2nd div */}
      <div className="flex gap-[1.25rem]  items-center flex-col-reverse  lg:flex-row  justify-center  relative ">
        <img
          src={SmallBackground}
          alt="Small Background"
          className="absolute bottom-[10px] left-0 -z-[10]  "
        />
        <img
          src={BackgroundImage}
          alt="Background Image"
          className="absolute top-0 right-0 -z-[10] "
        />
        <div className=" lg:w-[50%] ">
          <h2 className="text-[3.25rem]  font-semibold text-white lg:w-[85%] ">
            <span className="text-secondary"> Historical </span> Flow with
            <span className="text-[#FFF585]"> premium statistics </span>
          </h2>
        </div>
        <div className="flex flex-col gap-[2.5rem]   lg:w-[45%] lg:ml-auto">
          <div className="flex flex-col gap-4">
            <div className="flex gap-[.7rem] flex-col  items-center sm:flex-row">
              {/*   Card1 */}
              <div className=" card-progress_bar w-full sm:w-1/2 flex  justify-between  p-[1rem] items-center ">
                <div className="flex flex-col gap-[.7rem]">
                  <h4 className="font-bold text-white opacity-[.5]  text-[.7rem] ">
                    CALLS PREMIUM
                  </h4>
                  <p className="font-medium text-white text-[1rem]">
                    $22,457,169
                  </p>
                </div>
                <div className="realtive">
                  <GreenCircularProgress />
                  <span className="text-[13px] font-medium text-white absolute  bottom-[66px]  right-[60px] ">
                    78.7%
                  </span>
                </div>
              </div>
              {/*  Card2 */}
              <div className=" card-progress_bar w-full sm:w-1/2 flex  justify-between px-[1.5rem] py-[.7rem] items-center ">
                <div className="flex flex-col gap-[.7rem] ">
                  <h4 className="font-bold text-white opacity-[.5]  text-[.7rem] ">
                    CALLS PREMIUM
                  </h4>
                  <p className="font-medium text-white text-[1rem]">
                    $22,457,169
                  </p>
                </div>
                <div className="realtive">
                  <RedCircularProgress />
                  <span className="text-[13px] font-medium text-white absolute  bottom-[66px]  right-[60px] ">
                    32.2%
                  </span>
                </div>
              </div>
            </div>
            <div className="">
              <img src={DatePicker} alt="Date Picker" className="w-full " />
            </div>
          </div>
        </div>
      </div>
      {/*  3rd  Div*/}
      <div className="flex gap-[1.25rem] flex-wrap  flex-col-reverse sm:flex-row relative">
        <div className="lg:w-[50%] ">
          <img src={PurchaseTable} alt="Purchase Table" className="w-[80%]" />
        </div>
        <div className="flex flex-col gap-[2.5rem] lg:w-[45%] ml-auto">
          <h2 className="text-[3.25rem]  font-semibold text-white ">
            <span className="text-secondary"> Track </span> trades within our
            flow
          </h2>
          <p className="text-[1rem] text-white font-normal leading-8">
            We analyze every trade that comes through our systems, and
            constantly scan their prices to see what the live prices of the
            contract are worth compared to the point it was bought/sold at.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
