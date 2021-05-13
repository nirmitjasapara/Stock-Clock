import React, { Component } from "react";
import "./Pagination.css";

export default class Pagination extends Component {
  static defaultProps = {
    onPageChange: () => {},
    pageCount: 1,
    page: 1
  };

  renderList() {
    return [...Array(this.props.pageCount).keys()].map(i => (
      <li
        key={"page" + (i + 1)}
        className={
          "page-button" + (i + 1 === this.props.page ? " selected" : "")
        }
        onClick={() => this.props.onPageChange(i + 1)}
      >
        {i + 1}
      </li>
    ));
  }

  render() {
    return (
      <section id="pagination">
        <ul className="page-list">
          <li>Page: </li>
          {this.renderList()}
        </ul>
      </section>
    );
  }
}
