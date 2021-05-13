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
    companyData: {},
    companyDataError: null,
    timeData: [],
    priceData: [],
    timingDataError: null,
    newsData: [],
    newsDataError: null,

    start: null,
    end: null
  };

  componentDidMount() {
    const { symbol } = this.props.match.params;

    this.context.clearError();
    this.setCompanyData(symbol);
    this.setTimingData(symbol);
  }
  setCompanyData = symbol => {
    var company = this.context.getCompany(symbol);
    this.setState({ companyData: company });
    if (!company) {
      return ApiService.getCompanyData(symbol)
        .then(this.context.cacheCompany)
        .then(c => this.setState({ companyData: c }))
        .catch(e => this.setState({ companyDataError: e }));
    }
  };
  setTimingData = symbol => {
    let timeDataValues = [];
    let priceDataValues = [];
    ApiService.getTimingData(symbol)
      .catch(e => this.setState({ timingDataError: e }))
      .then(data => {
        for (var key in data["Time Series (Daily)"]) {
          timeDataValues.push(key);
          priceDataValues.push(data["Time Series (Daily)"][key]["1. open"]);
        }
        const lastdate = timeDataValues[0];
        this.setState({
          timeData: timeDataValues,
          priceData: priceDataValues,
          start: lastdate,
          end: lastdate
        });
        return lastdate;
      })
      .then(lastdate => {
        this.setNewsData(symbol, lastdate, lastdate);
      });
  };
  setNewsData = (symbol, start, end) => {
    ApiService.getNewsData(symbol, start, end)
      .then(d => this.setState({ newsData: d }))
      .catch(e => this.setState({ newsDataError: e }));
  };
  onGraphChange = (start, end) => {
    this.setState({
      start,
      end
    });
    this.setNewsData(
      this.state.companyData["Symbol"],
      this.state.start,
      this.state.end
    );
  };
  renderTable = c => {
    const keys = [
      "52WeekHigh",
      "52WeekLow",
      "50DayMovingAverage",
      "200DayMovingAverage",
      "AnalystTargetPrice",
      "SharesFloat",
      "SharesShort",
      "EPS",
      "ProfitMargin",
      "DividendPerShare"
    ];
    return keys.map(k => (
      <div key={k} className="table-entry">
        <p>{k.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")}</p>
        <p>{c[k]}</p>
      </div>
    ));
  };
  render() {
    var c = this.state.companyData;
    return c ? (
      <main className="company-page-main">
        {this.state.companyDataError && (
          <p className="red">Failed Company Information API fetch</p>
        )}
        {this.state.timingDataError && (
          <p className="red">Failed Graph Information API fetch</p>
        )}
        {this.state.newsDataError && (
          <p className="red">Failed News API fetch</p>
        )}
        <h1>
          {c["Name"]} ({c["Symbol"]})
        </h1>
        <details>
          <summary>Company Details:</summary>
          <p>{c["Description"]}</p>
        </details>
        <Graph
          onGraphChange={this.onGraphChange}
          title={c["Symbol"]}
          x={this.state.timeData}
          y={this.state.priceData}
        />
        <section id="statistics">
          <h2>Statistics</h2>
          <div className="data-table">{this.renderTable(c)}</div>
        </section>
        <NewsFeed newslist={this.state.newsData} />
      </main>
    ) : (
      <p>Loading</p>
    );
  }
}
