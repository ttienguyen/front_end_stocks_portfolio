import React, { useState, useEffect } from "react";
import Stocks from "./components/Stocks.js";
import "./App.css";
import StockForm from "./components/StockForm.js";
import ChartPrices from "./components/ChartPrices.js";
import axios from "axios";

function App() {
  const [stocks, setStocks] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [date, setDate] = useState("");
  const [chartStockID, setChartStockID] = useState(26);
  const [chartStockTicker, setChartStockTicker] = useState("MSFT");

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

  const chartPrices = (id) => {
    let stock = {};
    for (let i = 0; i < stocks.length; i++) {
      if (stocks[i].id === id) {
        stock = stocks[i];
        break; //remove an entire object that is a single stock instance with that id
      }
    }
    setChartStockID(stock.id);
    setChartStockTicker(stock.ticker);
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
        <p> at date: {date}</p>
      </header>
      <Stocks
        stocks={stocks}
        deleteStockCallBack={deleteStock}
        chartPricesCallBack={chartPrices}
      />
      <StockForm addOrModifyStockCallBack={addOrModifyStock} />
      <ChartPrices id={chartStockID} ticker={chartStockTicker} />
      <footer>
        <p>Designed and programmed by Thuytien Nguyen</p>
      </footer>
    </div>
  );
}

export default App;
