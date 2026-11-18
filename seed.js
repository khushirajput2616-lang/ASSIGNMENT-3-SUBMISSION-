// Run with:  npm run seed   (clears the collection and inserts sample data)
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  { name: 'Study Table', sku: 'FURN-TB-812', category: 'Furniture', price: 3999, quantity: 2, reorderLevel: 4, supplier: 'IKEA India' },
  { name: 'Office Chair', sku: 'FURN-CH-455', category: 'Furniture', price: 5499, quantity: 15, reorderLevel: 5, supplier: 'Godrej Interio' },
  { name: 'Laptop 15"', sku: 'ELEC-LP-101', category: 'Electronics', price: 55000, quantity: 3, reorderLevel: 5, supplier: 'Dell India' },
  { name: 'Wireless Mouse', sku: 'ELEC-MS-202', category: 'Electronics', price: 799, quantity: 40, reorderLevel: 10, supplier: 'Logitech' },
  { name: 'Bluetooth Speaker', sku: 'ELEC-SP-303', category: 'Electronics', price: 2499, quantity: 25, reorderLevel: 8, supplier: 'boAt' },
  { name: 'Smartphone', sku: 'ELEC-PH-404', category: 'Electronics', price: 18999, quantity: 28, reorderLevel: 10, supplier: 'Samsung' },
  { name: 'Cotton T-Shirt', sku: 'APRL-TS-501', category: 'Apparel', price: 599, quantity: 60, reorderLevel: 20, supplier: 'Raymond' },
  { name: 'Denim Jeans', sku: 'APRL-JN-502', category: 'Apparel', price: 2199, quantity: 18, reorderLevel: 20, supplier: 'Levis' },
  { name: 'Spiral Notebook', sku: 'STNY-NB-601', category: 'Stationery', price: 60, quantity: 200, reorderLevel: 50, supplier: 'Classmate' },
  { name: 'Ball Pen Box', sku: 'STNY-PN-602', category: 'Stationery', price: 150, quantity: 8, reorderLevel: 15, supplier: 'Reynolds' },
  { name: 'Basmati Rice 5kg', sku: 'GROC-RC-701', category: 'Grocery', price: 650, quantity: 45, reorderLevel: 15, supplier: 'India Gate' },
  { name: 'Olive Oil 1L', sku: 'GROC-OL-702', category: 'Grocery', price: 899, quantity: 6, reorderLevel: 10, supplier: 'Figaro' },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await mongoose.disconnect();
  }
})();
