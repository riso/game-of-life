import * as _ from "lodash";
import * as d3 from "d3";

import React, { Component } from "react";
import ReactDOM from "react-dom";

import {
  Engine,
}
from "../lib/engine";

import "./world.css";

import ControlForm from "./controlForm";

const cells = [
  [5, 5],
  [5, 6],
  [5, 7],
  [7, 2],
];

let game = new Engine(10, cells);

const width = 960;
const height = 960;
const cellSize = 20;

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);


function plotGrid() {
  const rects = svg.selectAll("rect")
    .data(
      _.flatten(
        _.map(game.world, (col, idx) =>
          _.map(col, (c, index) => {
            const cell = {
              cell: c,
              y: index,
              x: idx,
            };
            return cell;
          })
        )
      )
    );

  rects.exit().remove();

  rects.enter().append("rect")
    .attr("height", cellSize)
    .attr("width", cellSize)
    .attr("x", (d) => d.x * cellSize)
    .attr("y", (d) => d.y * cellSize);

  rects
    .attr("class", (d) => d.cell ? "alive" : "dead");
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      size: 10,
    };
  }

  render() {
    return (
      <ControlForm size={this.state.size} onSizeChange={s => {
        console.log("size change",s);
        this.setState({
          size: s,
        });
      }} />
    );
  }
}

ReactDOM.render(<App/>, document.getElementById("app"));


d3.select(self.frameElement).style("height", `${height} px`);
