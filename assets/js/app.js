const $ = require('jquery');
global.$ = global.jQuery = $;

require('bootstrap');

const d3 = require("d3");

require('../css/app.scss');

$(document).ready(function() {
    $('[data-toggle="popover"]').popover();
});