require('../../css/landing/index.scss');
require('./_sidebar');

const d3 = require("d3");


chart = {
    const svg = d3.select(DOM.svg(width, height))
        .attr("viewBox", `${-width / 2} ${-height * 0.69} ${width} ${height}`)
        .style("width", "100%")
        .style("height", "auto")
        .style("font", "10px sans-serif");

    svg.append("g")
        .selectAll("g")
        .data(d3.stack().keys(data.columns.slice(1))(data))
        .join("g")
        .attr("fill", d => z(d.key))
        .selectAll("path")
        .data(d => d)
        .join("path")
        .attr("d", arc);

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    svg.append("g")
        .call(legend);

    return svg.node();
}