function is_touch_device() {
    return (('ontouchstart' in window)
    || (navigator.MaxTouchPoints > 0)
    || (navigator.msMaxTouchPoints > 0));
}

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
    showGoToBottom();
    selectedRecept = $(this).data("index");
    console.log(selectedRecept);
    $("input[name='rezept']").val(selectedRecept);
    navigator.vibrate(200);
});