import axios from '@/lib/axios';

export const fetchOptions = async (ticker: string) => {
  const { data } = await axios.get(`/options-with-metadata?symbol=${ticker}`);

  return data;
};
