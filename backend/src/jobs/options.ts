import schedule from 'node-schedule';
import axios from 'axios';
import config from '@/config';
import Option from '@/models/option';
import OptionChainMetaData from '@/models/optionChainMetaData';
import type { IOption } from '@/types';

export const fetchLatestOptionsJob = async () => {
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0, 1, 2, 3, 4, 5];
  rule.minute = new schedule.Range(0, 59, 2);
  rule.second = 30;
  rule.tz = 'America/New_York';

  schedule.scheduleJob(rule, async () => {
    console.log('fetchLatestOptions job called');
    await removeExpiredOptions();
    fetchOptions();
  });
};

async function removeExpiredOptions() {
  const deleted = await Option.deleteMany({
    expirationDate: {
      $lt: new Date(),
    },
  });
  console.log('Deleted documents', deleted);
}

async function saveToDatabase({ callExpDateMap, putExpDateMap, ...metaData }) {
  const callOptions = Object.values(callExpDateMap)
    .flatMap(Object.values as any)
    .flat() as IOption[];
  const putOptions = Object.values(putExpDateMap)
    .flatMap(Object.values as any)
    .flat() as IOption[];

  callOptions.forEach(async (option) => {
    const optionToSave = { ...option, ticker: metaData.symbol };
    await Option.updateOne({ symbol: option.symbol }, optionToSave, {
      upsert: true,
    });
  });

  putOptions.forEach(async (option) => {
    const optionToSave = { ...option, ticker: metaData.symbol };
    await Option.updateOne({ symbol: option.symbol }, optionToSave, {
      upsert: true,
    });
  });

  await OptionChainMetaData.updateOne({ symbol: metaData.symbol }, metaData, {
    upsert: true,
  });
}

async function fetchSymbol(symbol: string): Promise<any> {
  try {
    const { data } = await axios.get(
      `${config.api.options.url}?symbol=${symbol}`,
    );

    await saveToDatabase(data);
  } catch (error) {
    console.log(error);
  }
}

async function fetchOptions() {
  await config.symbols.map(async (symbol) => await fetchSymbol(symbol));
}
