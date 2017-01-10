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

}

$(document).ready(function(){
    var product = window.location.href.match(/product=(.+)/)[1]
    $("#schenken #product").val(product);
    getProduct(product);
});