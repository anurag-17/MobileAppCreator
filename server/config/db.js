const mongoose = require("mongoose");
require("dotenv").config();

const localURI = process.env.MONGO_URI_LOCAL;
const hostingerURI = process.env.MONGO_URI_HOSTINGER;
const currentEnv = process.env.ENV || "local"; // Default to local

const uri = currentEnv === "hostinger" ? hostingerURI : localURI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected successfully to ${currentEnv}`);
  } catch (error) {
    console.error("Connection to MongoDB failed:", error);
  }
};

module.exports = connectDB;
