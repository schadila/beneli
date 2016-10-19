if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

}else{
    $(".teaser-image").hover(function(){
        $(this).stop().addClass("onhover");
    }, function(){
        $(this).stop().removeClass("onhover");
    });
}

var selectedRecept = 0;

$(".teaser-image").on('click', function(event){
    $(".teaser-image").removeClass("onclicked");
    $(this).stop().addClass("onclicked");
    showGoToBottom();
    selectedRecept = $(this).data("index");
    like(selectedRecept);
    $("input[name='rezept']").val(selectedRecept);


});