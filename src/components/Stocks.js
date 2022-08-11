import SingleStock from "./SingleStock.js";

const Stocks = (props) => {
  const stockComponents = props.stocks.map((stock, index) => {
    return (
      <div>
        <SingleStock
          key={index}
          id={stock.id}
          ticker={stock.ticker}
          shares={stock.shares}
          price={stock.price}
          stockValue={stock.stock_value}
          deleteStockCallBack={props.deleteStockCallBack}
          chartPricesCallBack={props.chartPricesCallBack}
          chartPercentGainCallBack={props.chartPercentGainCallBack}
        ></SingleStock>
      </div>
    );
  });
  return <section>{stockComponents}</section>;
};
export default Stocks;
