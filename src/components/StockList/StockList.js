import React, { Component } from "react";
import CustomContext from "../../contexts/CustomContext";
import StockItem from "../../components/StockItem/StockItem";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./StockList.css";

export default class StockList extends Component {
  static contextType = CustomContext;

  renderList() {
    let { tickers = [], followings = [] } = this.context;
    if (!tickers.length) {
      if (!followings?.length)
        return <p className="grey">Please add some companies</p>;
      else tickers = followings;
    }
    return tickers.map(company => (
      <StockItem key={"company-" + company.symbol} company={company} />
    ));
  }

  render() {
    return (
      <section className="stock-list">
        {this.context.error ? <p className="red">Error</p> : this.renderList()}
        <Link to="/add" type="button" className="add-button">
          <FontAwesomeIcon icon={faPlus} className="icon" />
        </Link>
      </section>
    );
  }
}
