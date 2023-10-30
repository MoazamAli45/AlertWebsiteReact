import express from 'express';
import cors from 'cors';
import url from 'url';
import rateLimit from 'express-rate-limit';
import fetch from 'cross-fetch';
import morgan from 'morgan';
import { Settings } from 'luxon';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

import config from '@/config';
import jsonData from '@/data/tickers.json';
import orders from '@/routes/orders';
import options from '@/routes/options';
import symbols from '@/routes/symbols';
import { updateSymbolsJob } from '@/jobs/symbols';
import { fetchLatestOptionsJob } from '@/jobs/options';

Settings.defaultZone = 'America/New_York';

const app = express();
app.disable('x-powered-by');

const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/';
mongoose.connect(DATABASE_URI).then(() => console.log('Connected to MongoDB'));

const logger = morgan('tiny');
app.use(logger);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200,
    // credentials: true,
  }),
);

updateSymbolsJob();
fetchLatestOptionsJob();

app.use('/api', orders);
app.use('/api', options);
app.use('/api', symbols);

app.get('/api/options-with-metadata', async (req, res) => {
  const searchQuery = url.parse(req.url).query;
  try {
    const response = await fetch(`${config.api.options.url}?${searchQuery}`);

    if (response.status >= 400) {
      return res.status(500).json({ error: response.statusText });
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;

    return res.status(500).json({ error: message });
  }
});

app.get('/api/news', limiter, async (req, res) => {
  const searchQuery = url.parse(req.url).query;
  try {
    const response = await fetch(
      `${config.api.news.url}?${searchQuery}&api_token=${config.api.news.token}`,
    );

    if (response.status >= 400) {
      return res.status(500).json({ error: response.statusText });
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;

    return res.status(500).json({ error: message });
  }
});

interface Ticker {
  ticker: string;
  title: string;
}

const data = (Object.values(jsonData) as Ticker[]).map(({ ticker, title }) => ({
  ticker,
  title,
}));

app.get('/api/tickers', async (req, res) => {
  const search = (req.query.search as string)?.toLowerCase() || '';
  try {
    const tickers = data.filter((option) =>
      option.ticker.toLowerCase().startsWith(search),
    );

    return res.json(tickers);
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;

    return res.status(500).json({ error: message });
  }
});

app.use('/*', (_, res) => {
  return res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  return console.log(`Express app is listening on port ${PORT}`);
});
