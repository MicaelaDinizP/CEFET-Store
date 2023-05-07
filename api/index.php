<?php

require_once('src/controladora-produto.php');

$caminho = $_SERVER['REQUEST_URI'];
$rota = basename($caminho);
$metodo = $_SERVER['REQUEST_METHOD'];

$controladora = new ControladoraProduto();

if ($metodo === 'GET' && preg_match('/^produtos$/i', $rota)) {
  $produtos = $controladora->obterProdutos();
  echo $produtos;
  die();
}

?>