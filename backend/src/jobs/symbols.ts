import schedule from 'node-schedule';
import config from '@/config';

export const updateSymbolsJob = async () => {
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0];
  rule.hour = 0;
  rule.minute = 0;
  rule.tz = 'America/New_York';

  schedule.scheduleJob(rule, async () => {
    console.log('Update symbols job called');
    const requests = config.symbols.map((symbol) =>
      fetchDataWithRetry({
        url: `${config.api.symbols.url}?symbol=${symbol}&range=10&save=1`,
        retryDelay: 3000,
      }),
    );

    await Promise.all(requests);
  });

  function fetchDataWithRetry({
    url,
    retries = 3,
    retryDelay = 1000,
  }: {
    url: string;
    retries?: number;
    retryDelay?: number;
  }) {
    let retryCount = 0;

    function fetchWithRetry() {
      return fetch(url)
        .then((response) => {
          console.log(response.url, response.status, response.statusText);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        })
        .catch((error) => {
          if (retryCount < retries) {
            retryCount++;
            setTimeout(fetchWithRetry, retryDelay);
          } else {
            throw error;
          }
        });
    }

    return fetchWithRetry();
  }
};
