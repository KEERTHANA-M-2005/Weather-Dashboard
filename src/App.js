import React, { useState, useEffect } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";
import WeatherChart from "./components/WeatherChart"; // <- You'll need this file
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null); // new
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [recentCities, setRecentCities] = useState(
    JSON.parse(localStorage.getItem("recentCities")) || []
  );

  const updateRecentCities = (city) => {
    const updated = [city, ...recentCities.filter(c => c !== city)].slice(0, 5);
    setRecentCities(updated);
    localStorage.setItem("recentCities", JSON.stringify(updated));
  };

  const handleSetWeather = (data) => {
    setWeatherData(data);
    updateRecentCities(data.name);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        setLoading(true);
        const API_KEY = "3859c05e953fcfaf3885c40bcb434207";
        const { latitude, longitude } = position.coords;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        if (data.cod === 200) handleSetWeather(data);
      } catch (err) {
        console.error("Location fetch failed");
      } finally {
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="app-container">
      <h1>🌤️ Weather Dashboard</h1>
      <WeatherForm
        setWeatherData={handleSetWeather}
        setForecastData={setForecastData}  // pass forecast
        setLoading={setLoading}
        setErrorMsg={setErrorMsg}
      />
      {errorMsg && <p className="error">{errorMsg}</p>}
      {loading && <p className="loading">Loading...</p>}
      {weatherData && <WeatherDisplay data={weatherData} />}
      {forecastData && <WeatherChart forecast={forecastData} />} {/* 👈 show forecast chart */}

      {recentCities.length > 0 && (
        <div className="recent">
          <h3>Recent Cities</h3>
          <ul>
            {recentCities.map((city, index) => (
              <li key={index}>
                <button onClick={() =>
                  document.querySelector("#city-input").value = city
                }>
                  {city}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
