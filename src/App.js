import React, { useState, useEffect } from "react";
import Stocks from "./components/Stocks.js";
import "./App.css";
import StockForm from "./components/StockForm.js";
import axios from "axios";

function App() {
  const [stocks, setStocks] = useState([]);

  const addNewStock = (stock) => {
    // This function adds a new js object stock to stocks
    console.log(stock.ticker);
    console.log(stock.shares);
    const newStock = {
      stock_id: 5,
      ticker: stock.ticker,
      shares: parseInt(stock.shares),
      price: 15.0,
      date: "2022-08-01",
    };
    const newStocks = [...stocks, newStock];
    setStocks(newStocks);
  };

  const deleteStock = (id) => {
    for (let i = 0; i < stocks.length; i++) {
      if (stocks[i].id === id) {
        stocks.splice(i, 1);
      }
    }
    const newStocks = [...stocks];
    setStocks(newStocks);
  };

  useEffect(() => {
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
  }, []);

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
