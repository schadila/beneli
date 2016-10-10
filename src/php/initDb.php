<?php

date_default_timezone_set('Europe/Zurich');

require_once('lib/silex/vendor/autoload.php');
require_once('lib/MeekroDB.php');

if (strpos($_SERVER["SERVER_NAME"], "appenzeller") !== false) {
    $env = "LIVE";

    // live-server!
    DB::$dbName = '';
    DB::$user = '';
    DB::$password = '';
    DB::useDB(DB::$dbName);

} else if (strpos($_SERVER["SERVER_NAME"], "contexta04.nine.ch")) {

    // dev/stage-server!
    $env = "DEV";
    DB::$dbName = 'stage-app-rezept';
    DB::$user = 'stage-app-rezept';
    DB::$password = 'stage-app-rezept';
    DB::useDB(DB::$dbName);

} else {

    // local-dev DOCKER
    $env = "LOCAL";

    DB::$host = $_ENV["DB_HOST"];
    DB::$user = $_ENV["DB_USER"];
    DB::$password =  $_ENV["DB_PASSWORD"];;
    DB::$dbName =  $_ENV["DB_DATABASE"];;
    DB::useDB(DB::$dbName);
}

session_start();