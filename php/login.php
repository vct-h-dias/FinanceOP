<?php
  ini_set("display_errors", 1);
  error_reporting(E_ALL);
  echo '<pre>Inicio da script PHP</pre>';

  $email = $_GET['email'];
  $senha = $_GET['password'];

  echo '<pre>Usuário logado</pre>';
