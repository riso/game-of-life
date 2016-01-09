import {
	Engine
}
from "./lib/engine";
import * as _ from "lodash";

let game = new Engine(10, [[5,5], [5,6], [5,7], [7,2]]);

var width = 960,
	height = 960;

var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);

function plot() {
  const rects = svg.selectAll("rect")
  	.data(_.flatten(_.map(game.world, (col, idx) => {
  		return _.map(col, (cell, index) => {
  				return {
  					cell: cell,
  					y: index,
            x: idx
  				};
  			});
  	})));

    rects.exit().remove();

    rects.enter().append("rect")
    .attr("height", 50)
    .attr("width", 50)
  	.attr("x", (d) => d.x * 50)
    .attr("y", (d) => d.y * 50);

    rects
  	.attr("class", (d) => d.cell ? "alive" : "dead");
}

plot();

window.setInterval(() => {
  game.nextGen();

  plot();

}, 2000);

d3.select(self.frameElement).style("height", height + "px");
