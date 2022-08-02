const connection = require('../config/connection');
const { Product, User } = require('../models');
const productSeeds = require('./productSeeds');
const userSeeds = require('./userSeeds');


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing products
  await Product.deleteMany({});

  // Drop existing users
  await User.deleteMany({});
  
  
  // Create empty array to hold the users
  const users = userSeeds;
  const products = productSeeds;
  // Add users to the collection and await the results
  await User.collection.insertMany(users);
  // Add products to the collection and await the results
  await Product.collection.insertMany(products);


  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(products);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
