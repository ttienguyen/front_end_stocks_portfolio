import SingleStock from "./SingleStock.js";
import "./Stocks.css";

const Stocks = (props) => {
  const stockComponents = props.stocks.map((stock, index) => {
    return (
      <div className="flex-container">
        <SingleStock
          key={index}
          id={stock.id}
          ticker={stock.ticker}
          shares={stock.shares}
          price={stock.price}
          stockValue={stock.stock_value}
          deleteStockCallBack={props.deleteStockCallBack}
          chartPricesCallBack={props.chartPricesCallBack}
        ></SingleStock>
      </div>
    );
  });
  return <section className="flex-container">{stockComponents}</section>;
};
export default Stocks;
