// src/controllers/r2rController.js
const Vote = require('../models/Vote');
const State = require('../models/State');
const Constituency = require('../models/Constituency');

// Existing methods...
const getVotes = async (req, res) => {
  try {
    const votes = await Vote.find();
    res.json(votes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addVote = async (req, res) => {
  const vote = new Vote({
    state: req.body.state,
    constituency: req.body.constituency,
    satisfied: req.body.satisfied,
    newLeader: req.body.newLeader,
  });

  try {
    const newVote = await vote.save();
    res.status(201).json(newVote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllStatesAndConstituencies = async (req, res) => {
  try {
    const states = await State.find();
    const constituencies = await Constituency.find();
    res.json({ states, constituencies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// New methods...
const getAllStates = async (req, res) => {
  try {
    const states = await State.find().sort({ name: 1 });
    res.json(states);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getConstituenciesByState = async (req, res) => {
  const stateName = req.params.state;
  try {
    const constituencies = await Constituency.find({ state: stateName }).sort({ name: 1 });
    res.json(constituencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVotes, addVote, getAllStatesAndConstituencies, getAllStates, getConstituenciesByState };
