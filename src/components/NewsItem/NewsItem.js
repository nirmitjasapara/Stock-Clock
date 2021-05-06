import React, { Component } from "react";
import "./NewsItem.css";

export default class NewsItem extends Component {
  static defaultProps = {
    newsitem: {}
  };
  dateTimeAdapter = timestamp => {
    var a = new Date(timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var y = a.getFullYear();
    var m = months[a.getMonth()];
    var d = a.getDate();
    return `${m} ${d},${y}`;
  };
  render() {
    const newsitem = this.props.newsitem;
    console.log(newsitem);
    return (
      <li className="news-item">
        <a className="news-link" href={newsitem.url} target="_blank">
          <img src={newsitem.image} alt="news-image" />
          <div className="col-2">
            <h3>{newsitem.headline}</h3>
            <p>{this.dateTimeAdapter(newsitem.datetime)}</p>
          </div>
        </a>
      </li>
    );
  }
}
