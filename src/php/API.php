<?php
require_once "initDb.php";

// CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header("Access-Control-Allow-Headers: X-Requested-With");

use Symfony\Component\HttpFoundation\Response;
$app = new Silex\Application();

// show errors only on dev system
$isDev = ($env === "DEV" || $env === "LOCAL");
$app['debug'] = $isDev;
DB::$throw_exception_on_error = $isDev;
DB::$error_handler = false;

include_once "endpoints.php";

$app->run();