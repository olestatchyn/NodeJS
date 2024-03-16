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

const dbStatus = () => {
  return mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
};

export { connectToDb, dbStatus }