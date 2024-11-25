import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Retrieve MongoDB URI from env
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true, // Still needed to avoid older parser deprecation warnings
    });
    console.log("MongoDB connected successfully".bgMagenta.white.bold);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message.red.bold);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
