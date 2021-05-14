import React, { Component } from "react";
import CustomContext, { StatusCodes } from "../../contexts/CustomContext";
import StockItem from "../../components/StockItem/StockItem";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./StockList.css";

export default class StockList extends Component {
  static contextType = CustomContext;

  renderEmpty() {
    return (
      <p className="empty-list">
        Please add some companies by clicking the plus button
      </p>
    );
  }

  renderLoading() {
    return <p>Loading</p>;
  }

  renderItems(companies, status) {
    if (!companies.length) return this.renderEmpty();
    else {
      const f = this.context.followings;
      return companies.map(company => {
        if (!company.symbol) return "";
        const id = f.find(
          c => c.symbol.toLowerCase() === company.symbol.toLowerCase()
        ).id;
        return (
          <StockItem
            key={"company-" + company.symbol}
            company={company}
            status={status}
            id={id}
          />
        );
      });
    }
  }

  renderList() {
    let { tickers = [], followings = [], fetchstatus } = this.context;
    switch (fetchstatus) {
      case StatusCodes.INIT:
        return this.renderLoading();
      case StatusCodes.FOLLOWINGS_FETCHED:
        return this.renderItems(followings, fetchstatus);
      case StatusCodes.TICKERS_FETCHED:
        return this.renderItems(tickers, fetchstatus);
      default:
        break;
    }
  }

  render() {
    return (
      <section className="stocks">
        {this.context.error && <p className="red">Failed API fetch</p>}
        <ul className="stocks-list">
          {this.renderList()}
          <li className="list-item">
            <Link to="/add" type="button" className="add-button">
              <FontAwesomeIcon icon={faPlus} className="icon" />
            </Link>
          </li>
        </ul>
      </section>
    );
  }
}
