function formSent(){
    addcard();
}
function schenken() {
    give();
}

function switchForm(data){
    if(data.type == 1 && data.partial == 1){
        $("#schenken").removeClass("hide");
    } else {
        $("#schenken").removeClass("hide");
        $("input#anteile").addClass("hide").val(1);
        $("label[for='anteile']").addClass("hide");
    }

    $("#product-title").html(data.name);
    $("#product-text").html(data.text);
    $("#product-image").attr("src", data.image);
    $("#product-link").attr("href", data.url);
    var pay = getParameterByName("pay");
    $("input[type='range']").attr("value", pay);
    $("input[type='range']").attr("max", data.rest*10);

    var restprice = (100*(data.rest/data.anteile));
    var collected = 100-(100*(data.rest/data.anteile));
    if(collected==0){
        collected = 0;
        restprice = "100%";
    }else{
        collected = collected + "%";
        restprice = restprice + "%";
    }
    $("#range td:first-child").width(collected);
    $("#range td:last-child").width(restprice);
    $('.form input[type="range"]').rangeslider({
        polyfill: false,
        onSlide: function(position, value) {
            $("#anteile-span").html("<b>CHF "+value+"</b>");
        }
    });

    if(data.rest>0){
        $("input#anteile").attr("max", data.rest).val(1);
    }else{
        $("input#anteile").attr("max", "1").val(1);
    }
    returnPrice();

    $('input#anteile').on("change paste keyup", function() {
        returnPrice();
    });

    function returnPrice(){
        var e = $('input#anteile');
        var pay = getParameterByName("pay");
        // var test = e.val()+ " x "+ pricePartial;
        $("#anteile-span").html("<b>CHF "+pay+"</b>");
    }

}

$(document).ready(function(){
    var product = getParameterByName("product");
    $("#schenken #product").val(product);
    getProduct(product);

});

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}