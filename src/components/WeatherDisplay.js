import React from "react";
import moment from "moment-timezone";

const WeatherDisplay = ({ data }) => {
  const {
    name,
    sys,
    main,
    weather,
    wind,
    timezone,
    dt,
  } = data;

  const localTime = moment.unix(dt).utcOffset(timezone / 60).format("MMMM Do YYYY, h:mm A");

  return (
    <div className="weather-display">
      <h2>{name}, {sys.country}</h2>
      <p className="local-time">🕒 Local Time: {localTime}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        alt={weather[0].description}
      />
      <p>🌡️ Temperature: {main.temp}°C</p>
      <p>🌥️ Condition: {weather[0].description}</p>
      <p>💧 Humidity: {main.humidity}%</p>
      <p>🌬️ Wind Speed: {wind.speed} m/s</p>
    </div>
  );
};

export default WeatherDisplay;
