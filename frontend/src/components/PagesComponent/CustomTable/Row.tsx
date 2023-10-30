import React from 'react';

interface RowProps {
  item: {
    name: string;
    price: number;
    width: string;
  };
}

const Row: React.FC<RowProps> = ({ item }) => {
  return (
    <div
      className={`group w-full grid grid-cols-3 relative z-10 pt-3  pb-[1rem] rounded-lg 
         hover:bg-[#40B5AD] hover:scale-x-[1.3] hover:px-5  lg:hover:scale-x-[1.4] transform    transition-all duration-[400ms]`}
    >
      {/* ==> Entry 1  */}
      <div className="text-[.7rem]  lg:text-[.8rem] font-[700] group-hover:text-[.8rem] lg:group-hover:text-[1.2rem]">
        {item.name}
      </div>
      {/* ==> Entry 2  */}
      <div className="text-[.7rem]  lg:text-[.8rem] font-[700] group-hover:text-[.8rem] lg:group-hover:text-[1.2rem]">
        Call
      </div>
      {/* ==> Entry 3  */}
      <div className="text-[.7rem]  lg:text-[.8rem] font-[700] group-hover:text-[.8rem] lg:group-hover:text-[1.2rem]">
        ${item.price}
      </div>
      {/* ==> Background  */}
      <div
        className={`${item.width} h-full absolute top-0 left-0 bg-[#40B5AD] bg-opacity-20 z-0`}
      ></div>
    </div>
  );
};

export default Row;
