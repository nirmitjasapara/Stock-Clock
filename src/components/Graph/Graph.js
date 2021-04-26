import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Graph.css'

export default class Graph extends Component {
    static defaultProps = {
        time: {}
    }

  render() {
    const time = this.props.time;
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