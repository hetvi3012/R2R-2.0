// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const r2rRoutes = require('./routes/r2r');
const app = express();
const port = 3001;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/right_to_recall', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/r2r', r2rRoutes);

app.get('/', (req, res) => {
  res.send('Right to Recall Backend');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
