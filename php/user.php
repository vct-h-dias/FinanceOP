<?php
ini_set("display_errors", 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-type: application/json');

//building JSON
$json = file_get_contents('php://input');
$data = json_decode($json, true);

//conecting to DB 
$hostname = "localhost";
$user = "root";
$pass = ""; //local pass
$database = "FINOP";
$conn = mysqli_connect($hostname, $user, $pass, $database);
if (!$conn) {
  die("Conexão falhou: " . mysqli_connect_error());
}


//post route
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($data['email'])) {
    $email = $data['email'];

    $query = "SELECT * FROM USERS WHERE email='$email'";
    $res = mysqli_query($conn, $query);

    if ($res->num_rows) {
      http_response_code(409);
      echo json_encode(array(
        'sucess' => false,
        'error' => "Duplicate entity with email '$email'"
      ));
      exit();
    }
  } else {

    http_response_code(400);
    echo json_encode(array(
      'sucess' => false,
      'error' => "Missing 'email' field"
    ));
    exit();
  }

  if (isset($data['username'])) $username = $data['username'];
  else {

    http_response_code(400);
    echo json_encode(array(
      'sucess' => false,
      'error' => "Missing 'username' field"
    ));
    exit();
  }

  if (isset($data['password'])) $password = $data['password'];
  else {

    http_response_code(400);
    echo json_encode(array(
      'sucess' => false,
      'error' => "Missing 'password' field"
    ));
    exit();
  }

  $query = "INSERT INTO USERS (email, username, senha) VALUES ('$email', '$username', '$password')";

  $res = mysqli_query($conn, $query);

  if ($res) {
    $query = "SELECT id FROM USERS WHERE email='$email' AND senha='$password'";
    $res = mysqli_query($conn, $query);

    //caso o usuário tenha sido criado, use o id para criar todos os meses do ano
    $id = mysqli_fetch_assoc($res)['id'];

    for ($i = 1; $i <= 12; $i++) {
      $query = "INSERT INTO TRANSACTIONS (user_id, description, value, month) VALUES ('$id', 'Saldo inicial', 0, '$i')";
      $res = mysqli_query($conn, $query);
    }

    http_response_code(200);
    echo json_encode(array(
      'sucess' => true,
      'error' => null
    ));
    exit();
  }
}
