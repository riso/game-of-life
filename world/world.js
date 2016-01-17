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

	var projection = d3.geo.equirectangular();

	var path = d3.geo.path()
		.projection(projection);

	const scale = 100;

	function x2lat(a) {
		return a / scale;
	}

	function y2lat(a) {
		return (2 * Math.atan(Math.exp(a * scale)) - Math.PI / 2);
	}

	const geojson = {
		type: "FeatureCollection",
		features: _.flatten(_.map(game.world, (col, idx) => {
			return _.map(col, (cell, index) => {
				return {
					type: "Feature",
					properties: {
						cell: cell
					},
					geometry: {
						type: "Polygon",
						coordinates: [
							[x2lat(idx * scale), y2lat(index * scale)],
							[x2lat((idx + 1) * scale), y2lat(index * scale)],
							[x2lat((idx + 1) * scale), y2lat((index + 1) * scale)],
							[x2lat(idx* scale), y2lat((index + 1) * scale)],
							[x2lat(idx* scale), y2lat(index * scale)]
						]
					}
				};
			});
		}))
	};

	svg.append("path")
		.datum({
			"type": "FeatureCollection",
			"features": [{
				"type": "Feature",
				"properties": {},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[-10, -10],
							[-10,
								10
							],
							[
								10,
								10
							],
							[
								10, -10
							],
							[-10, -10]
						]
					]
				}
			}, {
				"type": "Feature",
				"properties": {},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								9.84375,
								28.8831596093235
							],
							[
								10.01953125,
								10.01212955790814
							],
							[-10.01953125,
								10.01212955790814
							],
							[-10.1513671875,
								28.806173508854776
							],
							[
								9.84375,
								28.8831596093235
							]
						]
					]
				}
			}]
		})
		.attr("id", "point")
		.attr("d", path);
}

plotGrid();
plotSphere();


d3.select(self.frameElement).style("height", height + "px");
