import React, { Component } from "react";

export const StatusCodes = {
  INIT: "init",
  FOLLOWINGS_FETCHED: "followings",
  TICKERS_FETCHED: "tickers"
};

const CustomContext = React.createContext({
  followings: [],
  fetchstatus: StatusCodes.INIT,
  tickers: [],
  companyref: [],
  cache: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setCompanyRef: () => {},
  clearCompanyRef: () => {},
  setFollowings: () => {},
  addFollowing: () => {},
  removeFollowing: () => {},
  clearFollowings: () => {},
  setTickers: () => {},
  addTicker: () => {},
  clearTickers: () => {},
  getCompany: () => {},
  cacheCompany: () => {}
});

export default CustomContext;

export class CustomProvider extends Component {
  state = {
    followings: [],
    fetchstatus: StatusCodes.INIT,
    tickers: [],
    companyref: [],
    cache: [],
    error: null
  };

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };
  setCompanyRef = companyref => {
    this.setState({ companyref });
  };
  clearCompanyRef = () => {
    this.setState({ companyref: [] });
  };
  setFollowings = followings => {
    this.setState({ followings, fetchstatus: StatusCodes.FOLLOWINGS_FETCHED });
  };
  addFollowing = company => {
    this.setState({ followings: [...this.state.followings, company] });
  };
  removeFollowing = id => {
    const symbol = this.state.followings.find(c => c.id === id).symbol;
    this.setState({
      followings: this.state.followings.filter(c => c.id !== id),
      tickers: this.state.tickers.filter(
        c => c.symbol.toLowerCase() !== symbol.toLowerCase()
      )
    });
  };
  clearFollowings = () => {
    this.setState({ followings: [] });
  };
  setTickers = tickers => {
    this.setState({ tickers, fetchstatus: StatusCodes.TICKERS_FETCHED });
  };
  addTicker = ticker => {
    this.setState({ tickers: [...this.state.tickers, ticker] });
  };
  clearTickers = () => {
    this.setState({ tickers: [] });
  };
  getCompany = symbol => {
    return this.state.cache.find(
      company => company["Symbol"].toLowerCase() === symbol.toLowerCase()
    );
  };
  cacheCompany = company => {
    this.setState({ cache: [...this.state.cache, company] });
    return company;
  };
  render() {
    const value = {
      followings: this.state.followings,
      fetchstatus: this.state.fetchstatus,
      tickers: this.state.tickers,
      companyref: this.state.companyref,
      cache: this.state.cache,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setCompanyRef: this.setCompanyRef,
      clearCompanyRef: this.clearCompanyRef,
      setFollowings: this.setFollowings,
      addFollowing: this.addFollowing,
      removeFollowing: this.removeFollowing,
      clearFollowings: this.clearFollowings,
      setTickers: this.setTickers,
      addTicker: this.addTicker,
      clearTickers: this.clearTickers,
      getCompany: this.getCompany,
      cacheCompany: this.cacheCompany
    };
    return (
      <CustomContext.Provider value={value}>
        {this.props.children}
      </CustomContext.Provider>
    );
  }
}
