<?php

class VisaoProduto{

    public function produtosEmJson( $produtos ) {
        return json_encode($produtos);
    } 

    public function exibirSucesso( $codigo ){
        http_response_code( $codigo );
        header('Content-Type: application/json; charset=utf-8');
    }

    public function exibirErro( $mensagem, $codigo ) {
        http_response_code( $codigo );
        header('Content-Type: application/json');
        return json_encode( $mensagem );
    }

    public function obterPaginaDesejada(){
        if( isset( $_GET['pag'] ) ) {
            return intval( $_GET['pag'] );
        }
        return 1;
    }

}
?>

?>