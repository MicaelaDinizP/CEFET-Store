<?php

require_once ('produto.php');
interface RepositorioProduto{
    public function obterPagina( $pagina, $qtdRegistros );
    public function obterPorNomeOuId( Produto $produto );
    public function obterMaisVendidos();

}


?>