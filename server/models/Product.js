const mongoose = require('mongoose');

const { Schema } = mongoose;
// Product model will define the information stored for each product. Stock quantity can later be used to track when inventory needs to be replenished.
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique:true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  stockQuantity: {
    type: Number,
    min: 0,
    default: 0
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
