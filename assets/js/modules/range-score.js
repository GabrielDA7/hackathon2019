$(document).ready( function () {
    let update_handle_track_pos = function(slider, ui_handle_pos) {
        var handle_track_xoffset, slider_range_inverse_width;
        handle_track_xoffset = -((ui_handle_pos[1] / 100) * slider.clientWidth);
        $(slider).find(".handle-track").css("left", handle_track_xoffset);
        slider_range_inverse_width = (100 - ui_handle_pos[1]) + "%";
        return $(slider).find(".slider-range-inverse").css("width", slider_range_inverse_width);
    };
    let rangeScore = $("#range-score");

    rangeScore.slider({
        range: true,
        min: 0,
        max: 100,
        values: [ 75, 100 ],
        create: function(event, ui) {
            let slider;
            slider = $(event.target);

            // Append the slider handle with a center dot and it's own track
            slider.find('.ui-slider-handle').append('<span class="dot"><span class="handle-track"></span></span>');

            // Append the slider with an inverse range
            slider.prepend('<div class="slider-range-inverse"></div>');

            // Set initial dimensions
            slider.find(".handle-track").css("width", event.target.clientWidth);

            $("#score").val(rangeScore.slider("values", 0) + "K - " + rangeScore.slider("values", 1) + "K SHARES");
            // Set initial position for tracks
            return update_handle_track_pos(event.target, ui.values);
        },
        slide: function( event, ui ) {
            $("#score").val(ui.values[ 0 ] + "K - " + ui.values[ 1 ] + "K SHARES");
            return update_handle_track_pos(event.target, ui.values);
        }
    });

});