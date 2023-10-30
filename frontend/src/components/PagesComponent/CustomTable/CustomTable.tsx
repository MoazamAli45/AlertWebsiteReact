import React from 'react';
import Row from './Row';
import BackgroundTable from '/CustomTableBackground.png';
interface DataItem {
  key: number;
  name: string;
  price: number;
  width: string; // Add the 'width' property to the data item
}

const data: DataItem[] = [
  { key: 0, name: 'SPY', price: 7088659, width: 'w-[100%]' },
  { key: 25, name: 'NVDA', price: 3809036, width: 'w-[80%]' },
  { key: 50, name: 'QQQ', price: 2542176, width: 'w-[70%]' },
  // { key: 50, name: 'META', price: 1858870, width: 'w-[70%]' },
  { key: 50, name: 'IWM', price: 1504351, width: 'w-[60%]' },
  // { key: 50, name: 'TSLA', price: 1501251, width: 'w-[40%]' },
  { key: 50, name: 'AMD', price: 1322782, width: 'w-[30%]' },
  { key: 50, name: 'AAPL', price: 1201369, width: 'w-[20%]' },
  { key: 50, name: 'AMZN', price: 1167080, width: 'w-[10%]' },
  { key: 50, name: 'GOOGLE', price: 197364, width: 'w-[10%]' },
];

const CustomTable: React.FC = () => {
  const mappedData: DataItem[] = data.map((item) => ({
    ...item,
  }));

  return (
    <div
      className="w-[80%] mx-auto lg:mx-0    lg:w-full h-full     xl:w-[530px] xl:mx-auto    flex flex-col justify-start bg-cover py-[2rem] px-[2.5rem] rounded-3xl gap-[1.2rem] md:w-[80%]"
      style={{
        backgroundImage: `url(${BackgroundTable})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {/* Heading  */}
      <h2 className="text-[#FFFFFF80] font-semibold text-[1rem] text-left">
        Top Gainers
      </h2>
      {/* Table  */}
      <div className="max-w-[400px] h-auto flex flex-col items-center justify-start text-center gap-2 ">
        {/* Table Header  */}
        <div className="w-full grid grid-cols-3 bg-transparent bg-opacity-40 py-3 rounded-lg">
          {/* ==> Col 1  */}
          <div className="text-[.8rem] bg-transparent font-normal text-white">
            Symbol
          </div>
          {/* ==> Col 2  */}
          <div className="text-[.8rem] bg-transparent font-normal text-white">
            Contract
          </div>
          {/* ==> Col 3  */}
          <div className="text-[.8rem] bg-transparent font-normal text-white">
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
