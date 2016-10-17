$(".radio-section.platform input[type='radio']").not(this).click(function(){
    $(".rezeptaktion").fadeOut(0);
    $(".anderes").fadeOut(0);
    $(".required_platform").removeClass("required_platform");
    $("input[name='platform_anderes']").removeClass("required");
    $("input[name='platform_rezeptaktion']").removeClass("required");
    $("input[name='platform_anderes']").removeClass("valide");
    $("input[name='platform_rezeptaktion']").removeClass("valide");

    $("#platform_anderes-error").fadeOut(0);
    $("#platform_rezeptaktion-error").fadeOut(0);
});

$("input#rezeptaktion").click(function(){
    $(".rezeptaktion").fadeIn(0);
    $(".anderes").fadeOut(0);
});

$("input#anderes").click(function(){
    $(".rezeptaktion").fadeOut(0);
    $(".anderes").fadeIn(0);
});