import mongoose from "mongoose";

const BASE_CONNECTION = "mongodb://localhost:27017";

const connectToDatabase = async () => {
    try {
      await mongoose.connect(BASE_CONNECTION);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  };
  
  export default connectToDatabase;
