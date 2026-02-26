import React, { useState } from "react";
import axios from "axios";

const WeatherForm = ({ setWeatherData, setForecastData, setLoading, setErrorMsg }) => {
  const [city, setCity] = useState("");
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const getWeather = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setErrorMsg("Please enter a valid city.");
      return;
    }

    if (!API_KEY) {
      setErrorMsg("API key is missing – please add REACT_APP_WEATHER_API_KEY to your .env file.");
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

      // check for OpenWeather error codes (API returns 200 on success, otherwise 4xx/5xx)
      if (currentRes.data.cod && Number(currentRes.data.cod) !== 200) {
        throw new Error(currentRes.data.message || "Unexpected API error");
      }

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
      <button type="submit" className="btn-primary">Get Weather</button>
    </form>
  );
};

export default WeatherForm;
