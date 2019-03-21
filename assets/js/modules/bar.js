$(document).on('click','path',function(){
    let id = $(this).attr("id");
    sendAjaxRequest(id);
});

function sendAjaxRequest(id) {
    $.ajax({
        url:"/ajax/find/article/" + id,
        type: 'GET',
        success:function (data) {
            console.log(data);
            data.ngrams.forEach(function (element) {
                console.log(element);
            });
        }
    });
}