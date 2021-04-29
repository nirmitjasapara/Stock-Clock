import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NewsItem.css'

export default class NewsItem extends Component {
    static defaultProps = {
        newsitem: {}
    }

  render() {
    const newsitem = this.props.newsitem;
    console.log(newsitem);
    return (
        <div
        className='list-button'
        >
            <p>{newsitem["Title"]}</p>
            <p>{newsitem.story}</p>
        </div>
    )
  }
}