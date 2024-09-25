import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../theme';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký các phần tử Chart.js
ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
  const theme = useTheme();
  const colorsMode = tokens(theme.palette.mode);

  const formatTime = (time) => {
    const date = new Date(time);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const labels = data[0].data.map((item) => formatTime(item.x));
  const temperatureData = data[0].data.map((item) => item.y);
  const humidityData = data[1].data.map((item) => item.y);
  const lightData = data[2].data.map((item) => item.y);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature',
        data: temperatureData,
        borderColor: '#e41a1c',
        backgroundColor: 'rgba(228, 26, 28, 0.2)',
        fill: true,
        yAxisID: 'y',
        pointRadius: 1,
        tension: 0.5,
      },
      {
        label: 'Humidity',
        data: humidityData,
        borderColor: '#377eb8',
        backgroundColor: 'rgba(55, 126, 184, 0.2)',
        fill: true,
        yAxisID: 'y',
        tension: 0.5,
        pointRadius: 1,
      },
      {
        label: 'Light',
        data: lightData,
        borderColor: '#4daf4a',
        backgroundColor: 'rgba(77, 175, 74, 0.2)',
        fill: true,
        yAxisID: 'y2',
        pointRadius: 1,
        tension: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    layout: {
      padding: {
        top: 10,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature/Humidity',
        },
        min: 0,
        max: 100,
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        title: {
          display: true,
          text: 'Light',
        },
        min: 0,
        max: 1200,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          color: colorsMode.grey[100],
        },
      },
      tooltip: {
        backgroundColor: colorsMode.primary[500],
      },
    },
  };

  return (
    <Box position="relative">
      <Line data={chartData} options={options} width={800} height={275} />
    </Box>
  );
};

export default LineChart;
