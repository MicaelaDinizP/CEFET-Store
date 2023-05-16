<?php

require_once('src/controladora-produto.php');

$caminho = $_SERVER['REQUEST_URI'];
$rota = basename($caminho);
$metodo = $_SERVER['REQUEST_METHOD'];

$controladora = new ControladoraProduto();

if ($metodo === 'GET' && preg_match('/^produtos(\?pag=\d{1,5})?$/', $rota)) {
  $produtos = $controladora->obterProdutos();
  echo $produtos;
}else if( $metodo === 'GET' && preg_match('/^produto(?:\?id=\d+)?(?:[&\?]descricao=[^&]{1,255})?$/', $rota ) ) {
    $produto = $controladora->obterPorNomeOuId();
    echo $produto;
}else if( $metodo === 'GET' && preg_match('/^mais-vendidos$/i', $rota ) ){
    $produtos = $controladora->obterMaisVendidos();
    echo $produtos;
}else{
  http_response_code(404);
  header('Content-Type: application/json;charset=utf-8');
  echo json_encode("Desculpe, o recurso que você está procurando não foi encontrado ou a requisição está inválida.");
}
?>