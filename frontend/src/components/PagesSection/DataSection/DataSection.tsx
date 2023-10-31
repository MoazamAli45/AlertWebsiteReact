import React from 'react';

import DataTable from '/DataTable.jpg';
import BackgroundImage from '/Design.png';
import ClockIcon from '@/assets/icons/ClockIcon';
import HandIcon from '@/assets/icons/HandIcon';

const DataSection: React.FC = () => {
  return (
    <section
      className="flex mb-[3rem]  gap-[2rem] items-center lg:flex-row flex-col  relative "
      id="data"
    >
      <img
        src={BackgroundImage}
        alt="Background"
        className="absolute top-0 right-0 -z-[10]"
      />
      <div className="flex flex-col gap-[1.4rem] items-start  flex-1 justify-center sm:justify-start pl-[30px]">
        <h2 className="text-secondary text-[3rem] font-semibold 2xl:text-[52px] ">
          Options Flow
        </h2>
        <h3 className=" text-[2.8rem] text-white font-bold 2xl:text-[56px] 2xl:w-[90%] ">
          Real-time <span className="text-[#669CE9]">data</span> with advanced
          features
        </h3>
        <p className="text-[1.2rem] font-normal 2xl:text-[24px] ">
          Discover what <span className="text-[#669CE9]">contracts</span>{' '}
          individuals are buying/selling
        </p>
        {/*   Boxes */}
        <div className="flex flex-col gap-[1.5rem] w-[95%] mx-auto  sm:mx-0 sm:w-[95%]  ">
          <div className="data-box px-[3.4rem] py-[2rem]  ">
            <div className="flex gap-[1.4rem] items-center flex-wrap sm:flex-row flex-col">
              <div>
                <ClockIcon />
              </div>
              <div className="flex flex-col gap-[.7rem]">
                <h4 className="text-[1.4rem] 2xl:text-[26px] font-medium">
                  Instant order alerts
                </h4>
                <p className="text-[.9rem] 2xl:text-[16px] font-medium">
                  Be notified of trades people are taking instantly
                </p>
              </div>
            </div>
          </div>
          <div className="data-box px-[3.4rem] py-[2rem]">
            <div className="flex gap-[2rem] items-center flex-wrap sm:flex-row flex-col">
              <div>
                <HandIcon />
              </div>
              <div className="flex flex-col gap-[.8rem]">
                <h4 className="text-[1.4rem] 2xl:text-[26px] font-medium">
                  Accessibility
                </h4>
                <p className="text-[.9rem] 2xl:text-[16px] font-medium">
                  Navigate and access our data with ease
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className=" relative 2xl:w-full  ">
          <img
            src={DataTable}
            alt="Data Table"
            className=" object-contain  pt-[3.8rem] 2xl:object-cover 2xl:w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default DataSection;
