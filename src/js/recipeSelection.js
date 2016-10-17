if(!is_touch_device()){
    $(".teaser-image").hover(function(){
        $(this).stop().addClass("onhover");
    }, function(){
        $(this).stop().removeClass("onhover");
    });
}

function is_touch_device() {
    return 'ontouchstart' in window        // works on most browsers
        || 'onmsgesturechange' in window;  // works on IE10 with some false positives
};

var selectedRecept = 0;

$(".teaser-image").on('click', function(){
    $(".teaser-image").removeClass("onclicked");
    $(this).stop().addClass("onclicked");
    showGoToBottom();
    selectedRecept = $(this).data("index");
    console.log(selectedRecept);
    like(selectedRecept);
    $("input[name='rezept']").val(selectedRecept);
    navigator.vibrate(200);
});