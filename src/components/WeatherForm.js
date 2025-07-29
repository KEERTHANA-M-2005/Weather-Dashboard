import React, { useState } from "react";
import axios from "axios";

const WeatherForm = ({ setWeatherData, setForecastData, setLoading, setErrorMsg }) => {
  const [city, setCity] = useState("");
  const API_KEY = "3859c05e953fcfaf3885c40bcb434207";

  const getWeather = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setErrorMsg("Please enter a valid city.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const [currentRes, forecastRes] = await Promise.all([
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        ),
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        )
      ]);

      setWeatherData(currentRes.data);
      setForecastData(forecastRes.data);
    } catch (error) {
      console.error(error);
      setErrorMsg("City not found or network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={getWeather} className="weather-form">
      <input
        id="city-input"
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Get Weather</button>
    </form>
  );
};

export default WeatherForm;
