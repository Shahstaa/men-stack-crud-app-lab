const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Book = require('./models/book');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);


app.get('/test', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// NEW Route
app.get('/books/new', (req, res) => {
    res.render('new');
  });

  app.get('/books', async (req, res) => {
    const books = await Book.find({});
    res.render('index', { books });
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