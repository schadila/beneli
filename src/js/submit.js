like = function (rezeptId) {
    var endpoint = "./php/API.php/like";
    var data = {'rezept': rezeptId};
    post(endpoint, data, getLikes);
};


teilnehmen = function (onSubmit) {
    var endpoint = "./php/API.php/addcard";

    var active = $("input[name='active']:checked").val();
    var name = $("input[name='name']").val();
    var text = $("textarea[name='desc']").val();
    var image = $("input[name='image']").val();
    var url = $("input[name='url']").val();
    var price = $("input[name='price']").val();
    var anteile = $("input[name='anteile']").val();
    var partial = $("input[name='partial']:checked").val();
    var type = $("input[name='type']:checked").val();
    if(!type){
        type = 0;
    }
    if(!partial){
        partial = 0;
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

    post(endpoint, data, onSubmit);
};

// posts to endpoint
// attach browser fingerprint to data obj.
// executes callback on success if provided
function post(endpoint, data, cb) {
        $.post(endpoint, data, function (res) {
            cb && cb(); // <- execute callback
        });
}