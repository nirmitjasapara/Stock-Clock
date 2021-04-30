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
        .then(this.populateFollowingList)
  }

  populateFollowingList = companies => {
    this.context.clearFollowings();
    Promise.all(companies.map (c => {
        console.log(c);
        return ApiService.getCompanyData(c.symbol)
            .then(this.context.addFollowing)
            .then(() => console.log(this.context.followings))
            .catch(this.context.setError)
    }));
  }
  filterNotFetched (company) {
    return !this.context.followings.find(c => c.symbol == company.symbol);
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