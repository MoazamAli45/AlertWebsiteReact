import React from 'react';

interface RowProps {
  item: {
    name: string;
    price: number;
    width: string;
    id: number;
  };
}

const Row: React.FC<RowProps> = ({ item }) => {
  return (
    <>
      <div
        className={`group w-full 2xl:w-[95%] 2xl:mx-auto grid grid-cols-3 relative z-10 pt-3  pb-[1rem] rounded-lg 
        transform    transition-all duration-[400ms]
         ${
           item.id === 1
             ? 'group bg-[#40B5AD] scale-x-[1.3] lg:scale-x-[1.4] 2xl:scale-x-[1.35]  px-5 2xl:pl-[60px]  transform    transition-all duration-[400ms]'
             : ' hover:bg-[#40B5AD] hover:scale-x-[1.3] hover:px-5 2xl:hover:pl-[60px]  2xl:hover:scale-x-[1.35]  lg:hover:scale-x-[1.4] '
         }
         
         `}
      >
        {/* ==> Entry 1  */}
        <div
          className={`text-[.7rem]    lg:text-[.8rem] 2xl:text-[18px] font-[700]  ${
            item.id === 1
              ? ' text-[.8rem] lg:text-[1.2rem] 2xl:text-[18px]'
              : 'group-hover:text-[.8rem] lg:group-hover:text-[1.2rem] 2xl:group-hover:text-[18px]'
          } `}
        >
          {item.name}
        </div>
        {/* ==> Entry 2  */}
        <div
          className={`text-[.7rem]  lg:text-[.8rem] 2xl:text-[18px] font-[700] 
        ${
          item.id === 1
            ? ' text-[.8rem] lg:text-[1.2rem] 2xl:text-[18px]'
            : 'group-hover:text-[.8rem] lg:group-hover:text-[1.2rem] 2xl:group-hover:text-[18px]'
        } `}
        >
          Call
        </div>
        {/* ==> Entry 3  */}
        <div
          className={`text-[.7rem]  lg:text-[.8rem] font-[700]  2xl:text-[18px]
          ${
            item.id === 1
              ? ' text-[.8rem] lg:text-[1.2rem] 2xl:text-[18px]'
              : 'group-hover:text-[.8rem] lg:group-hover:text-[1.2rem] 2xl:group-hover:text-[18px]'
          }  `}
        >
          ${item.price}
        </div>
        {/* ==> Background  */}
        <div
          className={`${item.width} h-full absolute top-0 left-0 bg-[#40B5AD] bg-opacity-20 z-0`}
        ></div>
      </div>
    </>
  );
};

export default Row;
