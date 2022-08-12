import React, { useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(CategoryScale);
ChartJS.register(LinearScale);
ChartJS.register(PointElement);
ChartJS.register(LineElement);
ChartJS.register(BarElement);
ChartJS.register(Title);
ChartJS.register(Tooltip);
ChartJS.register(Legend);

/* -------------------------Get prices for one stock from backend----------------------------------*/

const ChartPrices = (props) => {
  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  const priceRecords = props.priceData;
  const labels = [];
  const prices = [];
  for (let idx in priceRecords) {
    let priceRecord = priceRecords[idx];
    labels.push(priceRecord.date);
    prices.push(priceRecord.price);
  }
  const newChartData = {
    labels: labels,
    datasets: [
      {
        type: "line",
        label: `Monthly Prices for ${props.ticker}`,
        data: prices,
        borderColor: "#084de0",
      },
    ],
  };

  return (
    <div>
      <Line options={chartOptions} data={newChartData} />;
    </div>
  );
};

export default ChartPrices;
