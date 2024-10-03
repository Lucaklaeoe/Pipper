<?php
    //headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: OPTIONS, GET, POST, PUT, DELETE");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $servername = "localhost:3306";
    $username = "root";

    //Get password from local env file
    require "../.env";
    $password = getenv("PASSWORD");

    //connect to the server
    try {
        $conn = new PDO("mysql:host=$servername;dbname=pipper", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } 
    catch(PDOException $e) {
        //fejlbesked
        echo "Connection failed: " . $e->getMessage();
    }

    if($requestMethod == "GET") {

    }

?>