like = function (rezeptId) {
    var endpoint = "./php/API.php/like";
    var data = {'rezept': rezeptId};
    post(endpoint, data, getLikes);
};


teilnehmen = function (onSubmit) {
    var endpoint = "./php/API.php/teilnehmen";

    var gender = $("input[name='anrede']:checked").val();
    var firstName = $("input[name='vorname']").val();
    var lastName = $("input[name='nachname']").val();
    var street = $("input[name='street']").val();
    var zip = $("input[name='zip']").val();
    var city = $("input[name='ort']").val();
    var email = $("input[name='email']").val();
    var newsletter = $("input[name='newsletter_abo']:checked").val();
    if(!newsletter){
        newsletter = 0;
    }
    var rezept = $("input[name='rezept']").val();
    var platform = $("input[name='platform']:checked").val();

    var data = {
        'gender': gender,
        'firstName': firstName,
        'lastName': lastName,
        'street': street,
        'zip': zip,
        'city': city,
        'email': email,
        'newsletter': newsletter,
        'rezept': rezept,
        'platform': platform
    };

    post(endpoint, data, onSubmit);
};

// posts to endpoint
// attach browser fingerprint to data obj.
// executes callback on success if provided
function post(endpoint, data, cb) {
    new Fingerprint2().get(function (fp) {
        data.fingerprint = fp;
        $.post(endpoint, data, function (res) {
            cb && cb(); // <- execute callback
        });
    });

}