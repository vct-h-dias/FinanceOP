<?php
ini_set("display_errors", 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-type: application/json');

$hostname = "localhost";
$user = "root";
$pass = "";
$database = "FINOP";
$conn = mysqli_connect($hostname, $user, $pass, $database);
if (!$conn) {
  die("Conexão falhou: " . mysqli_connect_error());
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  if (isset($_GET['user_id'])) {
    $user_id = $_GET['user_id'];

    $query = "SELECT * FROM transactions WHERE user_id='$user_id'";

    $result = mysqli_query($conn, $query);

    if ($result) {
      $transactions = array();

      while ($row = mysqli_fetch_assoc($result)) {
        $transactions[] = $row;
      }

      http_response_code(200);
      echo json_encode(array(
        'success' => true,
        'error' => null,
        'transactions' => $transactions
      ));
      exit();
    } else {
      http_response_code(500);
      echo json_encode(array(
        'success' => false,
        'error' => "Erro ao obter transações"
      ));
      exit();
    }
  } else {
    http_response_code(400);
    echo json_encode(array(
      'success' => false,
      'error' => "Campo 'user_id' ausente"
    ));
    exit();
  }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($data['user_id']) && isset($data['description']) && isset($data['value']) && isset($data['month'])) {
    $user_id = $data['user_id'];
    $description = $data['description'];
    $value = $data['value'];
    $month = $data['month'];

    $query = "INSERT INTO transactions (user_id, description, value, month) VALUES ('$user_id', '$description', '$value', '$month')";

    $res = mysqli_query($conn, $query);

    if ($res) {
      http_response_code(200);
      echo json_encode(array(
        'success' => true,
        'error' => null
      ));
      exit();
    } else {
      http_response_code(500);
      echo json_encode(array(
        'success' => false,
        'error' => "Erro ao cadastrar transação"
      ));
      exit();
    }
  } else {
    http_response_code(400);
    echo json_encode(array(
      'success' => false,
      'error' => "Campos obrigatórios ausentes"
    ));
    exit();
  }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
  if (isset($data['transaction_id'])) {
    $transaction_id = $data['transaction_id'];
    $updateFields = array();

    if (isset($data['description'])) {
      $description = $data['description'];
      $updateFields[] = "description='$description'";
    }

    if (isset($data['value'])) {
      $value = $data['value'];
      $updateFields[] = "value='$value'";
    }

    if (isset($data['month'])) {
      $month = $data['month'];
      $updateFields[] = "month='$month'";
    }

    if (empty($updateFields)) {
      http_response_code(400);
      echo json_encode(array(
        'success' => false,
        'error' => "Nenhum campo válido fornecido para atualização"
      ));
      exit();
    }

    $updateFieldsString = implode(', ', $updateFields);

    $query = "UPDATE transactions SET $updateFieldsString WHERE id='$transaction_id'";

    $res = mysqli_query($conn, $query);

    if ($res) {
      http_response_code(200);
      echo json_encode(array(
        'success' => true,
        'error' => null
      ));
      exit();
    } else {
      http_response_code(500);
      echo json_encode(array(
        'success' => false,
        'error' => "Erro ao atualizar transação"
      ));
      exit();
    }
  } else {
    http_response_code(400);
    echo json_encode(array(
      'success' => false,
      'error' => "Campo 'transaction_id' ausente"
    ));
    exit();
  }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
  if (isset($data['transaction_id'])) {
    $transaction_id = $data['transaction_id'];

    $query = "DELETE FROM transactions WHERE id='$transaction_id'";

    $res = mysqli_query($conn, $query);

    if ($res) {
      http_response_code(200);
      echo json_encode(array(
        'success' => true,
        'error' => null
      ));
      exit();
    } else {
      http_response_code(500);
      echo json_encode(array(
        'success' => false,
        'error' => "Erro ao excluir transação"
      ));
      exit();
    }
  } else {
    http_response_code(400);
    echo json_encode(array(
      'success' => false,
      'error' => "Campo 'transaction_id' ausente"
    ));
    exit();
  }
}
