import dotenv from 'dotenv';
dotenv.config({
    path: '.env'
});

export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:admin123@mongo:27017/mydatabase?authSource=admin';

// Token
export const JWT_SECRET = process.env.JWT_SECRET || "xyz123";
export const MAX_AGE_TOKEN = process.env.MAX_AGE_TOKEN || 7 * 24 * 60 * 60 * 1000; // 7 días en milisegundos

// Admin
export const ADMIN = process.env.ADMIN || '';

// CORS Origin
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:80';