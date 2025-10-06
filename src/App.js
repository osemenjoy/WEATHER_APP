import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import FiveDayForecast from './components/FiveDayForecast';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

const API_KEY = 'a4678d8bdb00124314f026c479160935'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('');

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError('');
    
    try {
      console.log(`Searching for city: ${cityName}`); // Debug log
      console.log(`API URL: ${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`); // Debug log
      
      // Fetch current weather
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      console.log(`Weather response status: ${weatherResponse.status}`); // Debug log
      
      if (!weatherResponse.ok) {
        const errorData = await weatherResponse.json();
        console.log('Error response:', errorData); // Debug log
        
        if (weatherResponse.status === 401) {
          throw new Error('Invalid API key. Please check your OpenWeather API key.');
        } else if (weatherResponse.status === 404) {
          throw new Error(`City "${cityName}" not found. Please check the spelling and try again.`);
        } else {
          throw new Error(`Weather service error: ${errorData.message || 'Unknown error'}`);
        }
      }
      
      const weatherResult = await weatherResponse.json();
      console.log('Weather data received:', weatherResult); // Debug log
      
      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!forecastResponse.ok) {
        const errorData = await forecastResponse.json();
        console.log('Forecast error response:', errorData); // Debug log
        throw new Error(`Failed to fetch forecast: ${errorData.message || 'Unknown error'}`);
      }
      
      const forecastResult = await forecastResponse.json();
      console.log('Forecast data received:', forecastResult); // Debug log
      
      setWeatherData(weatherResult);
      setForecastData(forecastResult);
      setCity(cityName);
    } catch (err) {
      console.error('API Error:', err); // Debug log
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      <header className="App-header">
        <h1>Weather Forecast</h1>
        <SearchBar onSearch={fetchWeatherData} />
      </header>
      
      <main className="App-main">
        {loading && <Loading />}
        
        {error && <ErrorMessage message={error} />}
        
        {weatherData && !loading && !error && (
          <>
            <WeatherDisplay weatherData={weatherData} city={city} />
            {forecastData && <FiveDayForecast forecastData={forecastData} />}
          </>
        )}
        
        {!weatherData && !loading && !error && (
          <div className="welcome-message">
            <h2>✨ Discover Weather Magic ✨</h2>
            <p>Enter any city name and watch the weather come to life with beautiful animations and real-time data!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;