<?php

require_once('./src/util/conexao-pdo.php');
require_once('./src/visoes/visao-produto.php');
require_once('./src/modelos/produto.php');
require_once('./src/exceptions/repositorio-produto-exception.php');
require_once('./src/repositorios/repositorio-produto-em-pdo.php');

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
               $this->visaoProduto->exibirErro( 'Não há produtos para retornar.', 404 );
             }
            $this->visaoProduto->exibirSucesso( 200 );
            $this->visaoProduto->produtosEmJson( $produtos );
        }catch( RepositorioProdutoException $e ){
            $this->visaoProduto->exibirErro( "Não foi possível obter os produtos.", 500 );
        }   
    }
    public function obterPorNomeOuId(){
        try{
            $produtoDesejado = $this->visaoProduto->obterNomeOuId();
            if( $produtoDesejado == false ){
                $this->visaoProduto->exibirErro( 'O produto desejado não é válido.', 400 );
            }
            $produtoCompleto = $this->repProdutos->obterPorNomeOuId( $produtoDesejado );
            if( $produtoCompleto == null ){
               $this->visaoProduto->exibirErro( 'O produto desejado não existe.', 404 );
            }
            $this->visaoProduto->exibirSucesso( 200 );
            $this->visaoProduto->produtosEmJson( $produtoCompleto );
        }catch(RepositorioProdutoException $e ){
           $this->visaoProduto->exibirErro( "Não foi possível obter o produto desejado.", 500 );
        }
    }

    public function obterMaisVendidos(){
        try{
            $produtos = $this->repProdutos->obterMaisVendidos();
            if( $produtos == null ){
                $this->visaoProduto->exibirErro( 'Não há produtos para retornar.', 404 );
             }
            $this->visaoProduto->exibirSucesso( 200 );
            $this->visaoProduto->produtosEmJson( $produtos );
        }catch( RepositorioProdutoException $e ){
            $this->visaoProduto->exibirErro( "Não foi possível obter os produtos mais vendidos.", 500 );
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