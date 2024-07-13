// src/routes/r2r.js
const express = require('express');
const router = express.Router();
const { getVotes, addVote } = require('../controllers/r2rController');

router.get('/', getVotes);
router.post('/', addVote);

module.exports = router;
