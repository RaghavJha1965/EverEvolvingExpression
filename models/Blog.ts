import mongoose from 'mongoose'

const BlogSectionSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: [true, 'Please provide a heading'],
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
  },
})

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  subtitle: {
    type: String,
    required: [true, 'Please provide a subtitle'],
    maxlength: [150, 'Subtitle cannot be more than 150 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [300, 'Description cannot be more than 300 characters'],
  },
  sections: [BlogSectionSchema],
  image: {
    type: String,
    default: '/images/default-blog.jpg',
  },
  bgColor: {
    type: String,
    default: 'bg-white',
  },
  isPublished: {
    type: Boolean,
    default: false,
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

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema) 