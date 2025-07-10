import dotenv from 'dotenv';
dotenv.config({
    path: '.env'
});

export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';

// Token
export const JWT_SECRET = process.env.JWT_SECRET || "xyz123";
export const MAX_AGE_TOKEN = process.env.MAX_AGE_TOKEN || 7 * 24 * 60 * 60 * 1000; // 7 días en milisegundos

