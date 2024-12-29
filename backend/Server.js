const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to the database.');
  }
});

// Routes
app.get('/', (req, res) => {
  res.send('E-commerce Chatbot Backend');
});

// Fetch Products with Search
app.get('/api/products', (req, res) => {
  const searchQuery = req.query.search || '';
  const query = `
    SELECT * FROM products
    WHERE name LIKE ? OR description LIKE ?
  `;
  const searchParam = `%${searchQuery}%`;

  db.query(query, [searchParam, searchParam], (err, results) => {
    if (err) {
      console.error('Error fetching products:', err.message);
      res.status(500).json({ error: 'Failed to fetch products' });
    } else {
      res.json(results);
    }
  });
});

// Log Interactions
app.post('/api/interactions', (req, res) => {
  const { userMessage, botResponse } = req.body;

  const query = `
    INSERT INTO interactions (user_message, bot_response, timestamp)
    VALUES (?, ?, NOW())
  `;

  db.query(query, [userMessage, botResponse], (err, result) => {
    if (err) {
      console.error('Error logging interaction:', err.message);
      res.status(500).json({ error: 'Failed to log interaction' });
    } else {
      res.status(201).json({ message: 'Interaction logged successfully' });
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
