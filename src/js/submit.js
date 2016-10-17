like = function (rezeptId) {
    var endpoint = "/php/API.php/like";
    var data = {'rezept': rezeptId};
    post(endpoint, data, getLikes);
};


teilnehmen = function (onSubmit) {
    var endpoint = "/php/API.php/teilnehmen";
    var data = {
        'gender': "",
        'firstName': "",
        'lastName': "",
        'street': "",
        'zip': "",
        'city': "",
        'email': ""
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
            console.log(res);
            cb && cb(); // <- execute callback
        });
    });

}