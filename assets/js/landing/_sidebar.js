const Hammer = require("hammerjs");

var swipe = new Hammer(document);

swipe.on('swiperight swipeleft', function(e) {
    e.preventDefault();
    if (e.type == 'swiperight') {
        // open menu
        $('#navigation').animate({
            left: '0'
        });
    } else {
        // close/hide menu
        $('#navigation').animate({
            left: '-100%'
        });
    }
});



