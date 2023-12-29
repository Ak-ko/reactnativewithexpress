const mongoose = require('mongoose')
const { Schema } = mongoose

const blogSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  }
}, {timestamps: true})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog;