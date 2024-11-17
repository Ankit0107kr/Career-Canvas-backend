import mongoose from "mongoose";
import colors from "colors";
// import dotenv from "dotenv";

// dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/CareerCanvas", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully".bgMagenta.white.bold.bold);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
// connectDB();
