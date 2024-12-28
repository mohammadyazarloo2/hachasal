import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    }
    
    const { MONGODB_URL } = process.env;
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB connected successfully!");
    return true;
  } catch (error) {
    console.log("MongoDB connection error:", error);
    return false;
  }
};
