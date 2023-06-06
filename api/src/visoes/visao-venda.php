<?php

require_once('./src/modelos/produto.php');
require_once('./src/modelos/venda.php');
class VisaoVenda {
    private $dadosRequisicao;
    public function __construct() {
        $dadosRequisicao = file_get_contents('php://input');
        $this->dadosRequisicao = json_decode($dadosRequisicao);
    }
    public function vendasEmJson( $vendas ) {
        echo json_encode($vendas);
        die();
    }
    public function obterProdutosParaVenda(){
        $produtos = null;
        if( isset( $this->dadosRequisicao->produtos ) ) {
              $produtos = $this->criarArrayProdutos( $this->dadosRequisicao->produtos );
        }
        return $produtos;
    }
    private function criarArrayProdutos( $arrayProdutos ) {
        $produtos = [];
        foreach( $arrayProdutos as $p ) {
            $produtos[] = new Produto( null, $p->precoDeVenda, null, null, $p->quantidadeSelecionada
            , $p->taxaDesconto, null,
                null, null, $p->id );
        }
        return $produtos;
    }
    public function obterIdUsuarioComprador(){
        $idUsuario = null;
        if( isset( $this->dadosRequisicao->idUsuario ) ) {
              $idUsuario = intval( $this->dadosRequisicao->idUsuario );
        }
        return $idUsuario;
    }
    public function exibirSucesso( $codigo ){
        http_response_code( $codigo );
        header('Content-Type:application/json;charset=utf-8');
    }

    public function exibirErro( $mensagem, $codigo ) {
        http_response_code( $codigo );
        header('Content-Type:application/json;charset=utf-8');
        echo json_encode( $mensagem );
        die();
    }
}

?>