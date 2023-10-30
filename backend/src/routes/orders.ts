import express from 'express';
import url from 'url';
import config from '@/config';

const router = express.Router();

router.get('/orders', async (req, res) => {
  const searchQuery = url.parse(req.url).query;
  try {
    const response = await fetch(`${config.api.orders.url}?${searchQuery}`);

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

export default router;
