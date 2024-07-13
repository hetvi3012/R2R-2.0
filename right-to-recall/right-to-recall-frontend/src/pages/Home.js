// src/pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [state, setState] = useState('');
  const [constituency, setConstituency] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/leader-selection', { state, constituency });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl mb-6">Select Your State and Constituency</h1>
      <select
        className="mb-4 p-2 border border-gray-300 rounded"
        value={state}
        onChange={(e) => setState(e.target.value)}
      >
        <option value="">Select State</option>
        <option value="State1">State1</option>
        <option value="State2">State2</option>
        {/* Add more states */}
      </select>
      <select
        className="mb-4 p-2 border border-gray-300 rounded"
        value={constituency}
        onChange={(e) => setConstituency(e.target.value)}
      >
        <option value="">Select Constituency</option>
        <option value="Constituency1">Constituency1</option>
        <option value="Constituency2">Constituency2</option>
        {/* Add more constituencies */}
      </select>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleNext}
        disabled={!state || !constituency}
      >
        Next
      </button>
    </div>
  );
};

export default Home;
