import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./StockItem.css";

export default class StockItem extends Component {
  static defaultProps = {
    company: {}
  };

  render() {
    const company = this.props.company;
    return (
      <Link
        to={"/company/" + company.symbol}
        type="button"
        className={`stock-list-button ${
          company.percent_change < 0 ? "red" : "green"
        }`}
      >
        <p>{company.name}</p>
        <p>{company.symbol}</p>
        <br />
        <p>{`${company.close} ${company.currency}`}</p>
        <p>{`${company.change} ${company.currency}`}</p>
        <p>{`${company.percent_change}%`}</p>
      </Link>
    );
  }
}
