import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

export default function useQueryRefresh(
  initalTime: DateTime,
  refreshInterval: number,
) {
  const [time, setTime] = useState(initalTime);
  useEffect(() => {
    const handler = setInterval(() => {
      setTime(DateTime.now() as DateTime);
    }, refreshInterval);
    return () => {
      clearInterval(handler);
    };
  }, [initalTime, refreshInterval]);
  return { time };
}
