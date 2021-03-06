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
$app->get('/addcard', function (\Symfony\Component\HttpFoundation\Request $req) use ($app) {

//    require_once  "bulletproof.php";



//    $image = new Bulletproof\Image($file);
//    $image->setLocation("../img/upload/");
//
//    if($image){
//        $upload = $image->upload();
//
//        if($upload){
//            echo "erfolgreich";
//        }else{
//            echo $image["error"];
//        }
//    }

//    $f=$req->get('name');
//    var_dump("Test: ", $req->get('name'));
//    DIE;

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

$app->post('/editcard', function (\Symfony\Component\HttpFoundation\Request $req) use ($app) {

    $productdata = DB::query('SELECT * FROM products WHERE id=%i', $req->get("product"));

    foreach ($productdata as $row) {
        $price = $req->get('price')-$row['price'];
        $more = $price/10;
        $rest = $row['rest']+$more;
    }

    $product = $req->get('product');

    $res = DB::update('products', [
        'name' => $req->get('name'),
        'text' => $req->get('text'),
        'image' => $req->get('image'),
        'url' => $req->get('url'),
        'price' => $req->get('price'),
        'anteile' => $req->get('price')/10,
        'rest' => $rest,
        'partial' => $req->get('partial'),
        'type' => $req->get('type')
    ],'id=%i', $product);
    $response = ['success' => $res];

    return $app->json($response);
});

$app->get('/deletecard', function (\Symfony\Component\HttpFoundation\Request $req) use ($app) {
    $res = DB::delete('products', "id=%i", $req->get("product"));
    $response = ['success' => $res];
    return $app->json($response);
});

$app->get('/give', function (\Symfony\Component\HttpFoundation\Request $req) use ($app) {

    $rest = DB::query('SELECT * FROM products WHERE id=%i', $req->get("product"));

    foreach ($rest as $row) {

        $rest = $row['rest'];
        if($row['type']==0){
            $abzug = 0;
        }else{
            $abzug = $rest-$req->get('anteile');
        }

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
                'pay' => $req->get('pay'),
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
