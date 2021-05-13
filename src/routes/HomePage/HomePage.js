import React, { Component } from "react";
import StockList from "../../components/StockList/StockList";
import ApiService from "../../services/api-service";
import CustomContext, { StatusCodes } from "../../contexts/CustomContext";
import "./HomePage.css";

export default class HomePage extends Component {
  static contextType = CustomContext;
  static defaultProps = {
    history: {
      push: () => {}
    }
  };
  componentDidMount() {
    let { fetchstatus } = this.context;
    if (fetchstatus === StatusCodes.INIT) {
      this.context.clearError();
      ApiService.getFollowings()
        .catch(this.context.setError)
        .then(this.context.setFollowings)
        .then(this.fetchTickers);
    } else if (fetchstatus === StatusCodes.FOLLOWINGS_FETCHED) {
      this.fetchTickers();
    }
  }
  fetchTickers = () => {
    if (!this.context.followings.length) return;
    ApiService.getQuotes(this.context.followings)
      .catch(this.context.setError)
      .then(this.context.setTickers);
  };
  render() {
    return (
      <main className="home-page-main">
        {/* <Graph
        /> */}
        <StockList />
        {/* <NewsFeed
        /> */}
      </main>
    );
  }
}
