import React from 'react';
import Row from './Row';
import BackgroundTable from '/CustomTableBackground.png';
interface DataItem {
  id: number;
  name: string;
  price: string;
  width: string; // Add the 'width' property to the data item
}

const data: DataItem[] = [
  { id: 1, name: 'SPY', price: '7,088,659', width: 'w-[100%]' },
  { id: 2, name: 'NVDA', price: '3,809,036', width: 'w-[80%]' },
  { id: 3, name: 'QQQ', price: '2,542,176', width: 'w-[70%]' },
  { id: 4, name: 'IWM', price: '1,504,351', width: 'w-[60%]' },
  { id: 5, name: 'AMD', price: '1,322,782', width: 'w-[30%]' },
  { id: 6, name: 'AAPL', price: '1,201,369', width: 'w-[20%]' },
  { id: 7, name: 'AMZN', price: '1,167,080', width: 'w-[10%]' },
  { id: 8, name: 'GOOGLE', price: '197,364', width: 'w-[10%]' },
];

const CustomTable: React.FC = () => {
  const mappedData: DataItem[] = data.map((item) => ({
    ...item,
  }));

  return (
    <div
      className="w-[80%] mx-auto lg:mx-0    lg:w-full h-full     xl:w-[530px] xl:mx-auto  2xl:w-[550px] 2xl:py-[3rem] 2xl:px-[3rem] flex flex-col justify-start bg-cover py-[2rem] px-[2.5rem] rounded-3xl gap-[1.2rem] md:w-[80%]"
      style={{
        backgroundImage: `url(${BackgroundTable})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {/* Heading  */}
      <h2 className="text-[#FFFFFF80] font-semibold text-[1rem] 2xl:text-[20px] text-left">
        Top Gainers
      </h2>
      {/* Table  */}
      <div className="max-w-[400px]  h-auto flex flex-col items-center justify-start text-center gap-2 ">
        {/* Table Header  */}
        <div className="w-full grid grid-cols-3 bg-transparent bg-opacity-40 py-3 rounded-lg">
          {/* ==> Col 1  */}
          <div className="text-[.8rem] 2xl:col-span-1 2xl:text-[18px] bg-transparent font-normal text-white">
            Symbol
          </div>
          {/* ==> Col 2  */}
          <div className="text-[.8rem] 2xl:col-span-1 2xl:text-[18px] bg-transparent font-normal text-white">
            Contract
          </div>
          {/* ==> Col 3  */}
          <div className="text-[.8rem] 2xl:col-span-1  2xl:text-[18px] bg-transparent font-normal text-white">
            Premium
          </div>
        </div>
        {/* Table Body  */}
        <div className="w-full flex flex-col items-center justify-start gap-1">
          {/* ==> Table rows (Map the data with this row component )  */}
          {/* ==> Make each row as a separate component to keep it as a separate entity */}
          {mappedData.map((item, index) => (
            <Row item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
