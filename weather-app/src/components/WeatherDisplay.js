import React, { useContext, useMemo } from 'react';
import { WeatherContext } from '../context/WeatherContext';

const WeatherDisplay = () => {
  const { weather } = useContext(WeatherContext);
  const weatherDetails = useMemo(() => {
    if (!weather) return null;
    const weatherDescriptions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
    };
    return {
      city: weather.city,
      temperature: weather.temperature,
      windspeed: weather.windspeed,
      description: weatherDescriptions[weather.weathercode] || 'Unknown',
    };
  }, [weather]);

  if (!weatherDetails) {
    return <p className="no-data">No weather data available. Search for a city!</p>;
  }

  return (
    <div className="weather-card">
      <h2>{weatherDetails.city}</h2>
      <p>
        Temperature: <span>{weatherDetails.temperature}°C</span>
      </p>
      <p>
        Wind Speed: <span>{weatherDetails.windspeed} km/h</span>
      </p>
      <p>
        Weather: <span>{weatherDetails.description}</span>
      </p>
    </div>
  );
};

export default WeatherDisplay;
