// src/routes/r2r.js
const express = require('express');
const router = express.Router();
const { getVotes, addVote, getAllStatesAndConstituencies, getAllStates, getConstituenciesByState } = require('../controllers/r2rController');

// Endpoint to get votes
router.get('/votes', getVotes);

// Endpoint to add a vote
router.post('/votes', addVote);

// Existing endpoint to get all states and constituencies
router.get('/states-constituencies', getAllStatesAndConstituencies);

// New endpoint for fetching all states
router.get('/states', getAllStates);

// New endpoint for fetching constituencies by state
router.get('/constituencies/:state', getConstituenciesByState);

module.exports = router;
