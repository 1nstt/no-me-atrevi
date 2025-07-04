import express from 'express';
import connectDB from './db.js';
import { PORT } from './config.js';
import cors from 'cors';
// Import routes
import cardsRoutes from './routes/cards.routes.js';

const app = express();

// Enable CORS
app.use(cors({
  origin: '*', // Allow all origins, adjust as needed for security
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));


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