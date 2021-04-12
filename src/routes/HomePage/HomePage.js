import React, { Component } from 'react'
import StockList from '../../components/StockList/StockList'
import ApiService from '../../services/api-service';
import CustomContext from '../../contexts/CustomContext';
import './HomePage.css'

export default class HomePage extends Component {
  static contextType = CustomContext
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  componentDidMount() {
    this.context.clearError();
    ApiService.getFollowings()
        .catch(this.context.setError)
        .then(this.context.setFollowings)
        .then(this.populateCompanyList)
  }

  populateCompanyList = companies => {
    this.context.clearCompanies();
    Promise.all(companies.map (c => {
        return ApiService.getCompanyData(c.symbol)
            .then(this.context.addCompany)
            .catch(this.context.setError)
    }));
  }

  render() {
    return (
      <main className='home-page-main'>
        {/* <Graph
        /> */}
        <StockList
        />
        {/* <NewsFeed
        /> */}
      </main>
    )
  }
}