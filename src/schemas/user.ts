import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
});

export default userSchema;