import * as _ from "lodash";
import * as d3 from "d3";

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

function plotSphere() {

	var projection = d3.geo.orthographic()
		.scale(475)
		.translate([width / 2, height / 2])
		.clipAngle(90)
		.precision(0.1);

	var path = d3.geo.path()
		.projection(projection);

	var graticule = d3.geo.graticule();
	svg.append("defs").append("path")
		.datum({
			type: "Sphere"
		})
		.attr("id", "sphere")
		.attr("d", path);

	svg.append("use")
		.attr("class", "stroke")
		.attr("xlink:href", "#sphere");

	svg.append("use")
		.attr("class", "fill")
		.attr("xlink:href", "#sphere");

	svg.append("path")
		.datum(graticule)
		.attr("class", "graticule")
		.attr("d", path);
}

plotGrid();
plotSphere();


d3.select(self.frameElement).style("height", height + "px");
