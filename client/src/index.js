import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './components/App.jsx';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
