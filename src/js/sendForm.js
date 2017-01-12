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
        var pricePartial = data.price/data.anteile;
        // var test = e.val()+ " x "+ pricePartial;
        $('#anteile-span').html("<b>"+(e.val()*pricePartial)+" CHF</b>");
    }

}

$(document).ready(function(){
    var product = window.location.href.match(/product=(.+)/)[1]
    $("#schenken #product").val(product);
    getProduct(product);

});