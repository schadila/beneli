$(document).ready(getLikes);

/**
 * get like-count from server,
 * display in DOM
 */
function getLikes() {
    var endpoint = "./php/API.php/likes";
    $.get(endpoint, function (res) {
        $('.teaser-image[data-index] .likes').text(0);
        res.length && res.forEach(function (like) {
            $('.teaser-image[data-index="' + like.rezept + '"] .likes').text(like.likes);
        });
    });
}

