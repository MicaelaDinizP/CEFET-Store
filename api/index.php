<?php

require_once('src/controladoras/controladora-produto.php');
require_once('src/controladoras/controladora-venda.php');

$caminho = $_SERVER['REQUEST_URI'];
$rota = basename($caminho);
$metodo = $_SERVER['REQUEST_METHOD'];

$controladoraProduto = new ControladoraProduto();
$controladoraVenda = new ControladoraVenda();

if ($metodo === 'GET' && preg_match('/^produtos(\?pag=\d{1,5})?$/', $rota)) {
  $controladoraProduto->obterProdutos();
}else if( $metodo === 'GET' && preg_match('/^produto(?:\?id=\d+)?(?:[&\?]descricao=[^&]{1,255})?$/', $rota ) ) {
  $controladoraProduto->obterPorNomeOuId();
}else if( $metodo === 'GET' && preg_match('/^mais-vendidos$/i', $rota ) ){
  $controladoraProduto->obterMaisVendidos();
}else if( $metodo === 'POST' && preg_match('/^finalizar-venda$/i', $rota ) ){
  $controladoraVenda->cadastrarVenda();
}else{
  http_response_code(404);
  header('Content-Type: application/json;charset=utf-8');
  echo json_encode("Desculpe, o recurso que você está procurando não foi encontrado ou a requisição está inválida.");
}

?>