require('../../css/landing/index.scss');
require('../../css/d3/circularBarPlot.scss');
require('./_sidebar');
import CircularBarPlot from "../d3/circularBarPlot";
import * as d3 from "d3";

// Graph constantes
var margin = 10,
    width = 400,
    height = 400,
    innerRadius = 80,
    outerRadius = Math.min(width, height) / 2;

var myData = [
    {name : 'Mon', value: 100},
    {name : 'Tuessssssssssss', value: 100},
    {name : 'Wed', value: 100},
    {name : 'Thu', value: 100},
    {name : 'Fris', value: 100},
    {name : 'Mond', value: 100},
    {name : 'Tuedd', value: 50},
    {name : 'Wedf', value: 100},
    {name : 'Thug', value: 100},
    {name : 'Frih', value: 100},
    {name : 'Mona', value: 100},
    {name : 'Tuee', value: 40},
    {name : 'Wedr', value: 100},
    {name : 'Thut', value: 100},
    {name : 'Frisa', value: 30},
    {name : 'Monda', value: 100},
    {name : 'Tuedda', value: 100},
    {name : 'Mondsa', value: 100},
    {name : 'Tuedsda', value: 100},
    {name : 'Wedfsa', value: 100},
    {name : 'Thugsa', value: 100},
    {name : 'Tuedsda', value: 100},
    {name : 'Mondsa', value: 100},
    {name : 'Tuedssda', value: 100},
    {name : 'Wesdfsa', value: 100},
    {name : 'Tshugsa', value: 100},



];

const graph = new CircularBarPlot(margin, width, height, innerRadius, outerRadius);
graph.setData(myData);
graph.init("#data-viz");
;



// EVENTS
$(document).ready(function(){
    $('.bar-path-selection').on("click", function(e){
        $('.active').removeClass('active');
        $(this).addClass('active');
    });
});



