import * as d3 from "d3";
import {radial} from "./lib/radial";


class CircularBarPlot {
    constructor(margin, width, height, innerRadius, outerRadius) {
        this.margin = margin;
        this.width = width;
        this.height = height;
        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
    }

    init(root) {
        let svgContainer = this.createSVGContainer(root);
        this.createRadiant(svgContainer);
        let barContainer = this.createBarContainer(svgContainer);
        this.createBars(barContainer);
        let circlesContainer = this.createCirclesContainer(barContainer);
        this.createCicle(circlesContainer);
        this.createImgCircle(circlesContainer);
    }

    xScale() {
        return d3.scaleBand()
            .range([0, 2 * Math.PI])
            .domain(this.data.map(function (d) {
                return d.name
            }));
    }

    yScale() {
        return radial().range([this.innerRadius, this.outerRadius])
            .domain([0, 100]);
    }

    createSVGContainer(root) {
        return d3.select(root)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 "+ this.width +" " + this.height)
            .classed("svg-content", true);
    }

    createBarContainer(container) {
        return container.append("g")
            .attr("transform", "translate(" + (this.width/2) + "," + ( this.height/2)+ ")")
            .attr("id", "container")
            .attr("fill", "url(#Gradient2)")
    }

    createBars(containerBar) {
        let self = this;
        containerBar.selectAll("path")
            .data(this.data)
            .enter()
            .append("g")
            .attr("class", "bar-path-selection")
            .attr("cursor", "pointer")
            .append("g")
            .attr("class", "bar-path-selection-background")
            .append("path")
            .attr("class", "bar")
            .attr("d", d3.arc()
                .innerRadius(this.innerRadius)
                .outerRadius(function(d) { return self.yScale()(d['value']); })
                .startAngle(function(d) { return self.xScale()(d.name); })
                .endAngle(function(d) { return self.xScale()(d.name) + self.xScale().bandwidth(); })
                .padAngle(0.03)
                .padRadius(this.innerRadius))
            .attr("id", function (d) {
                return d.name;
            });
    }

    createCirclesContainer(barContainer) {
       return barContainer.append("g");
    }

    createCicle(circlesContainer) {
        circlesContainer
            .append("circle")
            .attr("dx", (this.width+this.margin*2)/2)
            .attr("r", this.innerRadius/1.5)
            .attr("id", "circle1")
    }

    createImgCircle(circlesContainer) {
        circlesContainer.append("svg:image")
            .attr("xlink:href", logoPath)
            .attr("width", "60px")
            .attr("height", "60px")
            .attr("class", "center-image");
    }

    createRadiant(container) {
        let gradiantContainer = container.append("defs");

        let gradiant = gradiantContainer.append("linearGradient")
            .attr("id", "Gradient2")
            .attr("x1", "100%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%")
            .attr("gradientUnits", "userSpaceOnUse");

        gradiant.append("stop")
            .attr("offset", "20%")
            .attr("stop-color", "#FFFFFF")
            .attr("stop-opacity", 1);

        gradiant.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", "#BB6BD9")
            .attr("stop-opacity", 1);

        gradiant.append("stop")
            .attr("offset", "80%")
            .attr("stop-color", "#2F80ED")
            .attr("stop-opacity", 1);
    }

    setData(data) {
        this.data = data;
    }
}


export default CircularBarPlot;



