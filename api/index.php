<?php

require_once('src/controladoras/controladora-produto.php');

$caminho = $_SERVER['REQUEST_URI'];
$rota = basename($caminho);
$metodo = $_SERVER['REQUEST_METHOD'];

$controladora = new ControladoraProduto();

if ($metodo === 'GET' && preg_match('/^produtos(\?pag=\d{1,5})?$/', $rota)) {
  $controladora->obterProdutos();
}else if( $metodo === 'GET' && preg_match('/^produto(?:\?id=\d+)?(?:[&\?]descricao=[^&]{1,255})?$/', $rota ) ) {
    $controladora->obterPorNomeOuId();
}else if( $metodo === 'GET' && preg_match('/^mais-vendidos$/i', $rota ) ){
    $controladora->obterMaisVendidos();
}else if($metodo === 'POST' && preg_match('/^login$/i', $rota)) {
  $controladoraUsuario->login();
}else if($metodo === 'GET' && preg_match('/^logout$/i', $rota)) {
  $controladoraUsuario->logout();  
}else{
  http_response_code(404);
  header('Content-Type: application/json;charset=utf-8');
  echo json_encode("Desculpe, o recurso que você está procurando não foi encontrado ou a requisição está inválida.");
}
?>