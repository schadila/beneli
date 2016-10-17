function agbPosition(){
    var paddingLeft = parseInt($(".form.container").css("margin-left"), 10) + parseInt($(".grid-container").css("margin-left"), 10);
    $(".agbs, .sticky-button").width($(window).width());
    $(".agbs, .sticky-button").css("margin-left", "-"+paddingLeft+"px");
}

function showAGB(){
    $(".agbs").slideDown(100);
    $(".agbs").addClass("showagb");

}

function hideAGB(){
    $(".agbs").slideUp(100);
    $(".agbs").removeClass("showagb");
}