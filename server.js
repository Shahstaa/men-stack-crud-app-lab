const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Connect to MongoDB
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


// Define the Book model
const Book = require('./models/book');

// INDEX Route
app.get('/books', async (req, res) => {
  const books = await Book.find({});
  res.render('index', { books });
});

// NEW Route
app.get('/books/new', (req, res) => {
  res.render('new');
});

// CREATE Route
app.post('/books', async (req, res) => {
  await Book.create(req.body);
  res.redirect('/books');
});

// SHOW Route
app.get('/books/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('show', { book });
});

// EDIT Route
app.get('/books/:id/edit', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('edit', { book });
});

// UPDATE Route
app.put('/books/:id', async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/books/${req.params.id}`);
});

// DESTROY Route
app.delete('/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect('/books');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
