import { Schema, model } from 'mongoose';

const optionChainMetaDataSchema = new Schema(
  {
    daysToExpiration: Number,
    interestRate: Number,
    interval: Number,
    isDelayed: Boolean,
    isIndex: Boolean,
    numberOfContracts: Number,
    status: String,
    strategy: String,
    symbol: { type: String, required: true, unique: true },
    underlyingPrice: Number,
    volatility: Number,
  },
  {
    versionKey: false,
  },
);

const OptionChainMetaData = model(
  'OptionChainMetaData',
  optionChainMetaDataSchema,
);

export default OptionChainMetaData;
