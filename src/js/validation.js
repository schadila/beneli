$("input[type='text'], input[type='number'], input[type='email'], input[type='checkbox']").on('focus keydown blur', function(){
    if($.trim($(this).val()) != ""){
        $(this).removeClass("required");
        $(this).addClass("valide");
    }else{
        $(this).addClass("required");
        $(this).removeClass("valide");
    }
});

$("input[name='anrede']").click(function(){
   $("input[name='anrede']").removeClass("required");
});

$(".submit").click(function(){

    var inputRezeptaktion = $("input[name='platform_rezeptaktion']").val();
    if(inputRezeptaktion){$("input[id='rezeptaktion']").val("Rezeptaktion: "+inputRezeptaktion)}
    var inputAnderes= $("input[name='platform_anderes']").val();
    if(inputAnderes){$("input[id='anderes']").val("Anderes: "+inputAnderes)}

    var valuePlatformRadio = $("input[name='platform']:checked").val();

    var formValid = false;

    var isValid = true;
    var error1 = false;
    var error2 = false;
    var emailValide = false;

    if(!valuePlatformRadio){isValid=false}
    if($("input[id='agb']").is(':checked')){}else{error2 = true;}
    if($("input[name='anrede']").is(':checked')){}else{isValid = false;}
    if($("input[name='rezept']").val()==""){error1 = true;}
    $(".required, .valide").each(function() {
        var element = $(this);
        if (element.val() == ""){isValid = false;}
    });

    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var email = $("input[type='email']");

    if (email.val().trim() == "" || email.val() == null || !re.test(email.val())) {
        emailValide = false;
    } else {
        emailValide = true;
    }

    if(isValid==false){
        $(".error0").fadeIn(0);
    }else{
        $(".error0").fadeOut(0);
    }
    if(error1==false){
        $(".error1").fadeOut(0);
    }else{
        $(".error1").fadeIn(0);
    }
    if(error2==false){
        $(".error2").fadeOut(0);
    }else{
        $(".error2").fadeIn(0);
    }
    if(emailValide==true){
        $(".error3").fadeOut(0);
        email.removeClass("required");
        email.addClass("valide");
    }else{
        $(".error3").fadeIn(0);
        email.addClass("required");
        email.removeClass("valide");
    }

    if(isValid==true && error1 == false && error2 == false && emailValide == true){
        formValid = true;
    }
    console.log(formValid);
});