<?php
ini_set("display_errors", 1);
error_reporting(E_ALL);

$hostname = "localhost"; 
$user = "root";
$password = "";
$database = "FINOP";
$conn = mysqli_connect($hostname, $user, $password, $database);
if (!$conn) {
  die("Conexão falhou: ".mysqli_connect_error());
}

$email = $_GET['email'];
$senha = $_GET['password'];
$username = $_GET['username'];

$query = "INSERT INTO USERS (email, username, senha) VALUES ('$email', '$username', '$senha')";

$res = mysqli_query($conn, $query);

header("Location: http://127.0.0.1:5500/");
exit();

?>
