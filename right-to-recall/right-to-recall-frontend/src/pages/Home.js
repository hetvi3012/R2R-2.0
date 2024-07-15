// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStates, fetchConstituenciesByState } from '../api';

const Home = () => {
  const [states, setStates] = useState([]);
  const [constituencies, setConstituencies] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getStates = async () => {
      const statesData = await fetchStates();
      setStates(statesData);
    };

    getStates();
  }, []);

  const handleStateChange = async (e) => {
    const state = e.target.value;
    setSelectedState(state);
    const constituenciesData = await fetchConstituenciesByState(state);
    setConstituencies(constituenciesData);
  };

  const handleNext = () => {
    navigate('/leader-selection', { state: selectedState, constituency: selectedConstituency });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl mb-6">Select Your State and Constituency</h1>
      <select
        className="mb-4 p-2 border border-gray-300 rounded"
        value={selectedState}
        onChange={handleStateChange}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state._id} value={state.name}>{state.name}</option>
        ))}
      </select>
      <select
        className="mb-4 p-2 border border-gray-300 rounded"
        value={selectedConstituency}
        onChange={(e) => setSelectedConstituency(e.target.value)}
        disabled={!selectedState}
      >
        <option value="">Select Constituency</option>
        {constituencies.map((constituency) => (
          <option key={constituency._id} value={constituency.name}>{constituency.name}</option>
        ))}
      </select>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleNext}
        disabled={!selectedState || !selectedConstituency}
      >
        Next
      </button>
    </div>
  );
};

export default Home;
