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
      <div className="flex flex-col gap-[1.4rem] flex-1 justify-center sm:justify-start pl-[30px]">
        <h2 className="text-secondary text-[3rem] font-semibold ">
          Options Flow
        </h2>
        <h3 className=" text-[2.8rem] text-white font-bold">
          Real-time <span className="text-[#669CE9]">data</span> with advanced
          features
        </h3>
        <p className="text-[1.2rem] font-normal ">
          Discover what <span className="text-[#669CE9]">contracts</span>{' '}
          individuals are buying/selling
        </p>
        {/*   Boxes */}
        <div className="flex flex-col gap-[1.5rem]">
          <div className="data-box px-[3.4rem] py-[2rem] ">
            <div className="flex gap-[1.4rem] items-center flex-wrap sm:flex-row flex-col">
              <div>
                <ClockIcon />
              </div>
              <div className="flex flex-col gap-[.7rem]">
                <h4 className="text-[1.4rem] font-medium">
                  Instant order alerts
                </h4>
                <p className="text-[.9rem] font-medium">
                  Be notified of trades people are taking instantly
                </p>
              </div>
            </div>
          </div>
          <div className="data-box px-[2.5rem] py-[2rem]">
            <div className="flex gap-[2rem] items-center flex-wrap sm:flex-row flex-col">
              <div>
                <HandIcon />
              </div>
              <div className="flex flex-col gap-[.8rem]">
                <h4 className="text-[1.4rem] font-medium">Accessibility</h4>
                <p className="text-[.9rem] font-medium">
                  Navigate and access our data with ease
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className=" relative ">
          <img
            src={DataTable}
            alt="Data Table"
            className=" object-contain  pt-[3.8rem]"
          />
        </div>
      </div>
    </section>
  );
};

export default DataSection;
