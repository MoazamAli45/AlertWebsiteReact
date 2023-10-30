import schedule from 'node-schedule';
import axios from 'axios';
import config from '@/config';
import Order from '@/models/order';
import { getLatestMarketOpen } from '@/utils';

export const fetchLatestOrdersJob = async () => {
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [1, 2, 3, 4, 5];
  rule.minute = new schedule.Range(0, 59, 2);
  rule.tz = 'America/New_York';

  schedule.scheduleJob(rule, async () => {
    console.log('fetchLatestOrders job called');
    fetchOrders({ time: getLatestMarketOpen().toUnixInteger() });
  });
};

async function saveToDatabase({ orders }: { orders: any }) {
  if (!orders || orders.length === 0) {
    return;
  }

  for (const order of orders) {
    const existingOrder = await Order.findOne({
      timestamp: order.timestamp,
    });

    if (!existingOrder) {
      const newOrder = new Order({
        ...order,
        time: getLatestMarketOpen().toUnixInteger(),
      });
      await newOrder.save();
    }
  }
}

async function fetchSymbolRecursive({
  symbol,
  time,
  page = 1,
}: any): Promise<any> {
  const LIMIT = 200;
  const { data } = await axios.get(
    `${config.api.orders.url}?symbol=${symbol}&ts=${time}&page=${page}&limit=${LIMIT}`,
  );

  // wait for 100ms to avoid rate limit
  await new Promise((resolve) => setTimeout(resolve, 100));

  await saveToDatabase(data);
  if (data.orders?.length === LIMIT) {
    await fetchSymbolRecursive({ symbol, time, page: page + 1 });
  }
}

async function fetchOrders({ time }: { time: number }) {
  await Promise.all(
    config.symbols.map((symbol) => fetchSymbolRecursive({ symbol, time })),
  );
}
