<?php

class VisaoProduto{

    public function produtosEmJson( $produtos ) {
        return json_encode($produtos);
    } 

    public function exibirSucesso( $codigo ){
        http_response_code( $codigo );
        header('Content-Type:application/json;charset=utf-8');
    }

    public function exibirErro( $mensagem, $codigo ) {
        http_response_code( $codigo );
        header('Content-Type:application/json;charset=utf-8');
        return json_encode( $mensagem );
    }

    public function obterPaginaDesejada(){
        if( isset( $_GET['pag'] ) ) {
            return intval( htmlspecialchars($_GET['pag'] ) );
        }
        return 1;
    }

    public function obterNomeOuId() {
        $idRequisicao = 0;
        $nomeRequisicao = null;
        if( isset( $_GET['id'] ) ) {
            $idRequisicao = $_GET['id']; 
        }else if( isset( $_GET['descricao'] ) ){
            $nomeRequisicao = $_GET['descricao'];
        }else{
            return false;
        }
        return new Produto( $nomeRequisicao, null, null, null, null, null, null, null, null, $idRequisicao );
    }

}
?>