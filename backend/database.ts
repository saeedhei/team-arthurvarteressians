import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit if connection fails
  }
};
