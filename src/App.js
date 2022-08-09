import React, { useState, useEffect } from "react";
import Stocks from "./components/Stocks.js";
import "./App.css";
import StockForm from "./components/StockForm.js";
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
} from "chart.js";
import { Chart } from "react-chartjs-2";

function App() {
  const [stocks, setStocks] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [date, setDate] = useState("");
  // monthlyPrices is a list of prices for the stock held in currentStock
  const [monthlyPrices, setMonthlyPrices] = useState([]);
  const [currentStock, setCurrentStock] = useState({}); //js object not quite a dictionary
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Test",
      },
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const dataset1 = {
    type: "line",
    label: "Dataset 1",
    data: [1, 2, 3, 4, 5, 6, 7],
  };

  const data = {
    labels: labels,
    datasets: [
      dataset1,
      {
        type: "bar",
        label: "Dataset 2",
        data: [1, -1, 1, -2, 1, -3, 1],
      },
    ],
  };

  /*---------------------POST or PUT TO BACKEND-----------------------------*/
  const addOrModifyStock = (stock) => {
    // Look for stock.ticker in stocks
    // If you find stock.ticker, then it's an update - make a patch http call to the back-end
    // if you don't find stock.ticker, then it's a new stock - make a post http call to the back-end
    let foundStock = false;
    let stockID = 0;
    for (let i = 0; i < stocks.length; i++) {
      if (stocks[i].ticker === stock.ticker) {
        foundStock = true;
        stockID = stocks[i].id;
        break;
      }
    }
    if (foundStock) {
      axios
        .put(
          `https://personal-stocks-portfolio.herokuapp.com/stocks/${stockID}`,
          {
            shares: stock.shares,
          }
        )
        .catch((error) => {
          console.log(<section>{error.response.datamessage}</section>);
        })
        .finally(() => {
          refreshStocks();
        });
    } else {
      axios
        .post("https://personal-stocks-portfolio.herokuapp.com/stocks", {
          ticker: stock.ticker,
          shares: stock.shares,
        })
        .catch((error) => {
          console.log(<section>{error.response.data.message}</section>);
        })
        .finally(() => {
          refreshStocks();
        });
    }
  };

  /* -------------------------Delete--------------------------------------- */
  const deleteStock = (id) => {
    for (let i = 0; i < stocks.length; i++) {
      if (stocks[i].id === id) {
        stocks.splice(i, 1);
        break; //remove an entire object that is a single stock instance with that id
      }
    }
    const newStocks = [...stocks];
    setStocks(newStocks);

    axios
      .delete(`https://personal-stocks-portfolio.herokuapp.com/stocks/${id}`)
      .then((response) => {})
      .catch((error) => {
        console.log(<section>{error.response.datamessage}</section>);
      });
  };

  /* -------------------------Get prices for one stock from backend----------------------------------*/

  const getPricesForStock = (id) => {
    let stockID = 0;
    for (let i = 0; i < stocks.length; i++) {
      if (stocks[i].id === id) {
        stockID = stocks[i].id;
        setCurrentStock(stocks[i]);
        break;
      }
    }
    axios
      .get(
        `https://personal-stocks-portfolio.herokuapp.com/stocks/${stockID}/prices`
      )
      .then((response) => {
        const labels = [];
        for each element in response.data.prices
          append date to labels
        newData = {
          labels: labels;
          datasets: ...
        }
        setChartData(newData)
        setMonthlyPrices(response.data.prices);
      })
      .catch((error) => {
        console.log(<section>{error.response.data.message}</section>);
      });
  };

  /* -------------------------Get portfolio from backend----------------------------------*/

  const refreshStocks = () => {
    axios
      .get(
        "https://personal-stocks-portfolio.herokuapp.com/stocks/portfolio/value"
      )
      .then((response) => {
        setPortfolioValue(response.data.portfolio_value); //axios takes json response from the backend and turns into js object
        setStocks(response.data.stocks);
        setDate(response.data.date);
      })
      .catch((error) => {
        console.log(<section>{error.response.data.message}</section>);
      });
  };

  /*---------UseEffect (executes one time when App is called)---------------*/

  useEffect(refreshStocks, []);

  /* ------------------------RETURN-------------------------------------------*/
  return (
    <div id="App">
      <header>
        <h1>Personal Stock Portfolio</h1>
        <p>Total portfolio value: ${portfolioValue}</p>
        <p> at current date: {date}</p>
      </header>
      <Stocks stocks={stocks} deleteStockCallBack={deleteStock} />
      <StockForm addOrModifyStockCallBack={addOrModifyStock} />
      <Chart options={options} data={data} />
    </div>
  );
}

export default App;
