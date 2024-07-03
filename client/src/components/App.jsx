import React from 'react';
import Dashboard from './Dashboard.jsx';
import NavBar from './NavBar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Dashboard />
    </BrowserRouter>
  );
}

export default App;
