$(document).on('click','path',function(){
    let id = $(this).attr("id");
    sendAjaxRequest(id);
});

function sendAjaxRequest(id) {
    $.ajax({
        url:"/ajax/find/article/" + id,
        type: 'GET',
        success:function (data) {
            $(".selectedRow").removeClass("selectedRow");
            document.getElementById("row" + data.id).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            let elem = $("#row" + data.id);
            elem.addClass("selectedRow");
            data.ngrams.forEach(function (element) {
                console.log(element);
            });
        }
    });
}