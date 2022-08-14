import "./SingleStock.css";

const SingleStock = (props) => {
  const deleteSingleStock = () => {
    props.deleteStockCallBack(props.id);
  };
  const chartPricesOfStock = () => {
    props.chartPricesCallBack(props.id);
  };

  return (
    <section className="single-box">
      <h1> stock ticker: {props.ticker}</h1>
      <ul>
        <li> ID: {props.id}</li>
        <li> shares: {props.shares}</li>
        <li> price: ${props.price}</li>
        <li> total stock value: ${props.stockValue}</li>
      </ul>
      <section>
        <button onClick={deleteSingleStock}>🗑</button>
        <button onClick={chartPricesOfStock}> price chart</button>
      </section>
    </section>
  );
};

export default SingleStock;
