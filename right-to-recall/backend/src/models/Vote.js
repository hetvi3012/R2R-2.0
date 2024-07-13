// src/models/Vote.js
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  state: { type: String, required: true },
  constituency: { type: String, required: true },
  satisfied: { type: Boolean, required: true },
  newLeader: { type: String },
});

module.exports = mongoose.model('Vote', voteSchema);
