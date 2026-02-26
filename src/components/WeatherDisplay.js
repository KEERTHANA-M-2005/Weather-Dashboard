import React from "react";

const WeatherDisplay = ({ data, forecast }) => {
  if (!data || !data.weather || data.weather.length === 0) {
    // nothing sensible to render yet
    return null;
  }

  const icon = data.weather[0].icon;

  return (
    <div className="weather-display card">
      <div className="weather-main">
        <h2>{data.name}, {data.sys && data.sys.country}</h2>
        <p>{data.weather[0].main} - {data.weather[0].description}</p>
        <div className="weather-stats">
          <p>🌡️ Temp: {data.main.temp}°C</p>
          <p>💨 Wind: {data.wind.speed} m/s</p>
          <p>💧 Humidity: {data.main.humidity}%</p>
        </div>
      </div>

      <div style={{textAlign: 'center'}}>
        <img src={`http://openweathermap.org/img/wn/${icon}@4x.png`} alt="Weather icon" />
      </div>

      {forecast && (
        <div className="forecast">
          <h3>5-Day Forecast</h3>
          <div className="forecast-list">
            {forecast.list.slice(0, 5).map((item, index) => (
              <div key={index} className="forecast-item">
                <p>{item.dt_txt.split(" ")[0]}</p>
                <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="icon" />
                <p>{Math.round(item.main.temp)}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
