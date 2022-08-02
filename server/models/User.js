const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const orderSchema = require('./Order');


const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 50,
    trim: true,
    lowercase: true, 
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,3})$/, 'Please fill a valid email address'] 
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  orders: [orderSchema] 
});



// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
