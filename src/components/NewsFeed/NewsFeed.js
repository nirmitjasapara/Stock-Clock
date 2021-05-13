import React, { Component } from "react";
import NewsItem from "../../components/NewsItem/NewsItem";
import "./NewsFeed.css";

export default class NewsFeed extends Component {
  static defaultProps = {
    newslist: []
  };

  renderList() {
    const { newslist = [] } = this.props;
    if (!newslist.length)
      return <p className="empty-news">There is no news for this day.</p>;
    return newslist.map(newsitem => (
      <NewsItem key={"news-" + newsitem.id} newsitem={newsitem} />
    ));
  }

  render() {
    return (
      <section id="newsfeed">
        <h2>News Feed</h2>
        <ul className="news-list">{this.renderList()}</ul>
      </section>
    );
  }
}
