$("#sofortgewinn").validate({
    rules: {
        anrede: "required",
        vorname: "required",
        nachname: "required",
        zip: {
            required: true,
            minlength: 4
        },
        ort: "required",
        street: "required",
        country: "required",
        email: {
            required: true,
            email: true
        },
        platform: "required",
        platform_rezeptaktion: {
            required: "input#rezeptaktion:checked"
        },
        platform_anderes: {
            required: "input#anderes:checked"
        },
        agb: "required",
        rezept: "required"
    },
    messages: {
        anrede: "Bitte geben Sie Ihr Geschlecht an.",
        vorname: "Bitte füllen Sie dieses Feld aus.",
        nachname: "Bitte füllen Sie dieses Feld aus.",
        zip: {
            required: "Bitte füllen Sie dieses Feld aus.",
            minlength: "Die PLZ muss mindestens vierstellig sein."
        },
        ort: "Bitte geben Sie einen Ort ein.",
        street: "Bitte geben Sie eine Strasse ein.",
        country: {
            required: "Bitte geben Sie ein Land ein."
        },
        email: {
            required: "Bitte geben Sie eine E-Mail Adresse ein.",
            email: "Bitte geben Sie eine gültige E-Mail Adresse ein."
        },
        platform: {
            required: "Bitte füllen Sie dieses Feld aus."
        },
        platform_rezeptaktion: "Bitte füllen Sie dieses Feld aus.",
        platform_anderes: "Bitte füllen Sie dieses Feld aus.",
        agb: "Bitte akzeptieren Sie unsere Teilnahmebedinungen.",
        rezept: "Bitte wählen Sie ein Rezept aus."
    },
    errorPlacement: function(error, element) {
        if (element.attr("name") == "platform") {
            error.insertAfter($(".radio-section.platform"));
        } else if(element.attr("name") == "anrede"){
            error.insertAfter($(".radio-section.anrede"));
        } else if (element.attr("name") == "agb") {
            error.insertAfter(element.parent(".checkbox-section"));
        }else if(element.attr("name") =="rezept"){
            error.insertAfter(".checkbox-section");
        } else{
            error.insertAfter(element);
        }
    },
    ignore: ".ignore",
    submitHandler: function(){formSent()}
});