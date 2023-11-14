import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Define the schema for the product
const productSchema = new mongoose.Schema({
  image: String,
  name: String,
  price: Number,
  details: String,
});

// Create a model from the schema
const Product = mongoose.model('Product', productSchema);

// API endpoint to get a list of products
router.get('/products', async (_, res) => {
  try {
    // Fetch products from the database
    const products = await Product.find();

    // Send the products as JSON
    res.json(products);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
