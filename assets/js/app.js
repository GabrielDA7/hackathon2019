const $ = require('jquery');
global.$ = global.jQuery = $;

require('bootstrap');

require('../css/app.scss');

$(document).ready(function() {
    $('[data-toggle="popover"]').popover();
});