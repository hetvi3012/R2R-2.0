// src/pages/LeaderSelection.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitVote } from '../api';

const LeaderSelection = () => {
  const location = useLocation();
  const { state, constituency } = location.state || {};
  const [satisfied, setSatisfied] = useState(null);
  const navigate = useNavigate();

  const handleNext = async () => {
    if (satisfied !== null) {
      const vote = {
        state,
        constituency,
        satisfied,
        newLeader: '',
      };

      await submitVote(vote);
      navigate('/results', { state, constituency, satisfied });
    } else {
      navigate('/optional-leader-selection', { state, constituency });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl mb-6">Current Leader</h1>
      <p className="mb-4">Are you satisfied with your current leader?</p>
      <div className="flex mb-4">
        <button
          className={`bg-green-500 text-white p-2 rounded mx-2 ${satisfied === true ? 'opacity-50' : ''}`}
          onClick={() => setSatisfied(true)}
        >
          Yes
        </button>
        <button
          className={`bg-red-500 text-white p-2 rounded mx-2 ${satisfied === false ? 'opacity-50' : ''}`}
          onClick={() => setSatisfied(false)}
        >
          No
        </button>
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleNext}
        disabled={satisfied === null}
      >
        Next
      </button>
    </div>
  );
};

export default LeaderSelection;
