import "../styles/main.scss";
import "../styles/partials/_variables.scss";
import "../styles/partials/_container.scss";
import "../styles/partials/_header.scss";
import "../styles/partials/_no-classes.scss";
import "../styles/partials/_onderwerp-buttons.scss";
import "../styles/partials/_visualisatie.scss";
import "../styles/partials/_tooltip.scss";
import "../styles/partials/_custom-radio.scss";
import "../styles/partials/_single-purpose-classes.scss";
import "../styles/partials/_cijfer-text.scss";

import {CountUp} from "countup.js";
import inView from "in-view";
import * as d3 from "d3";

const countUpOptions = {
	useEasing: true,
	useGrouping: false
};

// Counters
let counterAanleiding1 = new CountUp("counter-aanleiding-1", 0, countUpOptions);
let counterAanleiding2 = new CountUp("counter-aanleiding-2", 0, countUpOptions);
let counterAanleiding3 = new CountUp("counter-aanleiding-3", 0, countUpOptions);
let counterAanleiding4 = new CountUp("counter-aanleiding-4", 0, countUpOptions);

let counterControle1 = new CountUp("counter-controle-1", 0, countUpOptions);
let counterControle2 = new CountUp("counter-controle-2", 0, countUpOptions);

let counterErvaring1 = new CountUp("counter-ervaring-1", 0, countUpOptions);
let counterErvaring2 = new CountUp("counter-ervaring-2", 0, countUpOptions);

let counterBeleving1 = new CountUp("counter-beleving-1", 0, countUpOptions);
let counterBeleving2 = new CountUp("counter-beleving-2", 0, countUpOptions);
let counterBeleving3 = new CountUp("counter-beleving-3", 0, countUpOptions);
let counterBeleving4 = new CountUp("counter-beleving-4", 0, countUpOptions);
let counterBeleving5 = new CountUp("counter-beleving-5", 0, countUpOptions);
let counterBeleving6 = new CountUp("counter-beleving-6", 0, countUpOptions);

let counterVertrouwen1 = new CountUp("counter-vertrouwen-1", 0, countUpOptions);
let counterVertrouwen2 = new CountUp("counter-vertrouwen-2", 0, countUpOptions);
let counterVertrouwen3 = new CountUp("counter-vertrouwen-3", 0, countUpOptions);
let counterVertrouwen4 = new CountUp("counter-vertrouwen-4", 0, countUpOptions);
let counterVertrouwen5 = new CountUp("counter-vertrouwen-5", 0, countUpOptions);

const counterAanleiding1el = document.querySelector("#counter-aanleiding-1");
const counterAanleiding2el = document.querySelector("#counter-aanleiding-2");
const counterAanleiding3el = document.querySelector("#counter-aanleiding-3");
const counterAanleiding4el = document.querySelector("#counter-aanleiding-4");
const counterControle1el = document.querySelector("#counter-controle-1");
const counterControle2el = document.querySelector("#counter-controle-2");
const counterBeleving1el = document.querySelector("#counter-beleving-1");
const counterBeleving2el = document.querySelector("#counter-beleving-2");
const counterBeleving3el = document.querySelector("#counter-beleving-3");
const counterBeleving4el = document.querySelector("#counter-beleving-4");
const counterBeleving5el = document.querySelector("#counter-beleving-5");
const counterBeleving6el = document.querySelector("#counter-beleving-6");
const counterErvaring1el = document.querySelector("#counter-ervaring-1");
const counterErvaring2el = document.querySelector("#counter-ervaring-2");
const counterVertrouwen1el = document.querySelector("#counter-vertrouwen-1");
const counterVertrouwen2el = document.querySelector("#counter-vertrouwen-2");
const counterVertrouwen3el = document.querySelector("#counter-vertrouwen-3");
const counterVertrouwen4el = document.querySelector("#counter-vertrouwen-4");
const counterVertrouwen5el = document.querySelector("#counter-vertrouwen-5");

function responsivefy(svg) {
	// container will be the DOM element
	// that the svg is appended to
	// we then measure the container
	// and find its aspect ratio
	const container = d3.select(svg.node().parentNode),
		width = parseInt(svg.style("width"), 10),
		height = parseInt(svg.style("height"), 10),
		aspect = width / height;

	// set viewBox attribute to the initial size
	// control scaling with preserveAspectRatio
	// resize svg on inital page load
	svg.attr("viewBox", `0 0 ${width} ${height}`)
		.attr("preserveAspectRatio", "xMinYMid")
		.call(resize);

	// add a listener so the chart will be resized
	// when the window resizes
	// multiple listeners for the same event type
	// requires a namespace, i.e., 'click.foo'
	// api docs: https://goo.gl/F3ZCFr
	d3.select(window).on("resize." + container.attr("id"), resize);

	// this is the code that resizes the chart
	// it will be called on load
	// and in response to window resizes
	// gets the width of the container
	// and resizes the svg to fill it
	// while maintaining a consistent aspect ratio
	function resize() {
		const w = parseInt(container.style("width"));
		svg.attr("width", w);
		svg.attr("height", Math.round(w / aspect));
	}
}

function createHeatmap() {
	const margin = {top: 0, right: 10, bottom: 100, left: 25};
	const width = 500 - margin.left - margin.right;
	const height = 600 - margin.top - margin.bottom;
	// append the svg object to the body of the page
	const svg = d3
		.select("#vertrouwen-heatmap")
		.select(".svg-container")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.call(responsivefy)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	const div = d3
		.select("#vertrouwen-heatmap")
		.append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

	// Labels of row and columns
	const myGroups = [
		"Nederlanders zonder migratieachtergrond",
		"Nederlanders met niet-westerse migratieachtergrond"
	];
	const myVars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

	// Build X scales and axis:
	const x = d3
		.scaleBand()
		.range([0, width])
		.domain(myGroups)
		.padding(0.03);

	svg.append("g")
		.attr("transform", `translate(0, ${height - margin.bottom})`)
		.call(d3.axisBottom(x).tickSizeOuter(0))
		.call(g => g.selectAll(".tick text").attr("text-anchor", "left"))
		.call(g =>
			g
				.selectAll(".tick:first-of-type text")
				.attr("y", 30)
				.html(
					d =>
						'<tspan font-size="14" class="myText" text-align="left"><tspan font-weight="600">Nederlanders</tspan> zonder</tspan><tspan text-align="left" class="myText" font-size="14">migratieachtergrond</tspan>'
				)
				.selectAll(".myText")
				.attr("dy", "1.2em")
				.attr("x", "0")
				.select(".myText:last-of-type")
				.attr("x", 20)
		)
		.call(g =>
			g
				.selectAll(".tick:first-of-type")
				.append("rect")
				.attr("fill", "#fc3e46")
				.attr("y", "10")
				.attr("x", "-80")
				.attr("width", 160)
				.attr("height", 20)
				.attr("rx", 3)
		)
		.call(g =>
			g
				.selectAll(".tick:last-of-type text")
				.attr("y", 30)
				.html(
					'<tspan font-size="14" class="myText"><tspan font-weight="600">Nederlanders</tspan> met</tspan><tspan class="myText" font-size="14">niet-westerse</tspan><tspan font-size="14" class="myText"> migratieachtergrond</tspan>'
				)
				.selectAll(".myText")
				.attr("dy", "1.2em")
				.attr("x", "0")
		)
		.call(g =>
			g
				.selectAll(".tick:last-of-type")
				.append("rect")
				.attr("fill", "#0048ff")
				.attr("y", "10")
				.attr("x", "-80")
				.attr("width", 160)
				.attr("height", 20)
				.attr("rx", 3)
		);

	// Build X scales and axis:
	const y = d3
		.scaleBand()
		.range([height - margin.bottom, margin.top])
		.domain(myVars)
		.padding(0.1);
	svg.append("g")
		.call(d3.axisLeft(y).tickSizeOuter(0))
		.call(g => g.selectAll(".tick text").attr("font-size", 14));

	// Build color scale
	const myColor = d3
		.scaleLinear()
		.domain([0, 300])
		.range(["white", "black"], 300, 50);

	const data = [
		{
			group: "Nederlanders zonder migratie-achtergrond",
			variable: "1",
			value: 6,
			color: 25,
			range: "1-50"
		},
		{
			group: "Nederlanders zonder migratie-achtergrond",
			variable: "2",
			value: 2,
			color: 25,
			range: "1-50"
		},
		{
			group: "Nederlanders zonder migratie-achtergrond",
			variable: "3",
			value: 6,
			color: 25,
			range: "1-50"
		},
		{
			group: "Nederlanders zonder migratie-achtergrond",
			variable: "4",
			value: 12,
			color: 25,
			range: "1-50"
		},
		{
			group: "Nederlanders zonder migratie-achtergrond",
			variable: "5",
			value: 29,
			color: 25,
			range: "1-50"
		},
		{
			group: "Nederlanders zonder migratie-achtergrond",
			variable: "6",
			value: 91,
			color: 75,
			range: "51-100"
		},
		{
			group: "Nederlanders zonder migratie-achtergrond",
			variable: "7",
			value: 228,
			color: 225,
			range: "201-250"
		},
		{
			group: "Nederlanders zonder migratie-achtergrond",
			variable: "8",
			value: 220,
			color: 225,
			range: "201-250"
		},
		{
			group: "Nederlanders zonder migratie-achtergrond",
			variable: "9",
			value: 71,
			color: 75,
			range: "51-100"
		},
		{
			group: "Nederlanders zonder migratie-achtergrond",
			variable: "10",
			value: 22,
			color: 25,
			range: "1-50"
		},
		{
			group: "Nederlanders met niet-westerse migratieachtergrond",
			variable: "1",
			value: 34,
			color: 25,
			range: "1-50"
		},
		{
			group: "Nederlanders met niet-westerse migratieachtergrond",
			variable: "2",
			value: 14,
			color: 25,
			range: "1-50"
		},
		{
			group: "Nederlanders met niet-westerse migratieachtergrond",
			variable: "3",
			value: 31,
			color: 25,
			range: "1-50"
		},
		{
			group: "Nederlanders met niet-westerse migratieachtergrond",
			variable: "4",
			value: 55,
			color: 75,
			range: "51-100"
		},
		{
			group: "Nederlanders met niet-westerse migratieachtergrond",
			variable: "5",
			value: 100,
			color: 75,
			range: "51-100"
		},
		{
			group: "Nederlanders met niet-westerse migratieachtergrond",
			variable: "6",
			value: 194,
			color: 175,
			range: "151-200"
		},
		{
			group: "Nederlanders met niet-westerse migratieachtergrond",
			variable: "7",
			value: 263,
			color: 275,
			range: "251-300"
		},
		{
			group: "Nederlanders met niet-westerse migratieachtergrond",
			variable: "8",
			value: 190,
			color: 175,
			range: "151-200"
		},
		{
			group: "Nederlanders met niet-westerse migratieachtergrond",
			variable: "9",
			value: 56,
			color: 75,
			range: "51-100"
		},
		{
			group: "Nederlanders met niet-westerse migratieachtergrond",
			variable: "10",
			value: 19,
			color: 25,
			range: "1-50"
		}
	];

	const svgEnter = svg
		.selectAll("rect")
		.data(data, function(d) {
			return d.group + ":" + d.variable;
		})
		.enter();

	svgEnter
		.append("rect")
		.attr("x", function(d) {
			if (d.group === "Nederlanders zonder migratie-achtergrond") {
				return 5;
			} else {
				return x(d.group) - 5;
			}
		})
		.attr("y", function(d) {
			return y(d.variable);
		})
		.attr("width", function(d) {
			if (d.value === 0) {
				return x.bandwidth() - 1;
			} else {
				return x.bandwidth() - 5;
			}
		})
		.attr("height", function(d) {
			if (d.value === 0) {
				return y.bandwidth() - 1;
			} else {
				return y.bandwidth();
			}
		})
		.style("fill", function(d) {
			return myColor(d.color);
		})
		.style("stroke", function(d) {
			if (d.value === 0) {
				return "#fff33d";
			}
		})
		.style("stroke-width", 1)
		.style("padding", "3px")
		.on("mouseover", function(d) {
			div.transition()
				.duration(200)
				.style("opacity", 0.9);
			div.html(
				"Aantal mensen: " + d.value + "</br>" + "Categorie: " + d.range
			)
				.style("left", d3.event.pageX + "px")
				.style("top", d3.event.pageY - 28 + "px");
		})
		.on("mouseout", function(d) {
			div.transition()
				.duration(500)
				.style("opacity", 0);
		});

	const legendData = [
		{
			key: "0",
			color: 0
		},
		{
			key: "1-50",
			color: 25
		},
		{
			key: "51-100",
			color: 75
		},
		{
			key: "101-150",
			color: 125
		},
		{
			key: "151-200",
			color: 175
		},
		{
			key: "201-250",
			color: 225
		},
		{
			key: "251-300",
			color: 275
		}
	];

	const legend = d3
		.select("#vertrouwen-heatmap")
		.select(".legend")
		.selectAll(".legend-item")
		.data(legendData);

	const legendEnter = legend
		.enter()
		.append("div")
		.attr("class", "legend-item");

	legendEnter
		.append("div")
		.attr("class", "legend-color")
		.style("background-color", d => myColor(d.color))
		.style("border", d => (d.color === 0 ? "solid 1px #fff33d" : "none"));

	legendEnter.append("p").text(d => d.key);
}

function createStackedBarchartBeleefd() {
	let data = [
		{
			categorie: "benaderd-door-politie",
			afkomst: "Nederlands",
			eens: 69,
			oneens: 16,
			neutraal: 15,
			total: 100
		},
		{
			categorie: "benaderd-door-politie",
			afkomst: "Niet westers",
			eens: 49,
			oneens: 32,
			neutraal: 19,
			total: 100
		},
		{
			categorie: "zelf-politie-benaderd",
			afkomst: "Nederlands",
			eens: 85,
			oneens: 8,
			neutraal: 7,
			total: 100
		},
		{
			categorie: "zelf-politie-benaderd",
			afkomst: "Niet westers",
			eens: 79,
			oneens: 13,
			neutraal: 8,
			total: 100
		}
	];

	var keys = ["eens", "neutraal", "oneens"];

	const margin = {top: 5, right: 10, bottom: 100, left: 15};
	const width = 500 - margin.left - margin.right;
	const height = 600 - margin.top - margin.bottom;
	// append the svg object to the body of the page
	const svg = d3
		.select("#beleefd")
		.select(".svg-container")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.call(responsivefy)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var x = d3
		.scaleBand()
		.range([margin.left, width - margin.right])
		.padding(0.1);

	var y = d3.scaleLinear().rangeRound([height - margin.bottom, margin.top]);

	var xAxis = svg
		.append("g")
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.attr("class", "x-axis");

	var yAxis = svg
		.append("g")
		.attr("transform", `translate(${margin.left},0)`)
		.attr("class", "y-axis");

	var z = d3
		.scaleOrdinal()
		.range(["black", "gray", "darkgray"])
		.domain(keys);

	const options = document.querySelectorAll("#beleefd .options input");
	let checked;

	function clickRadio() {
		data = [
			{
				categorie: "benaderd-door-politie",
				afkomst: "Nederlands",
				eens: 69,
				oneens: 16,
				neutraal: 15,
				total: 100
			},
			{
				categorie: "benaderd-door-politie",
				afkomst: "Niet westers",
				eens: 49,
				oneens: 32,
				neutraal: 19,
				total: 100
			},
			{
				categorie: "zelf-politie-benaderd",
				afkomst: "Nederlands",
				eens: 85,
				oneens: 8,
				neutraal: 7,
				total: 100
			},
			{
				categorie: "zelf-politie-benaderd",
				afkomst: "Niet westers",
				eens: 79,
				oneens: 13,
				neutraal: 8,
				total: 100
			}
		];
		options.forEach(d => {
			if (d.checked === true) {
				checked = d;
			}
		});

		if(checked.id === "benaderd-door-politie") {
			counterBeleving4.update(408)
			counterBeleving5.update(408)
			counterBeleving6.update(408)
		} else if (checked.id === "zelf-politie-benaderd") {
			counterBeleving4.update(217)
			counterBeleving5.update(217)
			counterBeleving6.update(217)
		}

		return update(d3.select(checked).property("value"), 0);
	}
	clickRadio();

	document
		.querySelectorAll("#beleefd .options input")
		.forEach(d => d.addEventListener("click", clickRadio));

	function update(input, speed) {
		data = data.filter(d => d.categorie === input);

		y.domain([0, d3.max(data, d => d3.sum(keys, k => +d[k]))]).nice();

		svg.selectAll(".y-axis").call(d3.axisLeft(y).ticks(null, "s"));

		x.domain(data.map(d => d.afkomst));

		svg.selectAll(".x-axis")
			.call(d3.axisBottom(x).tickSizeOuter(0))
			.call(g =>
				g
					.select(".tick:first-of-type text")
					.attr("y", 30)
					.html(
						'<tspan font-size="14" class="myText" text-align="left"><tspan font-weight="600">Nederlanders</tspan> zonder</tspan><tspan text-align="left" class="myText" font-size="14">migratieachtergrond</tspan>'
					)
					.selectAll(".myText")
					.attr("dy", "1.2em")
					.attr("x", "0")
					.select(".myText:last-of-type")
					.attr("x", 20)
			)
			.call(g =>
				g
					.selectAll(".tick:first-of-type")
					.append("rect")
					.attr("fill", "#fc3e46")
					.attr("y", "10")
					.attr("x", "-80")
					.attr("width", 160)
					.attr("height", 20)
					.attr("rx", 3)
			)
			.call(g =>
				g
					.selectAll(".tick:last-of-type text")
					.attr("y", 30)
					.html(
						'<tspan font-size="14" class="myText"><tspan font-weight="600">Nederlanders</tspan> met</tspan><tspan class="myText" font-size="14">niet-westerse</tspan><tspan font-size="14" class="myText"> migratieachtergrond</tspan>'
					)
					.selectAll(".myText")
					.attr("dy", "1.2em")
					.attr("x", "0")
			)
			.call(g =>
				g
					.selectAll(".tick:last-of-type")
					.append("rect")
					.attr("fill", "#0048ff")
					.attr("y", "10")
					.attr("x", "-80")
					.attr("width", 160)
					.attr("height", 20)
					.attr("rx", 3)
			);

		var group = svg
			.selectAll("g.layer")
			.data(d3.stack().keys(keys)(data), d => d.key);

		group.exit().remove();

		group
			.enter()
			.append("g")
			.classed("layer", true)
			.attr("fill", d => z(d.key));

		group.attr("fill", d => z(d.key));

		var bars = svg
			.selectAll("g.layer")
			.selectAll("rect")
			.data(d => d, e => e.data.afkomst);

		bars.exit().remove();

		const barsEnter = bars
			.enter()
			.append("g")
			.attr("class", "chart");

		barsEnter
			.append("rect")
			.attr("width", x.bandwidth())
			.attr("x", d => x(d.data.afkomst))
			.attr("y", d => y(d[1]))
			.attr("height", d => y(d[0]) - y(d[1]));

		const text = svg
			.selectAll("g.layer")
			.selectAll("text")
			.data(d => d, e => e.data.afkomst);

		const textEnter = text
			.enter()
			.append("text")
			.attr("text-anchor", "middle")
			.attr("font-size", "20px")
			.attr("font-family", "Roboto")
			.style("fill", "#fff33d")
			.attr("x", d => x(d.data.afkomst) + x.bandwidth() / 2)
			.attr("y", d => y(d[1]) + (y(d[0]) - y(d[1])) / 2 + 10)
			.text(d => {
				if (d[0] === 0) {
					return d[1] + "%";
				} else {
					return d[1] - d[0] + "%";
				}
			});

		text.attr("text-anchor", "middle")
			.attr("font-size", "20px")
			.attr("font-family", "Roboto")
			.style("fill", "#fff33d")
			.transition()
			.attr("x", d => x(d.data.afkomst) + x.bandwidth() / 2)
			.attr("y", d => y(d[1]) + (y(d[0]) - y(d[1])) / 2 + 10)
			.text(d => {
				if (d[0] === 0) {
					return d[1] + "%";
				} else {
					return d[1] - d[0] + "%";
				}
			});

		bars.attr("width", x.bandwidth())
			.transition()
			.attr("x", d => x(d.data.afkomst))
			.attr("y", d => y(d[1]))
			.attr("height", d => y(d[0]) - y(d[1]));

		const legendData = [
			{
				key: "(Zeer) Onterecht",
				color: "black"
			},
			{
				key: "Neutraal",
				color: "grey"
			},
			{
				key: "(Zeer) terecht",
				color: "darkgrey"
			}
		];

		const legend = d3
			.select("#beleefd")
			.select(".legend")
			.selectAll(".legend-item")
			.data(legendData);

		legend.exit().remove();

		const legendEnter = legend
			.enter()
			.append("div")
			.attr("class", "legend-item");

		legendEnter
			.append("div")
			.attr("class", "legend-color")
			.style("background-color", d => d.color);

		legendEnter.append("p").text(d => d.key);
	}
}

function createStackedBarchartLuisterdGoed() {
	let data = [
		{
			categorie: "benaderd-door-politie",
			afkomst: "Nederlands",
			eens: 55,
			oneens: 22,
			neutraal: 25,
			total: 100
		},
		{
			categorie: "benaderd-door-politie",
			afkomst: "Niet westers",
			eens: 35,
			oneens: 37,
			neutraal: 28,
			total: 100
		},
		{
			categorie: "zelf-politie-benaderd",
			afkomst: "Nederlands",
			eens: 86,
			oneens: 6,
			neutraal: 8,
			total: 100
		},
		{
			categorie: "zelf-politie-benaderd",
			afkomst: "Niet westers",
			eens: 72,
			oneens: 16,
			neutraal: 12,
			total: 100
		}
	];

	var keys = ["eens", "neutraal", "oneens"];

	const margin = {top: 5, right: 10, bottom: 100, left: 15};
	const width = 500 - margin.left - margin.right;
	const height = 600 - margin.top - margin.bottom;
	// append the svg object to the body of the page
	const svg = d3
		.select("#luistert-goed")
		.select(".svg-container")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.call(responsivefy)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var x = d3
		.scaleBand()
		.range([margin.left, width - margin.right])
		.padding(0.1);

	var y = d3.scaleLinear().rangeRound([height - margin.bottom, margin.top]);

	var xAxis = svg
		.append("g")
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.attr("class", "x-axis");

	var yAxis = svg
		.append("g")
		.attr("transform", `translate(${margin.left},0)`)
		.attr("class", "y-axis");

	var z = d3
		.scaleOrdinal()
		.range(["black", "gray", "darkgray"])
		.domain(keys);

	const options = document.querySelectorAll("#luistert-goed .options input");
	let checked;

	function clickRadio() {
		data = [
			{
				categorie: "benaderd-door-politie",
				afkomst: "Nederlands",
				eens: 55,
				oneens: 22,
				neutraal: 25,
				total: 100
			},
			{
				categorie: "benaderd-door-politie",
				afkomst: "Niet westers",
				eens: 35,
				oneens: 37,
				neutraal: 28,
				total: 100
			},
			{
				categorie: "zelf-politie-benaderd",
				afkomst: "Nederlands",
				eens: 86,
				oneens: 6,
				neutraal: 8,
				total: 100
			},
			{
				categorie: "zelf-politie-benaderd",
				afkomst: "Niet westers",
				eens: 72,
				oneens: 16,
				neutraal: 12,
				total: 100
			}
		];
		options.forEach(d => {
			if (d.checked === true) {
				checked = d;
			}
		});

		if(checked.id === "benaderd-door-politie-1") {
			counterBeleving5.update(400)
		} else if (checked.id === "zelf-politie-benaderd-1") {
			counterBeleving5.update(221)
		}

		return update(d3.select(checked).property("value"), 0);
	}
	clickRadio();

	document
		.querySelectorAll("#luistert-goed .options input")
		.forEach(d => d.addEventListener("click", clickRadio));

	function update(input, speed) {
		data = data.filter(d => d.categorie === input);

		y.domain([0, d3.max(data, d => d3.sum(keys, k => +d[k]))]).nice();

		svg.selectAll(".y-axis").call(d3.axisLeft(y).ticks(null, "s"));

		x.domain(data.map(d => d.afkomst));

		svg.selectAll(".x-axis")
			.call(d3.axisBottom(x).tickSizeOuter(0))
			.call(g =>
				g
					.select(".tick:first-of-type text")
					.attr("y", 30)
					.html(
						'<tspan font-size="14" class="myText" text-align="left"><tspan font-weight="600">Nederlanders</tspan> zonder</tspan><tspan text-align="left" class="myText" font-size="14">migratieachtergrond</tspan>'
					)
					.selectAll(".myText")
					.attr("dy", "1.2em")
					.attr("x", "0")
					.select(".myText:last-of-type")
					.attr("x", 20)
			)
			.call(g =>
				g
					.selectAll(".tick:first-of-type")
					.append("rect")
					.attr("fill", "#fc3e46")
					.attr("y", "10")
					.attr("x", "-80")
					.attr("width", 160)
					.attr("height", 20)
					.attr("rx", 3)
			)
			.call(g =>
				g
					.selectAll(".tick:last-of-type text")
					.attr("y", 30)
					.html(
						'<tspan font-size="14" class="myText"><tspan font-weight="600">Nederlanders</tspan> met</tspan><tspan class="myText" font-size="14">niet-westerse</tspan><tspan font-size="14" class="myText"> migratieachtergrond</tspan>'
					)
					.selectAll(".myText")
					.attr("dy", "1.2em")
					.attr("x", "0")
			)
			.call(g =>
				g
					.selectAll(".tick:last-of-type")
					.append("rect")
					.attr("fill", "#0048ff")
					.attr("y", "10")
					.attr("x", "-80")
					.attr("width", 160)
					.attr("height", 20)
					.attr("rx", 3)
			);

		var group = svg
			.selectAll("g.layer")
			.data(d3.stack().keys(keys)(data), d => d.key);

		group.exit().remove();

		group
			.enter()
			.append("g")
			.classed("layer", true)
			.attr("fill", d => z(d.key));

		group.attr("fill", d => z(d.key));

		var bars = svg
			.selectAll("g.layer")
			.selectAll("rect")
			.data(d => d, e => e.data.afkomst);

		bars.exit().remove();

		const barsEnter = bars
			.enter()
			.append("g")
			.attr("class", "chart");

		barsEnter
			.append("rect")
			.attr("width", x.bandwidth())
			.attr("x", d => x(d.data.afkomst))
			.attr("y", d => y(d[1]))
			.attr("height", d => y(d[0]) - y(d[1]));

		const text = svg
			.selectAll("g.layer")
			.selectAll("text")
			.data(d => d, e => e.data.afkomst);

		const textEnter = text
			.enter()
			.append("text")
			.attr("text-anchor", "middle")
			.attr("font-size", "20px")
			.attr("font-family", "Roboto")
			.style("fill", "#fff33d")
			.attr("x", d => x(d.data.afkomst) + x.bandwidth() / 2)
			.attr("y", d => y(d[1]) + (y(d[0]) - y(d[1])) / 2 + 10)
			.text(d => {
				if (d[0] === 0) {
					return d[1] + "%";
				} else {
					return d[1] - d[0] + "%";
				}
			});

		text.attr("text-anchor", "middle")
			.attr("font-size", "20px")
			.attr("font-family", "Roboto")
			.style("fill", "#fff33d")
			.transition()
			.attr("x", d => x(d.data.afkomst) + x.bandwidth() / 2)
			.attr("y", d => y(d[1]) + (y(d[0]) - y(d[1])) / 2 + 10)
			.text(d => {
				if (d[0] === 0) {
					return d[1] + "%";
				} else {
					return d[1] - d[0] + "%";
				}
			});

		bars.attr("width", x.bandwidth())
			.transition()
			.attr("x", d => x(d.data.afkomst))
			.attr("y", d => y(d[1]))
			.attr("height", d => y(d[0]) - y(d[1]));

		const legendData = [
			{
				key: "(Zeer) Onterecht",
				color: "black"
			},
			{
				key: "Neutraal",
				color: "grey"
			},
			{
				key: "(Zeer) terecht",
				color: "darkgrey"
			}
		];

		const legend = d3
			.select("#luistert-goed")
			.select(".legend")
			.selectAll(".legend-item")
			.data(legendData);

		legend.exit().remove();

		const legendEnter = legend
			.enter()
			.append("div")
			.attr("class", "legend-item");

		legendEnter
			.append("div")
			.attr("class", "legend-color")
			.style("background-color", d => d.color);

		legendEnter.append("p").text(d => d.key);
	}
}

function createStackedBarchartRechtvaardig() {
	let data = [
		{
			categorie: "benaderd-door-politie",
			afkomst: "Nederlands",
			eens: 70,
			oneens: 12,
			neutraal: 18,
			total: 100
		},
		{
			categorie: "benaderd-door-politie",
			afkomst: "Niet westers",
			eens: 44,
			oneens: 33,
			neutraal: 23,
			total: 100
		},
		{
			categorie: "zelf-politie-benaderd",
			afkomst: "Nederlands",
			eens: 72,
			oneens: 10,
			neutraal: 18,
			total: 100
		},
		{
			categorie: "zelf-politie-benaderd",
			afkomst: "Niet westers",
			eens: 65,
			oneens: 14,
			neutraal: 21,
			total: 100
		}
	];

	var keys = ["eens", "neutraal", "oneens"];

	const margin = {top: 5, right: 10, bottom: 100, left: 15};
	const width = 500 - margin.left - margin.right;
	const height = 600 - margin.top - margin.bottom;
	// append the svg object to the body of the page
	const svg = d3
		.select("#rechtvaardig")
		.select(".svg-container")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.call(responsivefy)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var x = d3
		.scaleBand()
		.range([margin.left, width - margin.right])
		.padding(0.1);

	var y = d3.scaleLinear().rangeRound([height - margin.bottom, margin.top]);

	var xAxis = svg
		.append("g")
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.attr("class", "x-axis");

	var yAxis = svg
		.append("g")
		.attr("transform", `translate(${margin.left},0)`)
		.attr("class", "y-axis");

	var z = d3
		.scaleOrdinal()
		.range(["black", "gray", "darkgray"])
		.domain(keys);

	const options = document.querySelectorAll("#rechtvaardig .options input");
	let checked;

	function clickRadio() {
		data = [
			{
				categorie: "benaderd-door-politie",
				afkomst: "Nederlands",
				eens: 70,
				oneens: 12,
				neutraal: 18,
				total: 100
			},
			{
				categorie: "benaderd-door-politie",
				afkomst: "Niet westers",
				eens: 44,
				oneens: 33,
				neutraal: 23,
				total: 100
			},
			{
				categorie: "zelf-politie-benaderd",
				afkomst: "Nederlands",
				eens: 72,
				oneens: 10,
				neutraal: 18,
				total: 100
			},
			{
				categorie: "zelf-politie-benaderd",
				afkomst: "Niet westers",
				eens: 65,
				oneens: 14,
				neutraal: 21,
				total: 100
			}
		];
		options.forEach(d => {
			if (d.checked === true) {
				checked = d;
			}
		});

		if(checked.id === "benaderd-door-politie-2") {
			counterBeleving6.update(401)
		} else if (checked.id === "zelf-politie-benaderd-2") {
			counterBeleving6.update(215)
		}

		return update(d3.select(checked).property("value"), 0);
	}
	clickRadio();

	document
		.querySelectorAll("#rechtvaardig .options input")
		.forEach(d => d.addEventListener("click", clickRadio));

	function update(input, speed) {
		data = data.filter(d => d.categorie === input);

		y.domain([0, d3.max(data, d => d3.sum(keys, k => +d[k]))]).nice();

		svg.selectAll(".y-axis").call(d3.axisLeft(y).ticks(null, "s"));

		x.domain(data.map(d => d.afkomst));

		svg.selectAll(".x-axis")
			.call(d3.axisBottom(x).tickSizeOuter(0))
			.call(g =>
				g
					.select(".tick:first-of-type text")
					.attr("y", 30)
					.html(
						'<tspan font-size="14" class="myText" text-align="left"><tspan font-weight="600">Nederlanders</tspan> zonder</tspan><tspan text-align="left" class="myText" font-size="14">migratieachtergrond</tspan>'
					)
					.selectAll(".myText")
					.attr("dy", "1.2em")
					.attr("x", "0")
					.select(".myText:last-of-type")
					.attr("x", 20)
			)
			.call(g =>
				g
					.selectAll(".tick:first-of-type")
					.append("rect")
					.attr("fill", "#fc3e46")
					.attr("y", "10")
					.attr("x", "-80")
					.attr("width", 160)
					.attr("height", 20)
					.attr("rx", 3)
			)
			.call(g =>
				g
					.selectAll(".tick:last-of-type text")
					.attr("y", 30)
					.html(
						'<tspan font-size="14" class="myText"><tspan font-weight="600">Nederlanders</tspan> met</tspan><tspan class="myText" font-size="14">niet-westerse</tspan><tspan font-size="14" class="myText"> migratieachtergrond</tspan>'
					)
					.selectAll(".myText")
					.attr("dy", "1.2em")
					.attr("x", "0")
			)
			.call(g =>
				g
					.selectAll(".tick:last-of-type")
					.append("rect")
					.attr("fill", "#0048ff")
					.attr("y", "10")
					.attr("x", "-80")
					.attr("width", 160)
					.attr("height", 20)
					.attr("rx", 3)
			);

		var group = svg
			.selectAll("g.layer")
			.data(d3.stack().keys(keys)(data), d => d.key);

		group.exit().remove();

		group
			.enter()
			.append("g")
			.classed("layer", true)
			.attr("fill", d => z(d.key));

		group.attr("fill", d => z(d.key));

		var bars = svg
			.selectAll("g.layer")
			.selectAll("rect")
			.data(d => d, e => e.data.afkomst);

		bars.exit().remove();

		const barsEnter = bars
			.enter()
			.append("g")
			.attr("class", "chart");

		barsEnter
			.append("rect")
			.attr("width", x.bandwidth())
			.attr("x", d => x(d.data.afkomst))
			.attr("y", d => y(d[1]))
			.attr("height", d => y(d[0]) - y(d[1]));

		const text = svg
			.selectAll("g.layer")
			.selectAll("text")
			.data(d => d, e => e.data.afkomst);

		const textEnter = text
			.enter()
			.append("text")
			.attr("text-anchor", "middle")
			.attr("font-size", "20px")
			.attr("font-family", "Roboto")
			.style("fill", "#fff33d")
			.attr("x", d => x(d.data.afkomst) + x.bandwidth() / 2)
			.attr("y", d => y(d[1]) + (y(d[0]) - y(d[1])) / 2 + 10)
			.text(d => {
				if (d[0] === 0) {
					return d[1] + "%";
				} else {
					return d[1] - d[0] + "%";
				}
			});

		text.attr("text-anchor", "middle")
			.attr("font-size", "20px")
			.attr("font-family", "Roboto")
			.style("fill", "#fff33d")
			.transition()
			.attr("x", d => x(d.data.afkomst) + x.bandwidth() / 2)
			.attr("y", d => y(d[1]) + (y(d[0]) - y(d[1])) / 2 + 10)
			.text(d => {
				if (d[0] === 0) {
					return d[1] + "%";
				} else {
					return d[1] - d[0] + "%";
				}
			});

		bars.attr("width", x.bandwidth())
			.transition()
			.attr("x", d => x(d.data.afkomst))
			.attr("y", d => y(d[1]))
			.attr("height", d => y(d[0]) - y(d[1]));

		const legendData = [
			{
				key: "(Zeer) Onterecht",
				color: "black"
			},
			{
				key: "Neutraal",
				color: "grey"
			},
			{
				key: "(Zeer) terecht",
				color: "darkgrey"
			}
		];

		const legend = d3
			.select("#rechtvaardig")
			.select(".legend")
			.selectAll(".legend-item")
			.data(legendData);

		legend.exit().remove();

		const legendEnter = legend
			.enter()
			.append("div")
			.attr("class", "legend-item");

		legendEnter
			.append("div")
			.attr("class", "legend-color")
			.style("background-color", d => d.color);

		legendEnter.append("p").text(d => d.key);
	}
}

const onderwerpBtns = document.querySelectorAll(".onderwerp-button");

function executeCounterAanleiding(amount) {
	counterAanleiding1.update(amount);
	counterAanleiding2.update(amount);
	counterAanleiding3.update(amount);
	counterAanleiding4.update(amount);
}

function executeCounterControle(amount) {
	counterControle1.update(amount);
	counterControle2.update(amount);
}

function executeCounterErvaring(amount) {
	counterErvaring1.update(amount);
	counterErvaring2.update(amount);
}

function executeCounterBeleving(amount) {
	counterBeleving1.update(amount);
	counterBeleving2.update(amount);
	counterBeleving3.update(amount);
	counterBeleving4.update(amount);
	counterBeleving5.update(amount);
	counterBeleving6.update(amount);
}

function executeCounterVertrouwen(amount) {
	counterVertrouwen1.update(amount);
	counterVertrouwen2.update(amount);
	counterVertrouwen3.update(amount);
	counterVertrouwen4.update(amount);
	counterVertrouwen5.update(amount);
}

function changeTopic() {
	let scrollPos = 0;
	const currentTopic = document.querySelector("#" + this.value)

	d3.selectAll(".topic-container").classed("active", false);

	d3.selectAll(".onderwerp-buttons-container").classed("footer", false);

	currentTopic.classList.add("active")
	currentTopic.scrollIntoView({block: "start", behavior: "smooth"});

	d3.selectAll("svg").remove();

	if(this.value === "aanleiding") {
		inView.offset({
			top: 50,
			bottom: 50
		})
		inView(".counter").on("enter", () => {
			if((document.body.getBoundingClientRect()).top > scrollPos) {
				if(inView.is(counterAanleiding1el)) {
					executeCounterAanleiding(632);
				} else if(inView.is(counterAanleiding2el)) {
					executeCounterAanleiding(370);
				} else if(inView.is(counterAanleiding3el)) {
					executeCounterAanleiding(632);
				} else if(inView.is(counterAanleiding4el)) {
					executeCounterAanleiding(220);
				}
			} else {
				if(inView.is(counterAanleiding4el)) {
					executeCounterAanleiding(220);
				} else if(inView.is(counterAanleiding3el)) {
					executeCounterAanleiding(632);
				} else if(inView.is(counterAanleiding2el)) {
					executeCounterAanleiding(370);
				} else if(inView.is(counterAanleiding1el)) {
					executeCounterAanleiding(632);
				}
			}
			scrollPos = (document.body.getBoundingClientRect()).top;
		})
	} else if(this.value === "controle") {
		inView.offset({
			top: 50,
			bottom: 50
		})
		inView(".counter").on("enter", () =>{
			if(inView.is(counterControle1el) || inView.is(counterControle2el)) {
				executeCounterControle(376);
			}
		})
	} else if(this.value === "beleving") {
		createStackedBarchartBeleefd();
		createStackedBarchartLuisterdGoed();
		createStackedBarchartRechtvaardig();

		inView.offset({
			top: 50,
			bottom: 50
		})
		inView(".counter").on("enter", () =>{
			if((document.body.getBoundingClientRect()).top > scrollPos) {
				if(inView.is(counterBeleving1el)) {
					executeCounterBeleving(625);
				} else if(inView.is(counterBeleving2el)) {
					executeCounterBeleving(621);
				} else if(inView.is(counterBeleving3el)) {
					executeCounterBeleving(616);
				} else if(inView.is(counterBeleving4el)) {
					executeCounterBeleving(408);
				} else if(inView.is(counterBeleving5el)) {
					executeCounterBeleving(400);
				} else if(inView.is(counterBeleving6el)) {
					executeCounterBeleving(401);
				}
			} else {
				if(inView.is(counterBeleving6el)) {
					executeCounterBeleving(401);
				} else if(inView.is(counterBeleving5el)) {
					executeCounterBeleving(400);
				} else if(inView.is(counterBeleving4el)) {
					executeCounterBeleving(408);
				} else if(inView.is(counterBeleving3el)) {
					executeCounterBeleving(616);
				} else if(inView.is(counterBeleving2el)) {
					executeCounterBeleving(621);
				} else if(inView.is(counterBeleving1el)) {
					executeCounterBeleving(625);
				}
			}
			scrollPos = (document.body.getBoundingClientRect()).top;
		})
	} else if(this.value === "ervaring") {
		inView.offset({
			top: 50,
			bottom: 50
		})
		inView(".counter").on("enter", () =>{
			if((document.body.getBoundingClientRect()).top > scrollPos) {
				if(inView.is(counterErvaring1el)) {
					executeCounterErvaring(399);
				} else if(inView.is(counterErvaring2el)) {
					executeCounterErvaring(408);
				}
			} else {
				if(inView.is(counterErvaring2el)) {
					executeCounterErvaring(408);
				} else if(inView.is(counterErvaring1el)) {
					executeCounterErvaring(399);
				}	
			}
			scrollPos = (document.body.getBoundingClientRect()).top;	
		})
	} else if(this.value === "vertrouwen") {
		createHeatmap();
		inView.offset({
			top: 50,
			bottom: 50
		})
		inView(".counter").on("enter", () => {
			if((document.body.getBoundingClientRect()).top > scrollPos) {
				if(inView.is(counterVertrouwen1el)) {
					executeCounterVertrouwen(1643)
				} else if(inView.is(counterVertrouwen2el)) {
					executeCounterVertrouwen(1643)
				} else if(inView.is(counterVertrouwen3el)) {
					executeCounterVertrouwen(1643)
				} else if(inView.is(counterVertrouwen4el)) {
					executeCounterVertrouwen(1654)
				} else if(inView.is(counterVertrouwen5el)) {
					executeCounterVertrouwen(1643)
				}
			} else {
				if(inView.is(counterVertrouwen5el)) {
					executeCounterVertrouwen(1643)
				} else if(inView.is(counterVertrouwen4el)) {
					executeCounterVertrouwen(1654)
				} else if(inView.is(counterVertrouwen3el)) {
					executeCounterVertrouwen(1643)
				} else if(inView.is(counterVertrouwen2el)) {
					executeCounterVertrouwen(1643)
				} else if(inView.is(counterVertrouwen1el)) {
					executeCounterVertrouwen(1643)
				}
			}
			scrollPos = (document.body.getBoundingClientRect()).top;
		})
	}
}
function addListener() {
	return onderwerpBtns.forEach(d => d.addEventListener("click", changeTopic))
}
addListener();
