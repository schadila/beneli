$("#add-card").validate({
    rules: {
        name: "required",
        text: "required",
        image: "required",
        price: "required",
        anteile: {
            required: "input#partial:checked"
        }
    },
    messages: {
        name: "Bitte füllen Sie dieses Feld aus.",
        text: "Bitte füllen Sie dieses Feld aus.",
        image: "Bitte füllen Sie dieses Feld aus.",
        price: "Bitte füllen Sie dieses Feld aus.",
        anteile: "Bitte füllen Sie dieses Feld aus."
    },
    ignore: ".ignore",
    submitHandler: function(){formSent()}
});

$("#schenken").validate({
    rules: {
        name: "required",
        vorname: "required",
        email: "required",
        adresse: "required",
        ort: "required",
        anteile: "required",
        product: "required"
    },
    messages: {
        name: "Bitte füllen Sie dieses Feld aus.",
        vorname: "Bitte füllen Sie dieses Feld aus.",
        email: "Bitte füllen Sie dieses Feld aus.",
        adresse: "Bitte füllen Sie dieses Feld aus.",
        ort: "Bitte füllen Sie dieses Feld aus.",
        anteile: "Bitte füllen Sie dieses Feld aus.",
        product: ""
    },
    ignore: ".ignore",
    submitHandler: function(){give()}
});