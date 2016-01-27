import * as _ from "lodash";
import * as d3 from "d3";

import React, { Component, PropTypes } from "react";

import {
  Engine,
}
from "../lib/engine";

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

d3.select(self.frameElement).style("height", `${height} px`);

export default class Grid extends Component {

  plotGrid() {
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

}
