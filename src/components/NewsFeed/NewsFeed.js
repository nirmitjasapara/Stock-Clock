import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NewsItem from '../../components/NewsItem/NewsItem'
import './NewsFeed.css'

export default class NewsFeed extends Component {
    static defaultProps = {
        newslist: []
    }

    renderList() {
        const {newslist = []} = this.props;
        return newslist.map(newsitem =>
            <NewsItem
                key={'news-' + newsitem.id}
                newsitem={newsitem}
            />
        )
      }

  render() {
    const newslist = this.props.newslist;
    return (
        <div
        >
            {this.renderList()}
        </div>
    )
  }
}