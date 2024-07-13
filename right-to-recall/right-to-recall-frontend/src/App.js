// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LeaderSelection from './pages/LeaderSelection';
import OptionalLeaderSelection from './pages/OptionalLeaderSelection';
import Results from './pages/Results';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leader-selection" element={<LeaderSelection />} />
          <Route path="/optional-leader-selection" element={<OptionalLeaderSelection />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
