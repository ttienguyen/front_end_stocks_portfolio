import React, { useState, useEffect } from "react";
import Stocks from "./components/Stocks.js";
import "./App.css";
import StockForm from "./components/StockForm.js";
import axios from "axios";

function App() {
  const [stocks, setStocks] = useState([]);

  /*---------------------POST TO BACKEND-----------------------------*/
  const addNewStock = (stock) => {
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
        setStocks(response.data.stocks);
      })
      .catch((error) => {
        console.log(<section>{error.response.data.message}</section>);
      });
  };

  /*---------UseEffect (execues one time when App is called)---------------*/

  useEffect(() => {
    refreshStocks();
  }, []);

  /* ------------------------RETURN-------------------------------------------*/
  return (
    <div id="App">
      <header>
        <h1>Personal Stocks Portfolio</h1>
      </header>
      <Stocks stocks={stocks} deleteStockCallBack={deleteStock} />
      <StockForm addNewStockCallBack={addNewStock} />
    </div>
  );
}

export default App;
