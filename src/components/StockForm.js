import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const StockForm = (props) => {
  const [formFields, setFormFields] = useState({
    ticker: "",
    shares: "",
  });

  const onTickerChange = (event) => {
    setFormFields({
      ...formFields,
      // shares: formFields.shares,
      ticker: event.target.value,
    });
  };

  const onSharesChange = (event) => {
    setFormFields({
      ...formFields,
      shares: event.target.value,
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    props.addOrModifyStockCallBack(formFields);

    setFormFields({
      ticker: "",
      shares: "",
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div>
        <label htmlFor="stockTicker">stock ticker: </label>
        <input
          name="stockTicker"
          value={formFields.ticker}
          onChange={onTickerChange}
        />
      </div>

      <div>
        <label htmlFor="stockShares">number of shares: </label>
        <input
          name="stockShares"
          value={formFields.shares}
          onChange={onSharesChange}
        />
      </div>
      <input type="submit" value="add stock / modify stock" />
    </form>
  );
};

export default StockForm;
