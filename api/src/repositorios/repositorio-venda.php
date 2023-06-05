<?php
require_once ('./src/modelos/venda.php');
interface RepositorioVenda{
    public function cadastrarVenda( Venda $venda, $idUsuario );
    public function obterVendasPorIdUsuario( $idUsuario );
    public function checarEstoque($quantidadeDemandada, $idProduto);
    public function checarSaldo($saldoDemandado, $idUsuario);

}

?>