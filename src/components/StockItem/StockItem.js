import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './StockItem.css'

export default class StockItem extends Component {
    static defaultProps = {
      company: {}
    }

  render() {
    const company = this.props.company;
    console.log(company);
    return (
        <Link
        to={'/company/' + company["Symbol"]}
        type='button'
        className='stock-list-button'
        >
            <p>{company["Symbol"]}</p>
            <p>{company["Name"]}</p>
            <p>{company["AnalystTargetPrice"]}</p>
        </Link>
    )
  }
}