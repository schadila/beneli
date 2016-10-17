function stickyFooter() {
    var $footer = $(".footer");
    var windowHeight = $(window).outerHeight();
    var contentHeight = $("body").outerHeight();
    var footerHeight = $footer.outerHeight() + 0;
    console.log((windowHeight - footerHeight)+ "=" + contentHeight);

    if ((windowHeight - footerHeight) >= contentHeight) {
        $footer.addClass("fixed");
    } else {
        $footer.removeClass("fixed");
    }
}