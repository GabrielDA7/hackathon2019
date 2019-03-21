$(document).ready( function () {
    $('#search, #topic, #hours').change(function () {
        sendAjaxRequest();
    });

    $('#range-score, #range-articles').on('slidechange', function(event, ui){
        sendAjaxRequest();
    });
});

function sendAjaxRequest() {
    let query = $('#search').val();
    let topics = getCheckedRadioValues('topic');
    let hours = getCheckedRadioValue('hours');
    let limit = getNumberFromString($('#limit').val());
    let score = getSliderValues();
    let queryString = formatQueryString(query, topics, hours, limit, score);
    $.ajax({
        url:"/ajax/find/articles/",
        type: 'GET',
        data: queryString,
        success:function (data) {
            console.log(data[0]);
        }
    });
}

function getSliderValues() {
    let sliderRange = $("#slider-range");
    let value1 = sliderRange.slider("values", 0);
    let value2 = sliderRange.slider("values", 1);
    return [
        value1,
        value2
    ];
}

function getCheckedRadioValue(name) {
    let radios = document.getElementsByName(name);
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            return radios[i].value;
        }
    }
}

function getCheckedRadioValues(name) {
    let radios = document.getElementsByName(name);
    let values = [];
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            values[i] = radios[i].value;
        }
    }
    return values;
}

function formatQueryString(query, topics, hours, limit, score) {
    let queryString = "";
    if (isNotEmpty(query)) {
        queryString += "query=" + query + "&";
    }
    if (isNotEmpty(hours)) {
        queryString += "hours=" + hours + "&";
    }
    if (isNotEmpty(limit)) {
        queryString += "limit=" + limit + "&";
    }
    if (isNotEmpty(topics)) {
        queryString += "topics=" + splitArrayElements(topics) + "&";
    }
    if (isNotEmpty(score)) {
        queryString += "score=" + splitArrayElements(score) + "&";
    }
    return queryString;
}

function splitArrayElements(array) {
    let splitedValues = "";
    array.forEach(function(element) {
        splitedValues += element + "-";
    });
    splitedValues = splitedValues.substr(0, splitedValues.length-1);
    return splitedValues;
}

function isNotEmpty(value) {
    return !(value === undefined || value === null || value === "");
}

function getNumberFromString(string) {
    return parseInt(string.match(/\d+/));
}