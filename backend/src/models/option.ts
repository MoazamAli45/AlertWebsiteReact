import { Schema, model } from 'mongoose';

const optionSchema = new Schema(
  {
    ask: Number,
    askSize: Number,
    bid: Number,
    bidAskSize: String,
    bidSize: Number,
    closePrice: Number,
    daysToExpiration: Number,
    deliverableNote: String,
    delta: Schema.Types.Mixed,
    description: String,
    exchangeName: String,
    expirationDate: Date,
    expirationType: String,
    gamma: Schema.Types.Mixed,
    highPrice: Number,
    inTheMoney: Boolean,
    intrinsicValue: Number,
    isIndexOption: Schema.Types.Mixed,
    last: Number,
    lastSize: Number,
    lastTradingDay: Date,
    lowPrice: Number,
    mark: Number,
    markChange: Number,
    markPercentChange: Number,
    mini: Boolean,
    multiplier: Number,
    netChange: Number,
    nonStandard: Boolean,
    openInterest: Number,
    openPrice: Number,
    optionDeliverablesList: Schema.Types.Mixed,
    pennyPilot: Boolean,
    percentChange: Number,
    putCall: String,
    quoteTimeInLong: Number,
    rho: Schema.Types.Mixed,
    settlementType: String,
    strikePrice: Number,
    symbol: {
      type: String,
      unique: true,
      required: true,
    },
    ticker: String,
    theoreticalOptionValue: Schema.Types.Mixed,
    theoreticalVolatility: Number,
    theta: Schema.Types.Mixed,
    timeValue: Number,
    totalVolume: Number,
    tradeDate: Date,
    tradeTimeInLong: Number,
    vega: Number,
    volatility: Schema.Types.Mixed,
  },
  {
    versionKey: false,
  },
);

optionSchema.index({ symbol: 1 }, { unique: true });

const Option = model('Option', optionSchema);

export default Option;
