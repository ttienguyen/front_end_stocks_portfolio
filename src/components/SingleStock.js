import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const SingleStock = (props) => {
  const deleteSingleStock = () => {
    props.deleteStockCallBack(props.id);
  };
  return (
    <section>
      <h1> stock ticker: {props.ticker}</h1>
      <ul>
        <li> ID: {props.id}</li>
        <li> shares: {props.shares}</li>
        <li> price:{props.price}</li>
        <li> total value: {props.stockValue}</li>
      </ul>
      <section>
        <button onClick={deleteSingleStock}>🗑</button>
      </section>
    </section>
  );
};

export default SingleStock;
