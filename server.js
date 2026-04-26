const express = require('express');
const app = express();

app.use(express.json());

let books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling" }
];

// ---------------- REST ----------------

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Get book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
});

// ---------------- RPC ----------------

// Get book (function style)
app.post('/getBook', (req, res) => {
  const book = books.find(b => b.id == req.body.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
});

// Create book
app.post('/createBook', (req, res) => {
  books.push(req.body);
  res.json({ message: "Book added successfully" });
});

// ---------------- GraphQL (Mock) ----------------

app.post('/graphql', (req, res) => {
  const { query } = req.body;

  // very simple parsing (mock)
  if (query && query.includes("book")) {
    return res.json({
      data: {
        book: books[0]
      }
    });
  }

  res.status(400).json({ message: "Invalid query" });
});

// ---------------- Server ----------------

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
