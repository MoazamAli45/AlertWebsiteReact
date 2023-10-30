import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true },
    timestamp: { type: Number, required: true, unique: true },
    key: { type: String, required: true },
    ASK_PRICE: { type: Number, required: true },
    ASK_SIZE: { type: Number },
    BID_PRICE: { type: Number, required: true },
    BID_SIZE: { type: Number },
    LAST_PRICE: { type: Number, required: true },
    LAST_SIZE: { type: Number, required: true },
    MARK: { type: Number },
    MONEY_INTRINSIC_VALUE: { type: Number },
    NET_CHANGE: { type: Number, required: true },
    QUOTE_TIME: { type: Number },
    TIME_VALUE: { type: Number },
    TOTAL_VOLUME: { type: Number, required: true },
    UNDERLYING_PRICE: { type: Number },
    TRADE_TIME: { type: Number },
    HIGH_PRICE: { type: Number },
    LOW_PRICE: { type: Number },
    OPEN_PRICE: { type: Number },
    TRADE_DAY: { type: Number },
    DELTA: { type: Number },
    GAMMA: { type: Number },
    RHO: { type: Number },
    THEORETICAL_OPTION_VALUE: { type: Number },
    THETA: { type: Number },
    VEGA: { type: Number },
    VOLATILITY: { type: Number },
    time: { type: Number, required: true },
  },
  { timestamps: true },
);

orderSchema.index({ timestamp: 1 }, { unique: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
