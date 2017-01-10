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
}

$(document).ready(function(){
    var product = window.location.href.match(/product=(.+)/)[1]
    $("#schenken #product").val(product);
    getProduct(product);
});