import React from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ weatherData, city }) => {
  const {
    main: { temp, humidity, feels_like },
    weather: [{ description, icon, main }],
    wind: { speed },
    sys: { country }
  } = weatherData;

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const getTemperatureColor = (temperature) => {
    if (temperature <= 0) return '#74b9ff'; // Cold - Blue
    if (temperature <= 15) return '#0984e3'; // Cool - Dark Blue
    if (temperature <= 25) return '#00b894'; // Mild - Green
    if (temperature <= 35) return '#fdcb6e'; // Warm - Yellow
    return '#e17055'; // Hot - Red
  };

  return (
    <div className="weather-display">
      <div className="weather-header">
        <h2 className="city-name">
          {city}, {country}
        </h2>
        <div className="weather-main">
          <img
            src={iconUrl}
            alt={description}
            className="weather-icon"
          />
          <div className="temperature-section">
            <span 
              className="temperature"
              style={{ color: getTemperatureColor(temp) }}
            >
              {Math.round(temp)}°C
            </span>
            <p className="weather-description">
              {description.charAt(0).toUpperCase() + description.slice(1)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Feels like</span>
          <span className="detail-value">{Math.round(feels_like)}°C</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{speed} m/s</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Condition</span>
          <span className="detail-value">{main}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;