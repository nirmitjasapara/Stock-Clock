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
  state = {
    data: [],
    layout: {}
  };
  recreateGraph = e => {
    const { x, y, title } = this.props;
    this.setState({
      data: [
        {
          x,
          y,
          type: "scatters",
          mode: "lines",
          marker: { color: "red" }
        }
      ],
      layout: { width: window.innerWidth - 40, height: 400, title }
    });
  };
  componentDidMount() {
    this.recreateGraph(null);
    window.addEventListener("resize", this.recreateGraph);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.recreateGraph);
  }
  componentDidUpdate() {
    if (!this.state.data[0]?.x?.length && this.props.x.length) {
      this.recreateGraph(null);
    }
  }
  render() {
    return (
      <section>
        {!this.state.data[0]?.x?.length ? (
          <p className="red">Graph Unavailable</p>
        ) : (
          <Plot
            className="graph"
            data={this.state.data}
            layout={this.state.layout}
            useResizeHandler={true}
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
        )}
      </section>
    );
  }
}
