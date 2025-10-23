import express from 'express';
import connectDB from './db.js';
import { PORT, FRONTEND_URL } from './config.js';
import cors from 'cors';
import coockieParser from 'cookie-parser';
// Import routes
import cardsRoutes from './routes/cards.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

// Enable CORS
app.use(cors({
  origin: ['https://nomeatrevi.com', 'https://www.nomeatrevi.com', 'http://localhost:5000'], // URLs permitidas
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'] // Allowed headers
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