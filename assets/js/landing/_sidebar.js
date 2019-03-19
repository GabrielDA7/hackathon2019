$(document).ready(function () {
    console.log('te');
    $('#sidebarCollapse').on('click', function () {
        console.log('tes');
        $('#sidebar').toggleClass('active');
    });

});