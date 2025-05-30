import express from 'express';
import connectDB from './db.js';
import { PORT } from './config.js';

// Import routes
import cardsRoutes from './routes/cards.routes.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/cards', cardsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});