import React from "react";

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
import { Bar } from "react-chartjs-2";
import axios from "axios";

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
  const percentGains = [];
  const colors = [];
  for (let idx in priceRecords) {
    let priceRecord = priceRecords[idx];
    labels.push(priceRecord.date);
    prices.push(priceRecord.price);
    percentGains.push(priceRecord.percentage_gain);
    if (priceRecord.percentage_gain > 0) {
      colors.push("green");
    } else {
      colors.push("red");
    }
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
  /*------------percentGainData Chart--------------*/
  const newPercentChartData = {
    labels: labels,
    datasets: [
      {
        type: "bar",
        label: `Percent Gain for ${props.ticker}`,
        data: percentGains,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div>
      <Line options={chartOptions} data={newChartData} />;
      <Bar options={chartOptions} data={newPercentChartData} />;
    </div>
  );
};

export default ChartPrices;
