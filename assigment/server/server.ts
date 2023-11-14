import express from 'express';
import mongoose from 'mongoose';
import productsRouter from './api/products';

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/typeScript')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Use API router
app.use('/api', productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
