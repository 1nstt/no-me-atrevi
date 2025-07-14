import express from 'express';
import connectDB from './db.js';
import { PORT } from './config.js';
import cors from 'cors';
import coockieParser from 'cookie-parser';
// Import routes
import cardsRoutes from './routes/cards.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5000', // Allow all origins, adjust as needed for security
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));


// Middleware to parse JSON bodies
app.use(express.json());
app.use(coockieParser());

// Connect to MongoDB
connectDB();
app.get('/', (req, res) => {
  res.send('API backend funcionando');
});

// Routes
app.use('/api/cards', cardsRoutes);
app.use('/api/admin', adminRoutes); 

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});