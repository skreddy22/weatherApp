import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import WeatherSearch from './components/WeatherSearch';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

function App() {
  return (
    <WeatherProvider>
      <div className="App">
        <h1>Weather App</h1>
        <WeatherSearch />
        <WeatherDisplay />
      </div>
    </WeatherProvider>
  );
}

export default App;
