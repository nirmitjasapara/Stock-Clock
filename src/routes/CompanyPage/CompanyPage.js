import React, { Component } from "react";
import Graph from "../../components/Graph/Graph";
import NewsFeed from "../../components/NewsFeed/NewsFeed";
import ApiService from "../../services/api-service";
import CustomContext from "../../contexts/CustomContext";
import "./CompanyPage.css";
import Plot from "react-plotly.js";

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
            <Plot
              data={[
                {
                  x: this.state.timeData,
                  y: this.state.priceData,
                  type: "scatters",
                  mode: "lines",
                  marker: { color: "red" }
                }
              ]}
              layout={{ width: 1000, height: 440, title: c["Symbol"] }}
              onClick={data => {
                document.getElementById("news").innerHTML = "";

                var pn = "",
                  tn = "",
                  urlArr = [],
                  headlineUrl = [];
                for (var i = 0; i < data.points.length; i++) {
                  pn = data.points[i].pointNumber;
                  tn = data.points[i].curveNumber;
                  let API_Call = `https://finnhub.io/api/v1/company-news?symbol=${
                    c["Symbol"]
                  }&from=${data.points[i].x}&to=${
                    data.points[i].x
                  }&token=c28di0qad3i8rjpb2tdg`;
                  console.log(API_Call);
                  fetch(API_Call)
                    .then(function(response) {
                      return response.json();
                    })
                    .then(function(data) {
                      for (var i = 0; i < data.length; i++) {
                        urlArr.push(data[i].url);
                        headlineUrl.push(data[i].headline);
                      }
                      var myDiv = document.getElementById("news");
                      urlArr.forEach((x, i) => {
                        myDiv.innerHTML += `<li><a href ="${x}">${headlineUrl[i]}</a></li>`;
                      });
                    });
                }
              }}
              onRelayout={data => {
                document.getElementById("news").innerHTML = "";

                var start = "",
                  end = "",
                  urlArr = [],
                  headlineUrl = [];
                start = data["xaxis.range[0]"].split(" ")[0];
                end = data["xaxis.range[1]"].split(" ")[0];

                let API_Call = `https://finnhub.io/api/v1/company-news?symbol=${
                  c["Symbol"]
                }&from=${start}&to=${end}&token=c28di0qad3i8rjpb2tdg`;
                console.log(API_Call);
                fetch(API_Call)
                  .then(function(response) {
                    return response.json();
                  })
                  .then(function(data) {
                    for (var i = 0; i < data.length; i++) {
                      urlArr.push(data[i].url);
                      headlineUrl.push(data[i].headline);
                    }
                    var myDiv = document.getElementById("news");
                    urlArr.forEach((x, i) => {
                      myDiv.innerHTML += `<li><a href ="${x}">${headlineUrl[i]}</a></li>`;
                    });
                  });
              }}
            />

            <div id="news"></div>
          </div>
        ) : (
          <p className="red">There was an error, try again</p>
        )}

        <NewsFeed newslist={[]} />
      </main>
    );
  }
}
