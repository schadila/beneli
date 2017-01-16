$(document).ready(function () {
    if (Function('/*@cc_on return document.documentMode===10@*/')()) {
        $("input").addClass("ie10");
    }

    var url = window.location.pathname;
    var filename = url.split('/').pop().split('#')[0].split('?')[0];

    if(filename == "schenken.html") getproductdata(switchForm);
    if(filename == "edit-card.html") getproductdata(editForm);
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

function changeValue(value, id, href, index){
    var url = href+"?product="+id+"&pay="+value+"&toform=true";

    $(".gift-"+index).find(".sum").html("CHF "+value);
    $(".gift-"+index+" .gift-button").attr("href", url);
}

function returnPrice(){
    var pay = getParameterByName("pay");
    $("#anteile-span").html("<b>CHF "+pay+"</b>");
}

function setCookie(name, value)
{
    var today = new Date();
    var expiry = new Date(today.getTime() + 100 * 24 * 3600 * 1000); // plus 30 days
    document.cookie=name + "=" + escape(value) + "; path=/; expires=" + expiry.toGMTString();
}

function getCookie(name)
{
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}

function showCookieContent () {
    $(".schenken-form .cookie-content-form").slideToggle(500);
}

function goToForm(){
    var toForm = getParameterByName("toform");
    if(toForm=="true"){
        $("html, body").animate({
                scrollTop: $("#schenken").offset().top-30},
            'slow');
    }

}

function editForm(data){

    var title = $("input[name='title']");
    var text = $("textarea[name='desc']");
    var image = $("input[name='image']");
    var url = $("input[name='url']");
    var price = $("input[name='price']");
    var partial = $("input[name='partial']");
    var product = $("input[name='product']");
    var rest = $("input[name='rest']");
    var anteile = $("input[name='anteile']");

    title.val(data.name);
    text.val(data.text);
    simplemde.value(data.text);
    image.val(data.image);
    url.val(data.url);
    price.val(data.price);
    if(data.partial==1) partial.prop('checked', true);
    product.val(data.id);
}

function switchForm(data){


    var product = getParameterByName("product");
    $("#schenken #product").val(product);

    var vorname = getCookie("vorname");
    var nachname = getCookie("nachname");
    var email = getCookie("email");
    var adresse =getCookie("adresse");
    var ort = getCookie("ort");


    $("input[name='vorname']").val(vorname);
    $("input[name='name']").val(nachname);
    $("input[name='email']").val(email);
    $("input[name='adresse']").val(adresse);
    $("input[name='ort']").val(ort);

    if(data.type == 1 && data.partial == 1){
        $("#schenken").removeClass("hide");
        $(".pay-checkbox").addClass("hide");
    } else {
        $("#schenken").removeClass("hide");
        $("input#anteile").addClass("hide").val(1);
        $("label[for='anteile']").addClass("hide");
        $("#range").addClass("hide");
    }

    if(vorname){
        $(".schenken-form .cookie-content-form").fadeOut(0);
        $(".cookie .cookie-data").show().html(vorname + " "+ nachname+", "+adresse+", "+ort);
    }else{
        $(".cookie").addClass("hide");
    }

    //Auffüllen der Geschenken-Parameter
    $("#product-title").html(data.name);
    $("#product-text").html(simplemde.options.previewRender(data.text));
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
        if(collected>80){
            collected = "80%";
            restprice = "20%";
        }else{
            collected = collected + "%";
            restprice = restprice + "%";
        }
    }

    $("#range td:first-child").width(collected);
    $("#range td:last-child").width(restprice);

    $('.form input[type="range"]').rangeslider({
        polyfill: false,
        onSlide: function(position, value) {
            $("#anteile-span").html("<b>CHF "+value+"</b>");
        }
    });



    $("#product-image").load(function(){
        goToForm();
    });


    returnPrice();

}