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