import axios from '@/lib/axios';

export const fetchNews = async ({ tickers, page, limit }: { tickers: string[], page: number, limit: number }) => {
  const symbols = new URLSearchParams();
  symbols.append('symbols', tickers.join(','));

  const { data } = await axios.get(
    `/news?${symbols}&page=${page}&limit=${limit}&filter_entities=true&language=en`,
  );

  return data;
};
