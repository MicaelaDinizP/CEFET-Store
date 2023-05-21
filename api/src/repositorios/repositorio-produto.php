<?php

require_once ('./src/modelos/produto.php');
interface RepositorioProduto{
    public function obterPagina( $limite, $deslocamento );
    public function obterPorNomeOuId( Produto $produto );
    public function obterMaisVendidos();

}


?>