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
        to={'/company/' + company.symbol}
        type='button'
        className='stock-list-button'
        >
            <p>{company.symbol}</p>
        </Link>
    )
  }
}