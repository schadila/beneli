$("#add-card").validate({
    rules: {
        active: "required",
        name: "required",
        text: "required",
        image: "required",
        url: "required",
        price: "required",
        restprice: "required",
        partial: "required",
        type: "required"
    },
    messages: {
        active: "Bitte geben Sie Ihr Geschlecht an.",
        name: "Bitte füllen Sie dieses Feld aus.",
        text: "Bitte füllen Sie dieses Feld aus.",
        image: "Bitte geben Sie einen Ort ein.",
        url: "Bitte geben Sie eine Strasse ein.",
        price: "Bitte füllen Sie dieses Feld aus.",
        restprice: "Bitte füllen Sie dieses Feld aus.",
        partial: "Bitte akzeptieren Sie unsere Teilnahmebedinungen.",
        type: "Bitte wählen Sie ein Rezept aus."
    },
    errorPlacement: function(error, element) {
        if (element.attr("name") == "active"){
            error.insertAfter($(".checkbox-section:first-child"));
        } else if (element.attr("name") == "partial") {
            error.insertAfter(element.parent(".checkbox-section.types"));
        }else if(element.attr("name") =="type"){
            error.insertAfter(".checkbox-section.types");
        } else{
            error.insertAfter(element);
        }
    },
    ignore: ".ignore",
    submitHandler: function(){formSent()}
});