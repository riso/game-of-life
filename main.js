import {
	Engine
}
from "./lib/engine";
import * as _ from "lodash";

let game = new Engine(50);
game.set(5, 5);

var width = 960,
	height = 960;

var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);

svg.selectAll("rect")
	.data(_.flatten(_.map(game.world, (col, idx) => {
		return _.map(col, (cell, index) => {
				return {
					cell: cell,
					x: index,
          y: idx
				};
			});
	}))).enter().append("rect")
  .attr("height", 50)
  .attr("width", 50)
	.attr("class", (d) => d.cell ? "alive" : "dead")
	.attr("x", (d) => d.x * 50)
  .attr("y", (d) => d.y * 50);

d3.select(self.frameElement).style("height", height + "px");
