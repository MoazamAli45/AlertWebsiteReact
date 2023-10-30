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
      className={`group w-full grid grid-cols-3 relative z-10 py-3 rounded-lg 
         hover:bg-[#40B5AD] hover:scale-x-[1.4] transform    transition-all duration-300`}
    >
      {/* ==> Entry 1  */}
      <div className="text-[.8rem] font-[700] group-hover:text-[1rem]">
        {item.name}
      </div>
      {/* ==> Entry 2  */}
      <div className="text-[.8rem] font-[700] group-hover:text-[1rem]">
        Call
      </div>
      {/* ==> Entry 3  */}
      <div className="text-[.8rem] font-[700] group-hover:text-[1rem]">
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
