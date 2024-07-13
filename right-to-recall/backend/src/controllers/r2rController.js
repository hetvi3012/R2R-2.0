// src/controllers/r2rController.js
const Vote = require('../models/Vote');

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

module.exports = { getVotes, addVote };
