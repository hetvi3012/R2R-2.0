// src/pages/OptionalLeaderSelection.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitVote } from '../api';

const OptionalLeaderSelection = () => {
  const location = useLocation();
  const { state, constituency } = location.state || {};
  const [selectedLeader, setSelectedLeader] = useState('');
  const navigate = useNavigate();

  const handleVote = async () => {
    const vote = {
      state,
      constituency,
      satisfied: false,
      newLeader: selectedLeader,
    };

    await submitVote(vote);
    navigate('/results', { state, constituency, selectedLeader });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl mb-6">Select a New Leader</h1>
      <p className="mb-4">Choose from the list below if you are not satisfied with the current leader.</p>
      <select
        className="mb-4 p-2 border border-gray-300 rounded"
        value={selectedLeader}
        onChange={(e) => setSelectedLeader(e.target.value)}
      >
        <option value="">Select New Leader</option>
        <option value="Leader1">Leader1</option>
        <option value="Leader2">Leader2</option>
        {/* Add more leaders */}
      </select>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleVote}
        disabled={!selectedLeader}
      >
        Vote
      </button>
    </div>
  );
};

export default OptionalLeaderSelection;
