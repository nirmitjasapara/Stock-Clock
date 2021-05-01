import React, { Component } from 'react'
import Graph from '../../components/Graph/Graph'
import NewsFeed from '../../components/NewsFeed/NewsFeed'
import ApiService from '../../services/api-service';
import CustomContext from '../../contexts/CustomContext';
import './CompanyPage.css'
import Plot from 'react-plotly.js';

export default class CompanyPage extends Component {
  static contextType = CustomContext
  static defaultProps = {
    history: {
      push: () => {},
    },
  }
  state = {
    timeData: [],
    priceData: [],

    company_data: {}
  };

  componentDidMount() {
    const { symbol } = this.props.match.params;
    var company = this.context.getCompany(symbol);
    let timeDataValues = [];
    let priceDataValues = [];
    const pointerToThis = this;
    this.setState({company_data: company});
    this.context.clearError();
    ApiService.getTimingData(symbol)
        .catch(this.context.setError)
        .then((data) => {
          for (var key in data['Time Series (Daily)']) {
            timeDataValues.push(key);
            priceDataValues.push(data['Time Series (Daily)'][key]['1. open']);
          }
          pointerToThis.setState({
            timeData: timeDataValues,
            priceData: priceDataValues
          });
                });
    if (!company) {
      console.log("fetched: " + symbol);
      return ApiService.getCompanyData(symbol)
            .then(this.context.cacheCompany)
            .then(c => this.setState({company_data: c}))
            .catch(this.context.setError)
    }
  }

  render() {
    var c = this.state.company_data;
    return (
      <main className='company-page-main'>
        {c ? 
          <div>
            <h1>{c["Name"]} ({c["Symbol"]})</h1>
            <p>{c["Description"]}</p>
            <Plot

data={[
  {
    x: this.state.timeData,
    y: this.state.priceData,
    type: 'line',
    mode: 'lines',
    marker: {color: 'red'},
  }
]}
layout={{width: 1000, height: 440, title: c["Symbol"]}}
/>
          </div> : 
          <p className='red'>There was an error, try again</p>
        }
      
      
        <NewsFeed
            newslist={[]}
        />
      </main>
    )
  }
}