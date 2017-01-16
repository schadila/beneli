<?php

date_default_timezone_set('Europe/Zurich');

require_once('lib/silex/vendor/autoload.php');
require_once('lib/MeekroDB.php');



if (strpos($_SERVER["SERVER_NAME"], "web404.login-47.hoststar.ch") !== FALSE) {

  $env = "LIVE";
  // live-server!
  DB::$dbName = 'beneli';
  DB::$user = 'web404';
  DB::$password = 'swcfE8dejx';
  DB::useDB(DB::$dbName);

}
elseif (strpos($_SERVER["SERVER_NAME"], "contexta04.nine.ch")) {

  // dev/stage-server!
  $env = "DEV";
  DB::$dbName = 'beneli';
  DB::$user = 'beneli';
  DB::$password = 'beneli';
  DB::useDB(DB::$dbName);
    echo $_SERVER["SERVER_NAME"];

}
else {
  // local-dev DOCKER
  $env = "LOCAL";

  DB::$host = $_ENV["DB_HOST"];
  DB::$user = $_ENV["DB_USER"];
  DB::$password = $_ENV["DB_PASSWORD"];;
  DB::$dbName = $_ENV["DB_DATABASE"];;
  DB::useDB(DB::$dbName);
}

session_start();