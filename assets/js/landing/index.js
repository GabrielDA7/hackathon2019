require('../../css/landing/index.scss');
require('../../css/d3/circularBarPlot.scss');
require('./_sidebar');
require('../modules/range-score');
require('../modules/range-articles');
require('../modules/sidebar');
require('../modules/search');
import CircularBarPlot from "../d3/circularBarPlot";
import * as d3 from "d3";




// EVENTS
$(document).ready(function(){
    $('.bar-path-selection').on("click", function(e){
        $('.active').removeClass('active');
        $(this).addClass('active');
    });
});



