import React, { Component } from "react";
import Plot from "react-plotly.js";
import "./Graph.css";

export default class Graph extends Component {
  static defaultProps = {
    onGraphChange: () => {},
    title: "",
    x: [],
    y: []
  };

  render() {
    return (
      <Plot
        data={[
          {
            x: this.props.x,
            y: this.props.y,
            type: "scatters",
            mode: "lines",
            marker: { color: "red" }
          }
        ]}
        layout={{ width: 1000, height: 440, title: this.props.title }}
        onClick={data => {
          this.props.onGraphChange(data.points[0].x, data.points[0].x);
        }}
        onRelayout={data => {
          var start = "",
            end = "";
          start = data["xaxis.range[0]"].split(" ")[0];
          end = data["xaxis.range[1]"].split(" ")[0];
          this.props.onGraphChange(start, end);
        }}
      />
    );
  }
}
