import React from 'react';
import './FiveDayForecast.css';

const FiveDayForecast = ({ forecastData }) => {
  // Process forecast data to get daily forecasts
  const getDailyForecasts = () => {
    const dailyForecasts = {};
    
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();
      
      if (!dailyForecasts[dayKey]) {
        dailyForecasts[dayKey] = {
          date: date,
          temp_min: item.main.temp,
          temp_max: item.main.temp,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          items: [item]
        };
      } else {
        dailyForecasts[dayKey].temp_min = Math.min(dailyForecasts[dayKey].temp_min, item.main.temp);
        dailyForecasts[dayKey].temp_max = Math.max(dailyForecasts[dayKey].temp_max, item.main.temp);
        dailyForecasts[dayKey].items.push(item);
      }
    });

    // Convert to array and take first 5 days
    return Object.values(dailyForecasts).slice(0, 5);
  };

  const formatDay = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  const dailyForecasts = getDailyForecasts();

  return (
    <div className="five-day-forecast">
      <h2 className="forecast-title">5-Day Forecast</h2>
      <div className="forecast-container">
        {dailyForecasts.map((day, index) => (
          <div key={index} className="forecast-day">
            <div className="day-name">
              {formatDay(day.date)}
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
              className="forecast-icon"
            />
            <div className="forecast-temps">
              <span className="temp-max">{Math.round(day.temp_max)}°</span>
              <span className="temp-min">{Math.round(day.temp_min)}°</span>
            </div>
            <div className="forecast-description">
              {day.description.charAt(0).toUpperCase() + day.description.slice(1)}
            </div>
            <div className="forecast-humidity">
              💧 {Math.round(day.items.reduce((acc, item) => acc + item.main.humidity, 0) / day.items.length)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;