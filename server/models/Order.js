const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');
const Product = require('./Product');

const orderSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    price: {
      type: Number,
      required: true,
    },
    isComplete: {
      type: Boolean,
      default: false
    }, 
    orderDetails: [Product],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) return dayjs(date).format('MM-DD-YYYY h:mma')
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = orderSchema;
