import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hasAccess: {
    type: Boolean,
    default: true,
  },
})

export default mongoose.models.User || mongoose.model('User', UserSchema) 