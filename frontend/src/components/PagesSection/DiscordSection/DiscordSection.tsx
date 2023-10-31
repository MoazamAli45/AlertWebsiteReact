import React from 'react';
import ClockIcon from '@/assets/icons/ClockIcon';
import HandIcon from '@/assets/icons/HandIcon';
import DiscordImage from '/DicordImage.png';
import BackgroundImage from '/Design.png';
import SmallBackground from '/smallBackground.png';
import Wrapper from '@/components/PagesComponent/Wrapper/Wrapper';
import GlowComponent from '@/components/PagesComponent/GlowComponent/GlowComponent';

const DiscordSection: React.FC = () => {
  return (
    <section className="  relative " id="about">
      <img
        src={SmallBackground}
        alt="Background"
        className="absolute -bottom-[200px] left-0 -z-[10]"
      />
      <img
        src={BackgroundImage}
        alt="Background"
        className="absolute -bottom-[200px] right-0 -z-[10]"
      />
      <Wrapper>
        <div className="flex my-[4rem] py-[2rem]  gap-[2rem] items-center lg:flex-row flex-col">
          <div
            className="flex flex-col gap-[12px] flex-1 justify-center sm:justify-start"
            data-aos="fade-right"
          >
            <h2 className="text-secondary text-[48px] 2xl:text-[52px] font-normal ">
              Join us on <span className="text-[#669CE9]">Discord</span>
            </h2>
            <h3 className=" text-[40px] 2xl:text-[44px] text-white font-bold">
              <span className="text-[#32D3C1]">Connect</span> with other traders
              or ask questions.
            </h3>
            <p className="text-[20px] 2xl:text-[22px] font-normal ">
              If you don&rsquo;t have discord, you can email us at the following
            </p>
            {/*   Boxes */}
            <div className="flex flex-col gap-[1.5rem]">
              <div className="data-box px-[3.4rem] py-[2rem] ">
                <div className="flex gap-[1.4rem] items-center  sm:flex-row flex-col">
                  <div>
                    <ClockIcon />
                  </div>
                  <div className="flex flex-col gap-[.7rem]">
                    <h4 className="text-[20px] 2xl:text-[26px] font-medium">
                      {' '}
                      &lt; 1 Sec Operations
                    </h4>
                    <p className="text-[13px] 2xl:text-[1rem] font-medium">
                      Alert Algo provides automatic alerts of when to buy and
                      sell.
                    </p>
                  </div>
                </div>
              </div>
              <div className="data-box px-[2.5rem] py-[2rem]">
                <div className="flex gap-[2rem] items-center  sm:flex-row flex-col">
                  <div>
                    <HandIcon />
                  </div>
                  <div className="flex flex-col gap-[.8rem]">
                    <h4 className="text-[20px] 2xl:text-[26px] font-medium">
                      No Commissions
                    </h4>
                    <p className="text-[13px] 2xl:text-[1rem] font-medium">
                      Alert Algo provides automatic alerts of when to buy and
                      sell.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className=" relative ">
              <GlowComponent className="absolute left-[80px] -top-[80px] -z-[1]" />
              <img
                src={DiscordImage}
                alt="Data Table"
                className=" object-contain  pt-[3.8rem] 2xl:w-full "
                data-aos="fade-left"
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default DiscordSection;
