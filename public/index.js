import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// This is the entry point of the React application.
// It gets the root DOM element and renders the main App component into it.
// The App.jsx file contains all the website's content and logic.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
