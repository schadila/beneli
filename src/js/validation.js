$("#add-card").validate({
    rules: {
        title: "required",
        image: "required",
        price: "required"
    },
    messages: {
        title: "Bitte füllen Sie dieses Feld aus.",
        image: "Bitte füllen Sie dieses Feld aus.",
        price: "Bitte füllen Sie dieses Feld aus."
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
        anteile: "Der Anteil muss mindestens 1 sein und darf die verfügbaren Anteile nicht überschreiten.",
        product: ""
    },
    ignore: ".ignore",
    submitHandler: function(){give()}
});

$("#edit-card").validate({
    rules: {
        title: "required",
        image: "required",
        url: "required",
        price: "required"
    },
    messages: {
        title: "Bitte füllen Sie dieses Feld aus.",
        image: "Bitte füllen Sie dieses Feld aus.",
        url: "Bitte füllen Sie dieses Feld aus.",
        price: "Bitte füllen Sie dieses Feld aus."
    },
    ignore: ".ignore",
    submitHandler: function(){bearbeiten()}
});