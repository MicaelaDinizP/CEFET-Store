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
            $produtos[] = [ 'totalPaginas' =>$this->calcularTotalPaginas( $pagina ), 'paginaAtual' => $pagina ];
            if( $produtos == null ){
                return $this->visaoProduto->exibirErro( 'Não há produtos para retornar.', 404 );
             }
            $this->visaoProduto->exibirSucesso( 200 );
            return $this->visaoProduto->produtosEmJson( $produtos );
        }catch( RepositorioProdutoException $e ){
            return $this->visaoProduto->exibirErro( "Não foi possível obter os produtos.", 500 );
        }   
    }
    public function obterPorNomeOuId(){
        try{
            $produtoDesejado = $this->visaoProduto->obterNomeOuId();
            if( $produtoDesejado == false ){
                return $this->visaoProduto->exibirErro( 'O produto desejado não é válido.', 400 );
            }
            $produtoCompleto = $this->repProdutos->obterPorNomeOuId( $produtoDesejado );
            if( $produtoCompleto == null ){
               return $this->visaoProduto->exibirErro( 'O produto desejado não existe.', 404 );
            }
            $this->visaoProduto->exibirSucesso( 200 );
            return $this->visaoProduto->produtosEmJson( $produtoCompleto );
        }catch(RepositorioProdutoException $e ){
           return $this->visaoProduto->exibirErro( "Não foi possível obter o produto desejado.", 500 );
        }
    }

    public function obterMaisVendidos(){
        try{
            $produtos = $this->repProdutos->obterMaisVendidos();
            if( $produtos == null ){
                return $this->visaoProduto->exibirErro( 'Não há produtos para retornar.', 404 );
             }
            $this->visaoProduto->exibirSucesso( 200 );
            return $this->visaoProduto->produtosEmJson( $produtos );
        }catch( RepositorioProdutoException $e ){
            return $this->visaoProduto->exibirErro( "Não foi possível obter os produtos mais vendidos.", 500 );
        }   
    }
    public function calcularTotalPaginas( $pagina ) {
        $totalProdutos = intval($this->repProdutos->obterTotalProdutos());
        return ceil($totalProdutos/REGISTROS_POR_PAGINA);
    }
    public function calcularDeslocamento( $pagina ){
        $deslocamento = REGISTROS_POR_PAGINA * ( $pagina - 1 );
        return $deslocamento;
    }
    
}

?>