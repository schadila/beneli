<?php
date_default_timezone_set('UTC');

function isBlacklisted($ip, $fingerprint, $code) {
    DB::insert('ipLog', ['ip' => $ip, 'fingerprint' => $fingerprint, 'code' => $code, 'time' => new DateTime()]);

    $onBlacklist = DB::queryFirstRow('SELECT *  FROM ipBlacklist WHERE (ip = %s OR fingerprint = %s) AND `time` >= DATE_SUB(NOW(),INTERVAL 3 HOUR)', $ip, $fingerprint);
    if ($onBlacklist) {
        DB::update('ipBlacklist', ['time' => new DateTime()], 'id=%i', $onBlacklist['id']);
        return true;
    }

    $maxRequestsPerMinute = 20;
    $requestsLastMinute = DB::queryFirstRow('SELECT COUNT(*) AS `count` FROM ipLog WHERE (ip = %s OR fingerprint = %s) AND `time` >= DATE_SUB(NOW(),INTERVAL 1 MINUTE)', $ip, $fingerprint);
    $tooManyRequests = (bool)($requestsLastMinute['count'] >= $maxRequestsPerMinute);
    if ($tooManyRequests) {
        // blacklist the sucker
        DB::insert('ipBlacklist', ['ip' => $ip, 'time' => new DateTime(), "fingerprint" => $fingerprint]);
        return true;
    }

    return false;
}


/**
 * PUBLIC API ENDPOINTS
 */
// http://localhost:9000/php/API.php/validate/111111
$app->get('/validate/{code}/{fingerprint}', function ($code, $fingerprint, \Symfony\Component\HttpFoundation\Request $req) use ($app) {

    $hasTimeslots = DB::queryFirstRow('SELECT * FROM timeslots WHERE `start` < NOW() AND `end` > NOW()');
    if (!$hasTimeslots) generateTimeslots(false);

    // check for excessive access and blacklist
    if (isBlacklisted($req->getClientIp(), $fingerprint, $code)) {
        $until = new DateTime();
        $until->add(new DateInterval('PT3H'));
        return $app->json(['error' => 'blacklisted-until: ' . $until->format('Y-m-d H:i:s')]);
    };

    $result = DB::queryFirstRow('SELECT * FROM codes WHERE code = %s', $code);
    $response = [
        'code' => $code,
        'isValid' => (bool)$result
    ];

    if ($result) {
        $priceClaimed = DB::queryFirstRow('SELECT * FROM teilnehmer WHERE code = %s', $code);
        if ($priceClaimed) {
            // price was already claimed, exit with error
            $response['price'] = $result['price'];
            $response['error'] = 'price-already-claimed';
        } else if (isset($result['price'])) {
            // price was already assigned to code, return price
            $response['price'] = $result['price'];
        } else {
            $hasTimeslots = DB::queryFirstRow('SELECT * FROM timeslots WHERE `start` < NOW() AND `end` > NOW()');
            if (!$hasTimeslots) generateTimeslots(false);

            $timeslot = DB::queryFirstRow('SELECT * FROM timeslots WHERE `start` < NOW() AND `end` > NOW() ORDER BY `start` DESC LIMIT 1');
            // assign a price if $firstInTimeslot
            $firstInTimeslot = ($timeslot && !$timeslot['price']);
            if ($firstInTimeslot) {
                // get price, remove price from inventory
                $p = getPrice();
                // mark timeslot closed
                DB::update('timeslots', ['price' => $p], 'id=%i', $timeslot['id']);
                // re-generate timeslots for remaining prices starting at end of current period
                generateTimeslots($timeslot["end"]);
            } else {
                // no win, sadface
                $p = 0;
            }
            $response['price'] = $p;
            DB::update('codes', ['price' => $p, 'codeUsed' => new DateTime()], 'code=%s', $code);
        }
    }

    return $app->json($response);
})->value('code', false); // default value

