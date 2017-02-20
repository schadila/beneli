
var simplemde = new SimpleMDE({
    hideIcons: ["guide", "heading", "quote", "link", "image", "side-by-side", "fullscreen"],
    spellChecker: false
});

getproductdata = function(onSubmit){
    var product = getParameterByName("product");
    var endpoint = "./php/API.php/getproduct";
    var data = {
        'product': product
    }
    $.get(endpoint, data, function (res) {
        onSubmit(res[0]);
    });
}

deletecard = function(onSubmit){
    var endpoint = "./php/API.php/deletecard";
    var product = getParameterByName("product");

    var data = {
        'product': product
    }

    $.get(endpoint, data, function(res, err){
        if(!res.success){
            console.log(res.success);
        }else{
            $("#edit-card").addClass("hide");
            $(".message.success.hide").removeClass("hide");
            console.log(res.success);
        }
    });
}


addcard = function (onSubmit) {
    var endpoint = "./php/API.php/addcard";
    // var form = $('#add-card')[0];
    // var formData = new FormData(form);
    // console.log(formData);

    var active = $("input[name='active']").val();
    var name = $("input[name='title']").val();
    var text = simplemde.value();
    var image = $("input[name='image']").val();
    var url = $("input[name='url']").val();
    var price = $("input[name='price']").val();
    var anteile = $("input[name='anteile']").val();
    // var file = $("input[name='file']")[0].files[0];
    var partial = $("input[name='partial']:checked").val();

    var type = partial;
    if(!type){
        type = 0;
    }
    if(!partial){
        partial = 0;
    }
    if(!anteile){
        anteile = 1;
    }

    var data = {
        'active': active,
        'name': name,
        'text': text,
        'image': image,
        'url': url,
        'price': price,
        'anteile': anteile,
        'partial': partial,
        'type': type
    };

    // $.ajax({
    //     url: endpoint,
    //     type: "GET",
    //     data: new FormData($('#add-card')[0]),
    //     contentType: false,
    //     cache: false,
    //     processData:false,
    //     success: function(data) {
    //         $("form#add-card").addClass("hide");
    //         $(".message.success.hide").removeClass("hide");
    //     }
    // });

    $.get(endpoint, data, function(res, err){
        if(!res.success){
            console.log(res.success);
        }else{
            $("form#add-card").addClass("hide");
            $(".message.success.hide").removeClass("hide");
            console.log(res.success);
        }
    });
};

editcard = function (onSubmit) {
    var endpoint = "./php/API.php/editcard";

    var name = $("input[name='title']").val();
    var text = simplemde.value();
    var image = $("input[name='image']").val();
    var url = $("input[name='url']").val();
    var price = $("input[name='price']").val();
    var anteile = $("input[name='price']").val()/10;
    var partial = $("input[name='partial']:checked").val();
    var product = $("input[name='product']").val();
    var type = partial;
    if(!type) type = 0;
    if(!partial) partial = 0;
    if(!anteile) anteile = 1;

    var data = {
        'name': name,
        'text': text,
        'image': image,
        'url': url,
        'price': price,
        'anteile': anteile,
        'partial': partial,
        'type': type,
        'product': product
    };

    $.post(endpoint, data, function(res, err){
        if(!res.success){
            console.log(res.success);
        }else{
            $(".message.success.hide").removeClass("hide");
            console.log(res.success);
        }
    });
};

give = function (onSubmit) {
    console.log("test");
    var endpoint = "./php/API.php/give";

    var vorname = $("input[name='vorname']").val();
    var name = $("input[name='name']").val();
    var email = $("input[name='email']").val();
    var adresse = $("input[name='adresse']").val();
    var ort = $("input[name='ort']").val();
    var anteile = $("input[type='range']").val()/10;
    var text = $("textarea[name='desc']").val();
    var pay = $("input[name='pay']").val();
    if(!pay) pay = 0;
    var product = $("input[name='product']").val();

    setCookie("vorname", vorname);
    setCookie("nachname", name);
    setCookie("email", email);
    setCookie("adresse", adresse);
    setCookie("ort", ort);

    var data = {
        'vorname': vorname,
        'name': name,
        'email': email,
        'adresse': adresse,
        'ort': ort,
        'anteile': anteile,
        'text': text,
        'pay': pay,
        'product': product
    };

    $.get(endpoint, data,  function (res, err) {
        if(!res.success){
            $(".message.success").addClass("hide");
            $(".message.fail.hide").removeClass("hide");
            if(res.anteile==1){
                $(".message.fail").html("Es ist nur noch "+res.anteile+" Anteil verfügbar.");
            }else if(res.anteile==0){
                $(".message.fail").html("Ups, das ging aber schnell. Jemand ist Dir zuvorgekommen. Leider sind keine Anteile mehr verfügbar. Aber es gibt noch andere Geschenke!");
                $("form#schenken, .cookie, .cookie-data").addClass("hide");
            }else{
                $(".message.fail").html("Es sind nur noch "+res.anteile+" Anteile verfügbar.");
            }

        }else{
            $(".message.fail, form#schenken, .cookie, .cookie-data").addClass("hide");
            $(".message.success.hide").removeClass("hide");
            console.log(res.success + " | noch verfügbare Anteile: "+res.anteile);
        }
    });
};

// posts to endpoint
// attach browser fingerprint to data obj.
// executes callback on success if provided
function get(endpoint, data, cb) {
        $.post(endpoint, data, function (res) {
            cb && cb(); // <- execute callback
        });
}