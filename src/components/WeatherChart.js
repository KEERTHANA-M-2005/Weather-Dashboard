// src/components/WeatherChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const WeatherChart = ({ forecast }) => {
  const labels = forecast.list.slice(0, 8).map(f => f.dt_txt);
  const temps = forecast.list.slice(0, 8).map(f => f.main.temp);

  const data = {
    labels,
    datasets: [{
      label: 'Temperature (°C)',
      data: temps,
      fill: false,
      borderColor: '#007bff',
      tension: 0.4,
    }],
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Next 24 Hours Forecast</h3>
      <Line data={data} />
    </div>
  );
};

export default WeatherChart;
