import React, { useState, useEffect } from "react";
import axios from "axios";

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

// monthlyPrices is a list of prices for the stock held in currentStock
// const [monthlyPrices, setMonthlyPrices] = useState([]);
// const [currentStock, setCurrentStock] = useState({}); //js object not quite a dictionary
// const options = {
//   plugins: {
//     title: {
//       display: true,
//       text: "Percent change",
//     },
//     legend: {
//       display: true,
//       position: "bottom",
//     },
//   },
// };
const labels = ["January", "February", "March", "April", "May", "June", "July"];

const dataset1 = {
  type: "line",
  label: "Dataset 1",
  data: [1, 2, 3, 4, 5, 6, 7],
};

const initialData = {
  labels: labels,
  datasets: [dataset1],
};

/* -------------------------Get prices for one stock from backend----------------------------------*/

const ChartPercentGain = (props) => {
  const [chartOptions, setChartOptions] = useState({
    plugins: {
      title: {
        display: true,
        text: "Percent Change",
      },
      legend: {
        display: true,
        position: "bottom",
      },
    },
  });
  const [chartData, setChartData] = useState(initialData);

  const callingPercentGain = () => {
    axios
      .get(
        `https://personal-stocks-portfolio.herokuapp.com/stocks/${props.id}/prices`
      )
      .then((response) => {
        const percentGainRecords = response.data.prices;
        const labels = [];
        const percentGains = [];
        for (let idx in percentGainRecords) {
          let percentGainRecord = percentGainRecords[idx];
          labels.push(percentGainRecord.date);
          percentGains.push(percentGainRecord.percentage_gain);
        }
        const newChartData = {
          labels: labels,
          datasets: [
            {
              type: "line",
              label: "Percent Gain",
              data: percentGains,
            },
          ],
        };
        setChartData(newChartData);
      })
      .catch((error) => {
        console.log(<section>{error.response.data.message}</section>);
      });
  };

  useEffect(callingPercentGain, []);

  return (
    <div>
      <Line options={chartOptions} data={chartData} />;
    </div>
  );
};

export default ChartPercentGain;
