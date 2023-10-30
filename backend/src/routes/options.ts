import Option from '@/models/option';
import express from 'express';

const router = express.Router();

router.get('/options', async (req, res) => {
  const { ticker, strike } = req.query;
  const options = await Option.find({
    ...(ticker && { ticker }),
    ...(strike && { strikePrice: strike }),
  });

  res.json({ options });
});

export default router;
