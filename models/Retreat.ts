import mongoose from 'mongoose'

const RetreatSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, 'Please provide a label'],
    maxlength: [50, 'Label cannot be more than 50 characters'],
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  bgColor: {
    type: String,
    default: 'bg-white',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Retreat || mongoose.model('Retreat', RetreatSchema) 