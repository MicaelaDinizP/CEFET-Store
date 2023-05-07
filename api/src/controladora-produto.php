<?php

require_once('conexao-pdo.php');
require_once('visao-produto.php');
require_once('produto.php');
require_once('repositorio-produto-exception.php');
require_once('repositorio-produto-em-pdo.php');

CONST NOME_DO_BANCO = 'cefet-shop';
CONST REGISTROS_POR_PAGINA = 10;
class ControladoraProduto{
    private $visaoProduto;
    private $repProdutos;

    public function __construct(){
        $pdo = conexaoPDO( NOME_DO_BANCO );
        $this->visaoProduto = new VisaoProduto();
        $this->repProdutos = new RepositorioProdutoEmPDO( $pdo );
    }

    public function obterProdutos(){
        try{
            $pagina = $this->visaoProduto->obterPaginaDesejada();
            $deslocamento = $this->calcularDeslocamento( $pagina );
            $produtos = $this->repProdutos->obterPagina(REGISTROS_POR_PAGINA, $deslocamento);
            $this->visaoProduto->exibirSucesso( 200 );
            return $this->visaoProduto->produtosEmJson( $produtos );
        }catch( RepositorioProdutoException $e ){
            $this->visaoProduto->exibirErro( "Não foi possível obter os produtos.", 500 );
        }   
    }

    public function calcularDeslocamento( $pagina ){
        $deslocamento = REGISTROS_POR_PAGINA * $pagina;
        return $deslocamento;
    }

}

?>