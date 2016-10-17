function formSent(){
    $(".grid-container").fadeOut(0);
    $(".teasers.notdone").fadeOut(0);
    $(".teasers.done").fadeIn(0);

    var anrede = $("input[name='anrede']:checked").val();
    if(anrede == "female"){anrede = "Frau";}else{anrede="Herr"}
    var nachname = $("input[name='nachname']").val();

    $(".done .TeaserTitle").append(anrede + " " + nachname +".");

    stickyFooter();
}