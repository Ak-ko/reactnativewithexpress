// get express
const express = require('express')
const app = express()

// get .env
require('dotenv').config()
const {APP_URL, APP_PORT, DB_URL} = process.env;

// logger using morgan middleware for every request.
const morgan = require('morgan')
app.use(morgan('dev'))

// connect db
const db = require('mongoose');
const Blog = require('./app/models/Blog')

db.connect(DB_URL)
  .then(() => {
    app.listen(APP_PORT, APP_URL,() => {
      console.log('Server is running on port ' + APP_PORT)
    })
  })
  .catch(e => console.log(e))

// blogs route & controller
app.get('/blogs', async(req, res) => {
    const blogs = await Blog.find();
    console.log('hit')
    res.json(blogs);
})

app.get('/add-blog', async (req, res) => {
  console.log('hit')
  try {
    const blog = new Blog({
      title: 'Apple is Launched iPhone 15 Pro',
      body: 'Titanium has one of the best strength‑to‑weight ratios of any metal, making these our lightest Pro models ever. You’ll notice the difference the moment you pick one up.'
    });
    await blog.save();
    res.send('blog saved')
  } catch(e) { console.log(e) }
})