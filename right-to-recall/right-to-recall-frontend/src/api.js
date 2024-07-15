// src/api.js
const API_URL = 'http://localhost:3001/api/r2r';

export const fetchData = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const submitVote = async (vote) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vote),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting vote:', error);
  }
};

export const fetchStatesAndConstituencies = async () => {
  try {
    const response = await fetch(`${API_URL}/states-constituencies`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching states and constituencies:', error);
  }
};

export const fetchStates = async () => {
  try {
    const response = await fetch(`${API_URL}/states`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching states:', error);
  }
};

export const fetchConstituenciesByState = async (state) => {
  try {
    const response = await fetch(`${API_URL}/constituencies/${state}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching constituencies:', error);
  }
};
