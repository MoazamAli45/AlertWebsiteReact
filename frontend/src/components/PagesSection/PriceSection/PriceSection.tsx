import React from 'react';
import PriceCard from '/price-card.png';
import DiamondIcon from '@/assets/icons/DiamondIcon';
import CircleTick from '@/assets/icons/CircleTick';
import Wrapper from '@/components/PagesComponent/Wrapper/Wrapper';

const data = [
  {
    btn: 'Annual',
    type: 'Monthly',
    save: false,
    price: '$14.99',
    line1: 'Real-time Options Flow',
    line2: 'Mobile/Web alerts based on filters',
    line3: 'Performance tracking',
    line4: 'Real-time market news',
    line5: 'Historical data ',
    showBtn: false,
  },
  {
    btn: 'Monthly',
    type: 'Yearly',
    save: true,
    price: '$100',
    line1: 'Benefits one lorem ipsum',
    line2: 'Benefits one lorem ipsum',
    line3: 'Benefits one lorem ipsum',
    line4: 'Benefits one lorem ipsum',
    line5: 'Benefits one lorem ipsum',
    showBtn: true,
  },
  {
    btn: 'Lifetime',
    type: 'Lifetime',
    save: true,
    price: '$250',
    line1: 'Benefits one lorem ipsum',
    line2: 'Benefits one lorem ipsum',
    line3: 'Benefits one lorem ipsum',
    line4: 'Benefits one lorem ipsum',
    line5: 'Benefits one lorem ipsum',
    showBtn: false,
  },
];

const PriceSection: React.FC = () => {
  return (
    <section
      className="flex flex-col  gap-[4rem] mb-[70px] w-[90%] 2xl:w-[85%]    mx-auto"
      id="price"
    >
      <h2 className="text-[52px]  font-bold text-white text-center  ">
        Choose your plan with <br /> our all-inclusive
        <span className="text-[#669CE9]"> membership </span>
      </h2>

      <div className="grid gap-y-[20px]  gap-x-[20px] grid-cols-1 sm:grid-cols-2 ml:grid-cols-3 w-full">
        {/*  Price Cards */}
        {data.map((item, id) => (
          <div className="col-span-1" key={id}>
            <div className="flex justify-center -mb-[27px] mr-[7px]">
              <button className="btn-price py-[10px]  text-[14px]  2xl:text-[18px]  ">
                {item.btn}
              </button>
            </div>
            <div className="w-full h-[480px] 2xl:h-[510px]  rounded-3xl relative flex flex-col py-[40px] 2xl:py-[50px] 2xl:px-[30px] px-[20px] gap-[30px]">
              <img
                src={PriceCard}
                alt="Price Card"
                className="w-full h-full absolute top-0 left-0 -z-[10]"
              />
              {/*  Inside Card */}

              <div className="flex justify-between items-center">
                <div className="flex  items-center">
                  <DiamondIcon />
                  <h4 className="text-[18px] 2xl:text-[22px] text-white text-bold">
                    {item.type}
                  </h4>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[26px] 2xl:text-[30px] font-bold">
                    {item.price}
                  </h3>
                  {item.save && (
                    <span className="text-[14px] 2xl:text-[16px] font-normal">
                      Save 20%
                    </span>
                  )}
                </div>
              </div>
              <div
                className="flex flex-col gap-[20px]  border-solid border-t-[1px]   border-b-[1px]  py-[25px] "
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <div className="flex mx-[10px] gap-[20px] items-center ">
                  <CircleTick />
                  <span className="text-white text-[14px] font-normal">
                    {item.line1}
                  </span>
                </div>
                <div className="flex mx-[10px] gap-[20px] items-center ">
                  <CircleTick />
                  <span className="text-white text-[14px] font-normal">
                    {item.line2}
                  </span>
                </div>
                <div className="flex mx-[10px] gap-[20px] items-center ">
                  <CircleTick />
                  <span className="text-white text-[14px] font-normal">
                    {item.line3}
                  </span>
                </div>
                <div className="flex mx-[10px] gap-[20px] items-center ">
                  <CircleTick />
                  <span className="text-white text-[14px] font-normal">
                    {item.line4}
                  </span>
                </div>
                <div className="flex mx-[10px] gap-[20px] items-center ">
                  <CircleTick />
                  <span className="text-white text-[14px] font-normal">
                    {item.line5}
                  </span>
                </div>
              </div>
              {/*  Btn */}
              {item.showBtn && (
                <div className="w-[90%] mx-auto">
                  <button className="btn-login flex items-center w-full justify-center py-[10px] rounded-full 2xl:text-[20px]">
                    Subscribe
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PriceSection;
