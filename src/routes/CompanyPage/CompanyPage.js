import React, { Component } from 'react'
import Graph from '../../components/Graph/Graph'
import NewsFeed from '../../components/NewsFeed/NewsFeed'
import ApiService from '../../services/api-service';
import CustomContext from '../../contexts/CustomContext';
import './CompanyPage.css'

export default class CompanyPage extends Component {
  static contextType = CustomContext
  static defaultProps = {
    history: {
      push: () => {},
    },
  }
  state = {
    time_data: [],
    company_data: {}
  };

  componentDidMount() {
    const { symbol } = this.props.match.params;
    var company = this.context.getCompany(symbol);
    this.setState({company_data: company});
    this.context.clearError();
    ApiService.getTimingData(symbol)
        .catch(this.context.setError)
        .then((data) => {
            this.setState({time_data: data});
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
          </div> : 
          <p className='red'>There was an error, try again</p>
        }
      
        <Graph
            time={this.state.time_data}
        />
        <NewsFeed
            newslist={[]}
        />
      </main>
    )
  }
}