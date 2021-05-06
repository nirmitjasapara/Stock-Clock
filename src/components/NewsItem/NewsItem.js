import React, { Component } from "react";
import "./NewsItem.css";

export default class NewsItem extends Component {
  static defaultProps = {
    newsitem: {}
  };

  render() {
    const newsitem = this.props.newsitem;
    console.log(newsitem);
    return (
      <div className="news-item">
        <p>{newsitem.headline}</p>
        <p>{newsitem.url}</p>
      </div>
    );
  }
}
