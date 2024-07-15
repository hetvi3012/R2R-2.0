// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
const r2rRoutes = require('./routes/r2r');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // Use CORS
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/right_to_recall');

app.use('/api/r2r', r2rRoutes);

app.get('/', (req, res) => {
  res.send('Right to Recall Backend');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
