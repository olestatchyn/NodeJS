import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.DB_CONNECTION_STRING;
const connectToDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  }
  catch (error) {
    console.log(`Error connecting to DB ${error.message}`);
  } 
}

export { connectToDb }