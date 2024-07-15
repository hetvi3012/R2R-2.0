// src/models/Constituency.js
const mongoose = require('mongoose');

const constituencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: mongoose.Schema.Types.ObjectId, ref: 'State' },
});

module.exports = mongoose.model('Constituency', constituencySchema);
