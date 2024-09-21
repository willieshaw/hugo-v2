// /src/App.js

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalStateProvider } from './context/GlobalState';
import AppContent from './AppContent';
import './App.css';

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <AppContent />
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
