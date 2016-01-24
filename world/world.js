import * as _ from "lodash";
import * as d3 from "d3";
import * as turf from "turf";

import {
	Engine
}
from "../lib/engine";

import "./world.css";

const game = new Engine(10, [
	[5, 5],
	[5, 6],
	[5, 7],
	[7, 2]
]);

const width = 960,
	height = 960,
	cellSize = 20;

const svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);

function plotGrid() {
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
		.attr("height", cellSize)
		.attr("width", cellSize)
		.attr("x", (d) => d.x * cellSize)
		.attr("y", (d) => d.y * cellSize);

	rects
		.attr("class", (d) => d.cell ? "alive" : "dead");
}

plotGrid();


d3.select(self.frameElement).style("height", height + "px");
