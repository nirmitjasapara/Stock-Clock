import React, { Component } from "react";
import Graph from "../../components/Graph/Graph";
import NewsFeed from "../../components/NewsFeed/NewsFeed";
import ApiService from "../../services/api-service";
import CustomContext from "../../contexts/CustomContext";
import "./CompanyPage.css";

export default class CompanyPage extends Component {
  static contextType = CustomContext;
  static defaultProps = {
    history: {
      push: () => {}
    }
  };
  state = {
    timeData: [],
    priceData: [],
    newsData: [],
    start: null,
    end: null,
    company_data: {}
  };

  componentDidMount() {
    const { symbol } = this.props.match.params;

    this.context.clearError();
    this.setCompanyData(symbol);
    this.setTimingData(symbol);
  }
  setCompanyData = symbol => {
    var company = this.context.getCompany(symbol);
    this.setState({ company_data: company });
    if (!company) {
      console.log("fetched: " + symbol);
      return ApiService.getCompanyData(symbol)
        .then(this.context.cacheCompany)
        .then(c => this.setState({ company_data: c }))
        .catch(this.context.setError);
    }
  };
  setTimingData = symbol => {
    let timeDataValues = [];
    let priceDataValues = [];
    ApiService.getTimingData(symbol)
      .catch(this.context.setError)
      .then(data => {
        for (var key in data["Time Series (Daily)"]) {
          timeDataValues.push(key);
          priceDataValues.push(data["Time Series (Daily)"][key]["1. open"]);
        }
        this.setState({
          timeData: timeDataValues,
          priceData: priceDataValues
        });
      });
  };
  setNewsData = (symbol, start, end) => {
    ApiService.getNewsData(symbol, start, end)
      .then(d => this.setState({ newsData: d }))
      .catch(this.context.setError);
  };
  onGraphChange = (start, end) => {
    this.setState({
      start,
      end
    });
    this.setNewsData(
      this.state.company_data["Symbol"],
      this.state.start,
      this.state.end
    );
  };
  render() {
    var c = this.state.company_data;
    return (
      <main className="company-page-main">
        {c ? (
          <div>
            <h1>
              {c["Name"]} ({c["Symbol"]})
            </h1>
            <p>{c["Description"]}</p>
            <Graph
              onGraphChange={this.onGraphChange}
              title={c["Symbol"]}
              x={this.state.timeData}
              y={this.state.priceData}
            />
            <NewsFeed newslist={this.state.newsData} />
          </div>
        ) : (
          <p className="red">There was an error, try again</p>
        )}
      </main>
    );
  }
}
