import React, { Component } from 'react'
import './Graph.css'

export default class Graph extends Component {
    static defaultProps = {
        time: {}
    }

  render() {
    const time = this.props.time;
    console.log(time);
    return (
        <div
        >
        </div>
    )
  }
}