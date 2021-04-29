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
    time_data: []
  };

  componentDidMount() {
    const { symbol } = this.props.match.params;
    this.context.clearError();
    ApiService.getTimingData(symbol)
        .catch(this.context.setError)
        .then((data) => {
            this.setState({time_data: data});
        });
  }

  render() {
    return (
      <main className='company-page-main'>
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