<?php

/*
Form to CRM in Cloud
(c) 2019 TeamSystem S.p.a.
Details on https://github.com/CRM-in-Cloud
*/

$serverdomain = $_SERVER['HTTP_ORIGIN'];
// $serverdomain = "www.mydomainname.com";
/* use domain name instead of $_SERVER['HTTP_ORIGIN'] above */

$apiKey = "insert api key here";
/* Insert ApiKey generated from the CRM console */

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo "Method not authorized";
    die();
}

header("Access-Control-Allow-Origin: " . $serverdomain . "");
if ($_SERVER['HTTP_ORIGIN'] != $serverdomain)
{
    http_response_code(401);
    echo "Call not authorized";
    die();
}
$data = file_get_contents('php://input');
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,"https://api.crmincloud.it/latest/lead");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt($ch, CURLOPT_TIMEOUT,30);

$headers = [
'ApiKey: ' . $apiKey,
'Content-Type: application/json'
];

curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$result = curl_exec ($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close ($ch);

http_response_code($httpcode);
echo $result;

?>