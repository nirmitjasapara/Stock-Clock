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