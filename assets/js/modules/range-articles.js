$(document).ready( function () {
    // Helper function
    var update_handle_track_pos;

    update_handle_track_pos = function(slider, ui_handle_pos) {
        var handle_track_xoffset, slider_range_inverse_width;
        handle_track_xoffset = -((ui_handle_pos / 100) * slider.clientWidth);
        $(slider).find(".handle-track").css("left", handle_track_xoffset);
        slider_range_inverse_width = (100 - ui_handle_pos) + "%";
        return $(slider).find(".slider-range-inverse").css("width", slider_range_inverse_width);
    };

    // Init slider
    $("#range-articles").slider({
        range: "min",
        max: 100,
        value: 50,
        create: function(event, ui) {
            var slider;
            slider = $(event.target);

            // Append the slider handle with a center dot and it's own track
            slider.find('.ui-slider-handle').append('<span class="dot"><span class="handle-track"></span></span>');

            // Append the slider with an inverse range
            slider.prepend('<div class="slider-range-inverse"></div>');

            // Set initial dimensions
            slider.find(".handle-track").css("width", event.target.clientWidth);

            $("#limit").val($("#range-articles").slider("values", 0) + " ARTICLES");
            // Set initial position for tracks
            return update_handle_track_pos(event.target, $(this).slider("value"));
        },
        slide: function(event, ui) {
            // Update position of tracks
            $("#limit").val(ui.value + " ARTICLES");
            return update_handle_track_pos(event.target, ui.value);
        }
    });
});