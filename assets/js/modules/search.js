import CircularBarPlot from "../d3/circularBarPlot";

$(document).ready( function () {
    sendAjaxRequest();

    $('.trending-topic').click(function () {
        let topic = $('.trending-topic').find("span").attr("id");
        sendAjaxRequest(topic);
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    $('#search, #topic, #hours').change(function () {
        sendAjaxRequest();
    });

    $('#range-score, #range-articles').on('slidechange', function(event, ui){
        sendAjaxRequest();
    });
});

function sendAjaxRequest(topic) {
    let query = $('#search').val();
    let topics = getCheckedRadioValues('topic');
    let hours = getCheckedRadioValue('hours');
    let limit = getNumberFromString($('#limit').val());

    if (topic != null)
        topics = [topic];
    // let score = getSliderValues();
    let queryString = formatQueryString(query, topics, hours, limit, score);
    $.ajax({
        url:"/ajax/find/articles/",
        type: 'GET',
        data: queryString,
        success:function (data) {
            var margin = 10,
                width = 400,
                height = 400,
                innerRadius = 80,
                outerRadius = Math.min(width, height) / 2;
            let formatedData = formatData(data);
            $("#data-viz").children().remove();
            const graph = new CircularBarPlot(margin, width, height, innerRadius, outerRadius);
            graph.setData(formatedData);
            graph.init("#data-viz");
        }
    });
}

function formatData(data) {
    let formatedData = [];
    data.forEach(function (element) {
        let value = element.article_score * 100 / data[0].article_score;
        formatedData.push({
            name: element.name,
            value: value
        });
    });
    return shuffle(formatedData);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
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
    // if (isNotEmpty(score)) {
    //     queryString += "score=" + splitArrayElements(score) + "&";
    // }
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
    if (Array.isArray(value) && value.length === 0)
        return false;
    return !(value === undefined || value === null || value === "");
}

function getNumberFromString(string) {
    return parseInt(string.match(/\d+/));
}