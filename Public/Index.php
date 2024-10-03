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
        exit;
    }

    //look at the url
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = explode( '/', $uri )[1];
    $uri = strtolower($uri);

    //call the right function
    if($requestMethod == "GET") {
        if($uri == "user") {
            echo json_encode(Getdata($conn, "ID, name, avatar"));
        }
        else if($uri == "data") {
            echo json_encode(Getdata($conn, ""));
        }
        else {
            echo json_encode(Getdata($conn, ""));
        }
    }
    else if($requestMethod == "POST") {
        echo json_encode(Postdata($conn));
    }
    else if($requestMethod == "PUT") {
        echo json_encode(Putdata($conn));
    }
    else if($requestMethod == "DELETE") {
        echo json_encode(Deletedata($conn));
    }

    //Getdata function
    //needs connection
    //obtional colums
    function Getdata(mixed $conn, string $colums) {
        //hvis du kun vil havde noget specifikt data
        if($colums == null || $colums == "") {
            $sql = "SELECT * FROM pipper_data";
        }
        else{
            $sql = "SELECT $colums FROM pipper_data";
        }
        
        //try to get data
        try{
            $statement = $conn->prepare($sql);
            $statement->execute();
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        }
        catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }

        return $results;
    }

    //Postdata function
    //needs connection
    function Postdata(mixed $conn) {
        $input = (array) json_decode(file_get_contents("php://input"), TRUE);

        //requierments
        if(!isset($input['name']) || trim($input['name']," ") == "") {
            return "name is requied";
        }
        if(!isset($input['content']) || trim($input['content']," ") == "") {
            return "content is requied";
        }

        //fail safe
        if(!isset($input['avatar'])) {
            $input['avatar'] = "";
        }
        if(!isset($input['created_at']) || $input['created_at'] == "") {
            $now = new DateTime();
            $input['created_at'] = $now->format('Y-m-d H:i:s'); 
        }
        if(!isset($input['like_count']) || $input['like_count'] == "") {
            $input['like_count'] = 0; 
        }

        $data = [
            'ID'         => "default",
            'name'       => $input['name'],
            'avatar'     => $input['avatar'],
            'content'    => $input['content'],
            'created_at' => $input['created_at'],
            'like_count' => 0
        ];

        $sql = "INSERT into pipper_data values (default, '" . $data['name'] . "','" . $data['avatar'] . "','" . $data['content'] . "','" . $data['created_at'] . "'," . $data['like_count'] . ")";

        //try to post
        try{
            $statement = $conn->prepare($sql);
            $statement->execute();

            //give the pip just created
            $id = $conn->lastInsertId();
            $current_pip = (object) $input;
            $current_pip->id = $id;

            return $current_pip;
        }
        catch(PDOException $e) {
            return "Connection failed: " . $e->getMessage();
        }
    }

    //Putdata function
    //needs connection
    function Putdata(mixed $conn) {
        $input = (array) json_decode(file_get_contents("php://input"), TRUE);
        $has_something_changed = 0;

        //requierments
        if(!isset($input['ID']) || $input['ID'] == "") {
            return "ID is requied";
        };

        $sql = "SELECT * FROM pipper.pipper_data where ID =" . $input['ID'];

        //try to get data
        try{
            $statement = $conn->prepare($sql);
            $statement->execute();
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        } 
        catch(PDOException $e) {
            return "Connection failed: " . $e->getMessage();
        }

        //fail safe
        if(!isset($input['avatar'])) {
            $input['avatar'] = $results[0]['avatar'];
            $has_something_changed++;
        }
        if(!isset($input['created_at']) || $input['created_at'] == "") {
            $now = new DateTime();
            $input['created_at'] = $now->format('Y-m-d H:i:s'); 
            $has_something_changed++;
        }
        if(!isset($input['like_count']) || $input['like_count'] == "") {
            $input['like_count'] = $results[0]['like_count']; 
            $has_something_changed++;
        }
        if(!isset($input['content']) || $input['content'] == "") {
            $input['content'] = $results[0]['content'];
            $has_something_changed++;
        }

        //name can not be changed and will therefore be ignored
        $input['name'] = $results[0]['name'];

        //has to change atleast 1 thing
        if($has_something_changed >= 4) {
            return "No changes made Please check your inputs"; 
        }

        $data = [
            'ID'         => $input['ID'],
            'name'       => $input['name'],
            'avatar'     => $input['avatar'],
            'content'    => $input['content'],
            'created_at' => $input['created_at'],
            'like_count' => 0
        ];

        $sql = "UPDATE pipper_data SET name = '" . $data['name'] . "', avatar = '" . $data['avatar'] . "', content = '" . $data['content'] . "', created_at = '" . $data['created_at'] . "', like_count = '" . $data['like_count'] . "' WHERE ID =" . $data['ID'];

        //try to update
        try{
            $statement = $conn->prepare($sql);
            $statement->execute();

            //give the pip just created
            $id = $conn->lastInsertId();
            $current_pip = (object) $input;
            $current_pip->id = $id;

            return $current_pip;
        }
        catch(PDOException $e) {
            return "Connection failed: " . $e->getMessage();
        }
    }

    //Deletedata function
    //needs connection
    function Deletedata(mixed $conn) {
        $input = (array) json_decode(file_get_contents("php://input"), TRUE);

        //requierments
        if(!isset($input['ID']) || $input['ID'] == "") {
            return "ID is requied";
        };

        $sql = "DELETE FROM pipper_data WHERE ID = " . $input['ID'];

        //try to delete
        try{
            $statement = $conn->prepare($sql);
            $statement->execute();
        }
        catch(PDOException $e) {
            return "Connection failed: " . $e->getMessage();
        }

        return "post deleted";
    }
?>