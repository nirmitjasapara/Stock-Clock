import React, { Component } from "react";
import { Link } from "react-router-dom";
import CustomContext, { StatusCodes } from "../../contexts/CustomContext";
import ApiService from "../../services/api-service";
import "./StockItem.css";

export default class StockItem extends Component {
  static contextType = CustomContext;
  static defaultProps = {
    company: {},
    status: null,
    id: null
  };
  handleDelete = e => {
    e.preventDefault();
    const id = this.props.id;
    ApiService.unfollow(id)
      .then(() => {
        this.context.removeFollowing(id);
      })
      .catch(error => console.error({ error }));
  };
  renderCompleteTicker(company) {
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
  renderLiteTicker(company) {
    return (
      <Link
        to={"/company/" + company.symbol}
        type="button"
        className={"stock-list-button"}
      >
        <p>{company.symbol}</p>
      </Link>
    );
  }
  renderTicker(c, s) {
    switch (s) {
      case StatusCodes.TICKERS_FETCHED:
        return this.renderCompleteTicker(c);
      case StatusCodes.FOLLOWINGS_FETCHED:
        return this.renderLiteTicker(c);
      default:
        break;
    }
  }
  render() {
    const { company, status } = this.props;
    return (
      <li className="stock-item">
        {this.renderTicker(company, status)}
        <button onClick={this.handleDelete} className="delete-button">
          Delete
        </button>
      </li>
    );
  }
}
