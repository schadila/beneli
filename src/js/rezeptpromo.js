stickyFooter();
agbPosition();

$(document).ready(function () {
    if (Function('/*@cc_on return document.documentMode===10@*/')()) {
        $("input").addClass("ie10");
    }
    fixedHeaderImage()
});

$(window).resize(function () {
    stickyFooter();
    agbPosition();
    fixedHeaderImage();
});


function is_touch_device() {
    return (('ontouchstart' in window)
    || (navigator.MaxTouchPoints > 0)
    || (navigator.msMaxTouchPoints > 0));
}

function fixedHeaderImage(){
    var position = $(window).width()*.4;
    $(".header-image").css("background-position", "0 -"+position+"px");
}

function stickyFooter() {
    var $footer = $(".footer");
    var windowHeight = $(window).outerHeight();
    var contentHeight = $("body").outerHeight();
    var footerHeight = $footer.outerHeight() + 100;
    if ((windowHeight - footerHeight) >= contentHeight) {
        $footer.addClass("fixed");
    } else {
        $footer.removeClass("fixed");
    }
}

$("input[name=zip]").on("blur", function () {
    var plz = $(this).val();
    $.getJSON("/php/plz.json",
        function (result) {
            $.each(result, function (index, value) {
                if (value.PLZ == plz) {
                    $("input[name=ort]").val(value.Ortschaft);
                    return false;
                }
            });
        });
});

$('input[name=phone]').keyup(function () {
    this.value = this.value.replace(/(\d{3})\-?(\d{3})\-?(\d{2})\-?(\d{2})/, '$1 $2 $3 $4');
});

var display = false;

$("#lang").click(function(){

    if(!display){
        $("#lang").addClass("lang_switch_open");
        display = true;
    }else{
        $("#lang").removeClass("lang_switch_open");
        display = false;
    }

});

$("#lang select").change(function(){
    window.location.href = $("#lang select").val();
});

if(!is_touch_device()){
    $(".teaser-image").hover(function(){
        $(this).stop().addClass("onhover");
    }, function(){
        $(this).stop().removeClass("onhover");
    });
}
var selectedRecept = 0;

$(".teaser-image").on('click', function(){
    $(".teaser-image").removeClass("onclicked");
    $(this).stop().addClass("onclicked");
    selectedRecept = $(this).data("index");
    console.log(selectedRecept);
    $("input[name='rezept']").val(selectedRecept);
    navigator.vibrate(200);
});

$(".radio-section.platform input[type='radio']").not(this).click(function(){
    $(".rezeptaktion").fadeOut(0);
    $(".anderes").fadeOut(0);
    $("input[name='platform_anderes']").removeClass("required");
    $("input[name='platform_rezeptaktion']").removeClass("required");
    $("input[name='platform_anderes']").removeClass("valide");
    $("input[name='platform_rezeptaktion']").removeClass("valide");
});

$("input#rezeptaktion").click(function(){
    $("input[name='platform_anderes']").removeClass("required");
    $("input[name='platform_rezeptaktion']").addClass("required");
    $(".rezeptaktion").fadeIn(0);
    $(".anderes").fadeOut(0);
});

$("input#anderes").click(function(){
    $("input[name='platform_rezeptaktion']").removeClass("required");
    $("input[name='platform_anderes']").addClass("required");
    $(".rezeptaktion").fadeOut(0);
    $(".anderes").fadeIn(0);
});

function agbPosition(){
    var paddingLeft = parseInt($(".form.container").css("margin-left"), 10) + parseInt($(".grid-container").css("margin-left"), 10);
    $(".agbs").width($(window).width());
    $(".agbs").css("margin-left", "-"+paddingLeft+"px");
}

function showAGB(){
    $(".agbs").slideDown(100);
    $(".agbs").addClass("showagb");

}

function hideAGB(){
    $(".agbs").slideUp(100);
    $(".agbs").removeClass("showagb");
}

