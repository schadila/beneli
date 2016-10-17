$(document).ready(function () {
    if (Function('/*@cc_on return document.documentMode===10@*/')()) {
        $("input").addClass("ie10");
    }
    fixedHeaderImage()
    stickyFooter();
    agbPosition();
});

function fixedHeaderImage(){
    var position = $(window).width()*.4;
    $(".header-image").css("background-position", "0 -"+position+"px");
}