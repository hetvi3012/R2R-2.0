// src/pages/Results.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchData } from '../api';

const Results = () => {
  const location = useLocation();
  const { state, constituency, satisfied, selectedLeader } = location.state || {};
  const [votes, setVotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVotes = async () => {
      try {
        const data = await fetchData();
        if (data) {
          setVotes(data);
        } else {
          setError('No data available');
        }
      } catch (error) {
        setError('Failed to fetch votes');
      }
    };

    getVotes();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl mb-6">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl mb-6">Vote Results</h1>
      <p className="mb-4">State: {state}</p>
      <p className="mb-4">Constituency: {constituency}</p>
      {satisfied !== undefined ? (
        <p className="mb-4">Satisfied with Current Leader: {satisfied ? 'Yes' : 'No'}</p>
      ) : (
        <p className="mb-4">Selected New Leader: {selectedLeader}</p>
      )}
      <div className="w-full max-w-md">
        {/* Placeholder for pie chart or other results visualization */}
        <div className="bg-white shadow-md rounded p-4">
          <p className="text-center">Results Visualization Here</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl mb-4">All Votes</h2>
        <ul>
          {votes && votes.length > 0 ? (
            votes.map((vote, index) => (
              <li key={index} className="mb-2">
                State: {vote.state}, Constituency: {vote.constituency}, Satisfied: {vote.satisfied ? 'Yes' : 'No'}, New Leader: {vote.newLeader}
              </li>
            ))
          ) : (
            <p>No votes available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Results;
