import React, { useState, useEffect } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [recentCities, setRecentCities] = useState(
    JSON.parse(localStorage.getItem("recentCities")) || []
  );

  const updateRecentCities = (city) => {
    const updated = [city, ...recentCities.filter((c) => c !== city)].slice(0, 5);
    setRecentCities(updated);
    localStorage.setItem("recentCities", JSON.stringify(updated));
  };

  const handleSetWeather = (data, forecast) => {
    setWeatherData(data);
    setForecastData(forecast);
    updateRecentCities(data.name);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        setLoading(true);
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
        const { latitude, longitude } = position.coords;

        const [currentRes, forecastRes] = await Promise.all([
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`),
          fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
        ]);

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        if (currentData.cod === 200 && forecastData.cod === "200") {
          handleSetWeather(currentData, forecastData);
        }
      } catch (err) {
        console.error("Geolocation fetch failed.");
      } finally {
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="app-container">
      <h1>🌤️ Weather Dashboard</h1>
      <WeatherForm
        setWeatherData={(data) => handleSetWeather(data, forecastData)}
        setForecastData={setForecastData}
        setLoading={setLoading}
        setErrorMsg={setErrorMsg}
      />
      {errorMsg && <p className="error">{errorMsg}</p>}
      {loading && <p className="loading">Loading...</p>}
      {weatherData && (
        <WeatherDisplay data={weatherData} forecast={forecastData} />
      )}
      {recentCities.length > 0 && (
        <div className="recent">
          <h3>Recent Cities</h3>
          <ul>
            {recentCities.map((city, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    document.querySelector("#city-input").value = city;
                  }}
                >
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
