<?php
require_once ('./src/modelos/venda.php');
interface RepositorioVenda{
    public function cadastrarVenda( Venda $venda, $idUsuario );
}

?>