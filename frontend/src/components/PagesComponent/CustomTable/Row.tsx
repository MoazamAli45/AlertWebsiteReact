import React from 'react';

interface RowProps {
  item: any;
  key: number;
}

const Row: React.FC<RowProps> = ({ item }) => {
  return (
    <>
      <div
        className={`group w-full 2xl:w-[95%] 2xl:mx-auto grid grid-cols-3 relative z-10 pt-3  pb-[1rem] rounded-lg
        transform    transition-all duration-[400ms]
         ${
           item.percent === '100'
             ? 'group bg-[#40B5AD] scale-x-[1.3] lg:scale-x-[1.4] 2xl:scale-x-[1.45] px-5  sm:px-[50px] transform    transition-all duration-[400ms]'
             : ' hover:bg-[#40B5AD] hover:scale-x-[1.3] hover:px-5 2xl:hover:px-[50px]  2xl:hover:scale-x-[1.45]  lg:hover:scale-x-[1.4] '
         }

         `}
      >
        {/* ==> Entry 1  */}
        <div
          className={`text-[.7rem] blur-[1px] 2xl:blur-[2px]  lg:text-[.8rem] 2xl:text-[18px] font-[500]  ${
            item.percent === '100'
              ? ' text-[.8rem] lg:text-[1.2rem] 2xl:text-[18px] blur-none 2xl:blur-none'
              : 'group-hover:text-[.8rem] lg:group-hover:text-[1.2rem] 2xl:group-hover:text-[18px] group-hover:blur-none '
          } `}
        >
          {item.Symbol}
        </div>
        {/* ==> Entry 2  */}
        <div
          className={`text-[.7rem]  lg:text-[.8rem] 2xl:text-[18px] font-[500] blur-[1px] 2xl:blur-[2px]
        ${
          item.percent === '100'
            ? ' text-[.8rem] lg:text-[1.2rem] 2xl:text-[18px] blur-none 2xl:blur-none'
            : 'group-hover:text-[.8rem] lg:group-hover:text-[1.2rem] 2xl:group-hover:text-[18px] group-hover:blur-none'
        } `}
        >
          {item['C/P']}
        </div>
        {/* ==> Entry 3  */}
        <div
          className={`text-[.7rem]  lg:text-[.8rem] font-[500]  2xl:text-[18px] blur-[1px] 2xl:blur-[2px]
          ${
            item.percent === '100'
              ? ' text-[.8rem] lg:text-[1.2rem] 2xl:text-[18px] blur-none 2xl:blur-none'
              : 'group-hover:text-[.8rem] lg:group-hover:text-[1.2rem] 2xl:group-hover:text-[18px] group-hover:blur-none'
          }  `}
        >
          ${item['numericPrems'].toLocaleString()}
        </div>
        {/* ==> Background  */}
        <div
          style={{ width: `${item.percent}%` }}
          className={`h-full absolute top-0 left-0 bg-[#40B5AD] bg-opacity-20 z-0`}
        ></div>
      </div>
    </>
  );
};

export default Row;
