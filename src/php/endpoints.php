<?php
date_default_timezone_set('UTC');

/**
 * PUBLIC API ENDPOINTS
 */
$app->get('/likes', function (\Symfony\Component\HttpFoundation\Request $req) use ($app) {
    $likes = DB::query('SELECT rezept, COUNT(*)*1100 as likes FROM likes GROUP BY rezept');
    foreach ($likes as &$like) {
        $like['likes'] = humanize($like['likes']);
    }
    return $app->json($likes);
});

/**
 * 'likes' a recipe, updates 'like' if fingerprint has already voted
 */
$app->post('/like', function (\Symfony\Component\HttpFoundation\Request $req) use ($app) {
    $fingerprint = $req->get('fingerprint');
    $rezept = $req->get('rezept');

    $res = DB::insertUpdate('likes', ['fingerprint' => $fingerprint, 'rezept' => $rezept]);
    $response = ['success' => $res];

    return $app->json($response);
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
