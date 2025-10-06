import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Oops! Something went wrong</h3>
      <p className="error-message">{message}</p>
      <div className="error-suggestions">
        <p className="suggestion-title">Please check:</p>
        <ul className="suggestion-list">
          <li>City name spelling is correct</li>
          <li>City exists and is recognized</li>
          <li>Your internet connection</li>
          <li>API key is valid (if you're the developer)</li>
        </ul>
      </div>
    </div>
  );
};

export default ErrorMessage;