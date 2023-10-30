import { Schema, model } from 'mongoose';

const symbolSchema = new Schema(
  {
    ticker: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    cikStr: { type: String, required: true },
  },
  {
    versionKey: false,
  },
);

symbolSchema.set('toObject', {
  transform: function (_, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

symbolSchema.index(
  { ticker: 'text', title: 'text' },
  {
    weights: {
      ticker: 5,
      title: 3,
    },
  },
);

const Symbol = model('Symbol', symbolSchema);

export default Symbol;
