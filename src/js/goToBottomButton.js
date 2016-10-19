function showGoToBottom(){
    showHideButton();

    $(window).scroll(function(){
        showHideButton();
    });
}

function showHideButton(){
    if($(window).scrollTop() > ($('.form').position().top-600)){
        $(".sticky-goto-bottom-button").stop().fadeOut(200);
    }else{
        $(".sticky-goto-bottom-button").stop().fadeIn(200);
    }
}

function goToForm(){
    $("html, body").animate({ scrollTop: $('.form').position().top }, "slow");
}