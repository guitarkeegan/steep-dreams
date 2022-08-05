const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');
const Product = require('./Product');

const orderSchema = new Schema(
  {
    totalPrice: {
      type: Number,
      required: true,
    },
    productDetails: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },``
      ],
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

const Order=model('Order',orderSchema);

module.exports = Order;
