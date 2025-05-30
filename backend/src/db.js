import mongoose from 'mongoose';
import {MONGODB_URI} from './config.js'; 


// Connect to MongoDB
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;