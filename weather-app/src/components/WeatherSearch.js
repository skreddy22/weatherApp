import React, { useState, useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const { setWeather } = useContext(WeatherContext);

  const getCoordinates = async (cityName) => {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0]; 
    }
    throw new Error('City not found');
  };
  const fetchWeather = async () => {
    try {
      const location = await getCoordinates(city);
      const { latitude, longitude } = location;

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const data = await response.json();
      setWeather({
        city: location.name,
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        weathercode: data.current_weather.weathercode,
      });
    } catch (error) {
      console.error('Error fetching weather:', error.message);
      alert('Could not fetch weather for the given city.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default WeatherSearch;
