import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NewsFeed.css'

export default class NewsFeed extends Component {
    static defaultProps = {
        newslist: []
    }

    renderList() {
        const newslist = this.props.newslist;
        return newslist.map(newsitem =>
            <NewsItem
                key={'news-' + newsitem.id}
                newsitem={newsitem}
            />
        )
      }

  render() {
    const newslist = this.props.newslist;
    console.log(company);
    return (
        <div
        >
            {this.renderList()}
        </div>
    )
  }
}