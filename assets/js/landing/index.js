require('../../css/landing/index.scss');
require('../../css/d3/circularBarPlot.scss');
require('./_sidebar');
require('../modules/range-score');
require('../modules/range-articles');
require('../modules/sidebar');
require('../modules/search');
require('../modules/bar');

// EVENTS
$(document).ready(function(){
    $('.bar-path-selection').on("click", function(e){
        $('.active').removeClass('active');
        $(this).addClass('active');
    });

    $('#checkAll').on("change", function(e) {
        if($(this).prop("checked") == true) {
            $("#container-right input[type='checkbox']").prop("checked", true)
        } else {
            $("#container-right input[type='checkbox']").prop("checked", false)
        }
    });

    $('#circle1').on("click", function(e){
        alert('oui');
    });
});



