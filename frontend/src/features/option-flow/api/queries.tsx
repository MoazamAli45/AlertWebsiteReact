import axios from '@/lib/axios';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useFlowContext } from '@/features/option-flow/contexts/FlowContext';
import { optionFlowConfig } from '@/features/option-flow/config';

function processData({ orders }: { orders: any }) {
  const newOrders = [];
  for (const order of orders) {
    const {
      timestamp,
      symbol,
      LAST_PRICE,
      TOTAL_VOLUME,
      TIME_VALUE,
      LAST_SIZE,
      key,
      ASK_PRICE,
      ASK_SIZE,
      BID_PRICE,
      BID_SIZE,
      UNDERLYING_PRICE,
    } = order;

    const price = Math.floor(LAST_PRICE * 100);
    const keyEnd = key.split('_')[1];
    const exp = keyEnd.substring(0, 6);
    const contract = keyEnd.charAt(6); // === "P" ? "PUT" : "CALL";
    const strike = keyEnd.substring(7);

    newOrders.push({
      timestamp,
      symbol,
      price,
      volume: TOTAL_VOLUME,
      dte: TIME_VALUE,
      size: LAST_SIZE,
      key,
      expiration: exp,
      contract,
      strike,
      askPrice: ASK_PRICE,
      askSize: ASK_SIZE,
      bidPrice: BID_PRICE,
      bidSize: BID_SIZE,
      underlyingPrice: UNDERLYING_PRICE?.toFixed(2) ?? 0,
    });
  }

  return newOrders;
}

async function fetchSymbolRecursive({
  symbol,
  time,
  page = 1,
}: any): Promise<any> {
  const LIMIT = 200;
  const { data } = await axios.get(
    `/orders?symbol=${symbol}&ts=${time}&page=${page}&limit=${LIMIT}`,
  );

  const orders = processData(data);

  if (data.orders?.length === LIMIT) {
    return orders.concat(
      await fetchSymbolRecursive({ symbol, time, page: page + 1 }),
    );
  }

  return orders;
}

export async function fetchOrders({ time }: { time: number }) {
  const orders = await Promise.all(
    optionFlowConfig.symbols.map((symbol) =>
      fetchSymbolRecursive({ symbol, time }),
    ),
  ).then((r) => r.reduce((p, q) => p.concat(q)));

  return orders;
}

export function useOrders(time: number) {
  return useInfiniteQuery(['projects', time], () => fetchOrders({ time }), {
    getNextPageParam: (_, allPages) => {
      // lastPage signature depends on your api respond, below is a pseudocode
      return allPages.length + 1;
    },
  });
}

export const useFetchOrdersQuery = () => {
  const {
    state: { time },
  } = useFlowContext();

  return useQuery(
    ['orders', time],
    () => fetchOrders({ time: time.toUnixInteger() }),
    { refetchInterval: 5000 },
  );
};

async function fetchOption(key: string) {
  const [ticker, strike] = key.split(':');

  const { data } = await axios.get(
    `/options?ticker=${ticker}&strike=${strike}&ts=1689946200`,
  );

  return {
    key,
    options: data.options?.reduce(
      (acc: any, option: any) => ({ ...acc, [option.symbol]: option }),
      {},
    ),
  };
}

export async function fetchOptions(keys: string[]) {
  const options: Record<string, any> = await Promise.all(
    keys.map(fetchOption),
  ).then((r) =>
    r.reduce((acc, { key, options }) => ({ ...acc, [key]: options }), {}),
  );

  return options;
}

type OpenInterestParams = {
  symbol: string;
  strike: number;
};

async function fetchOpenInterest({
  symbol,
  strike,
}: OpenInterestParams): Promise<any> {
  const { data } = await axios.get(
    '/options-with-metadata?symbol=' + symbol + '&strike=' + strike,
  );

  return data;
}

export function useOpenInterest({ symbol, strike }: OpenInterestParams) {
  return useQuery(
    ['open-interest', symbol, strike],
    () => fetchOpenInterest({ symbol, strike }),
    {},
  );
}

async function fetchSymbols({
  value,
  limit,
}: {
  value: string;
  limit: number;
}) {
  const { data } = await axios.get(`/symbols?ticker=${value}&limit=${limit}`);

  return data;
}

export function useFetchSymbols({
  value,
  limit = 10,
}: {
  value: string;
  limit?: number;
}) {
  return useQuery(['symbols', value], () => fetchSymbols({ value, limit }), {
    enabled: false,
  });
}
