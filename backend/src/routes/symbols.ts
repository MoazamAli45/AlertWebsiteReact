import Symbol from '@/models/symbol';
import express from 'express';

const router = express.Router();

router.get('/symbols', async (req, res) => {
  const { ticker = '', limit = 10 } = req.query;
  const symbols = await Symbol.find({
    $or: [
      { title: { $regex: ticker, $options: 'i' } },
      { ticker: { $regex: ticker, $options: 'i' } },
    ],
  })
    .select({ _id: 0, __v: 0, cikStr: 0 })
    .limit(Number(limit));

  res.json({ symbols });
});

export default router;
