import schedule from 'node-schedule';
import { setDefaultResultOrder } from 'dns';
import tickers from '@/data/tickers.json';
import Symbol from '@/models/symbol';

export const addSymbols = async () => {
  setDefaultResultOrder('ipv4first');
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [1, 2, 3, 4, 5];
  rule.minute = new schedule.Range(0, 59, 1);
  rule.second = [0, 30];
  rule.tz = 'America/New_York';

  schedule.scheduleJob(rule, async () => {
    console.log('Add symbols job called');
    const data = Object.values(tickers).map((ticker) => {
      return {
        ticker: ticker.ticker,
        title: ticker.title,
        cikStr: ticker.cik_str,
      };
    });
    console.log(Object.values(data).length);

    await saveToDatabase(data);
  });
};

async function saveToDatabase(data) {
  for await (const symbol of data.slice(10800)) {
    await Symbol.updateOne({ ticker: symbol.ticker }, symbol, { upsert: true });
    // await new Promise((resolve) => setTimeout(resolve, 25));

    // if (!existingSymbol) {
    //   const newSymbol = new Symbol(symbol);
    //   await new Promise((resolve) => setTimeout(resolve, 100));
    //   await newSymbol.save();
    // }
  }
}
