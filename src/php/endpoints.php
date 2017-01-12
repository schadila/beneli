<?php
date_default_timezone_set('UTC');


/**
 * PUBLIC API ENDPOINTS
 */
$app->get('/getproduct', function (\Symfony\Component\HttpFoundation\Request $req) use ($app) {
    $product = DB::query('SELECT * FROM products WHERE id=%i', $req->get("product"));
    return $app->json($product);
});

$app->get('/gifts', function (\Symfony\Component\HttpFoundation\Request $req) use ($app) {
    $gifts = DB::query('SELECT * FROM products');
    return $app->json($gifts);
});

/**
 * 'likes' a recipe, updates 'like' if fingerprint has already voted
 */
$app->post('/addcard', function (\Symfony\Component\HttpFoundation\Request $req) use ($app) {

    $res = DB::insertUpdate('products', [
        'name' => $req->get('name'),
        'text' => $req->get('text'),
        'image' => $req->get('image'),
        'url' => $req->get('url'),
        'price' => $req->get('price'),
        'anteile' => $req->get('price')/10,
        'rest' => $req->get('price')/10,
        'partial' => $req->get('partial'),
        'type' => $req->get('type'),
        'active' => $req->get('active')
    ]);
    $response = ['success' => $res];

    return $app->json($response);
});

$app->post('/give', function (\Symfony\Component\HttpFoundation\Request $req) use ($app) {

    $rest = DB::query('SELECT rest FROM products WHERE id=%i', $req->get("product"));

    foreach ($rest as $row) {
        $abzug = $row['rest']-$req->get('anteile');

        if($abzug<0){

            $abzug = $row['rest'];

            $response = ['success' => false, 'anteile' => $abzug];
            return $app->json($response);

        }else{

            $res = DB::insertUpdate('submits', [
                'name' => $req->get('name'),
                'vorname' => $req->get('vorname'),
                'email' => $req->get('email'),
                'adresse' => $req->get('adresse'),
                'ort' => $req->get('ort'),
                'text' => $req->get('text'),
                'anteile' => $req->get('anteile'),
                'product' => $req->get('product')
            ]);

            $resupdate = DB::update('products', array(
                'rest' => $abzug
            ), 'id=%i', $req->get("product"));

            $response = ['success' => $res, 'anteile' => $abzug];
            return $app->json($response);
        }

    }
});


/**
 * inserts user infos into db
 */
$app->post('/teilnehmen', function (\Symfony\Component\HttpFoundation\Request $req) use ($app) {
    $fingerprint = $req->get('fingerprint');

    $res = DB::insertUpdate('teilnehmer',
        [
            'rezept' => $req->get('rezept'),

            'gender' => $req->get('gender'),
            'firstName' => $req->get('firstName'),
            'lastName' => $req->get('lastName'),

            'street' => $req->get('street'),
            'zip' => $req->get('zip'),
            'city' => $req->get('city'),

            'email' => $req->get('email'),
            'newsletter' => $req->get('newsletter'),

            'platform' => $req->get('platform'),

            'ip' => $req->getClientIp(),
            'fingerprint' => $fingerprint
        ],
        'fingerprint=%s', $fingerprint
    );

    $response = ['success' => true, 'result' => $res];
    return $app->json($response);

});


function humanize($num, $precision = 1) {
    if ($num >= 1000 && $num < 10000) {
        $n_format = number_format($num / 1000, $precision) . 'K';
    } else if ($num >= 10000 && $num < 100000) {
        $n_format = number_format($num / 1000, 0) . 'K';
    } else if ($num >= 1000000 && $num < 1000000000) {
        $n_format = number_format($num / 1000000, $precision) . 'M';
    } else if ($num >= 1000000000) {
        $n_format = number_format($num / 1000000000, $precision) . 'B';
    } else {
        $n_format = $num;
    }
    return $n_format;
}
