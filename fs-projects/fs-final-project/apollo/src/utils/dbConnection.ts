import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.DB_HOST ||
        "mongodb+srv://store_23:store_23@cluster0.kcamuno.mongodb.net/stores_db?retryWrites=true&w=majority"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};



export const myName = "yonathan"
