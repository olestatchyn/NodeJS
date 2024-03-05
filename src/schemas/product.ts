import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true 
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
});

export default productSchema;