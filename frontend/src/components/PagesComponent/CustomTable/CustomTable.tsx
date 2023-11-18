import React, { useLayoutEffect, useState } from 'react';
import Row from './Row';
import BackgroundTable from '/CustomTableBackground.png';
import { cleanOrders } from '@/utils/cleanOrders';
import { convertPremsToNumber } from '@/utils/convertPremsToNumber';
import { Order } from '@/features/option-flow/types';
import axios from 'axios';

const CustomTable: React.FC = () => {
  const [data, setData] = useState<Order[] | any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //    TODO to be changed by
  const time = '2023-11-08';
  useLayoutEffect(() => {
    setLoading(true);
    axios
      .get(`http://74.91.123.162/api/data?Date=${time}`)
      .then((response) => {
        // Handle the response data here
        console.log(response.data);
        setData(response?.data?.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [time]);
  const cleanedOrders: Order[] = cleanOrders(data);
  const ordersWithNumericPrems = cleanedOrders?.map((order, index) => ({
    ...order,
    numericPrems: convertPremsToNumber(order['Prems']),
    id: index + 1,
  }));
  // Sort orders based on numericPrems in descending order
  const sortedOrders = ordersWithNumericPrems?.sort(
    (a, b) => b.numericPrems - a.numericPrems,
  );
  // Find the maximum numericPrems value
  const maxNumericPrems = sortedOrders && sortedOrders[0]?.numericPrems;

  const premiumOrders =
    maxNumericPrems &&
    sortedOrders.map((order) => ({
      ...order,
      percent: ((order.numericPrems / maxNumericPrems) * 100).toFixed(0),
      width: `w-[${((order.numericPrems / maxNumericPrems) * 100).toFixed(
        0,
      )}%]`,
    }));
  console.log(premiumOrders);
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
        {loading && (
          <div className="flex justify-center items-center w-full h-full">
            <p>Loading....</p>
          </div>
        )}
        {!loading && (
          <div className="w-full flex flex-col items-center justify-start gap-1">
            {/* ==> Table rows (Map the data with this row component )  */}
            {/* ==> Make each row as a separate component to keep it as a separate entity */}
            {!loading &&
              premiumOrders &&
              premiumOrders
                ?.slice(0, 8)
                .map((item, index) => <Row item={item} key={index} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomTable;
