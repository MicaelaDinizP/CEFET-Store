<?php 
require_once("vendor/autoload.php");
require_once("./src/repositorio-produto-em-pdo.php");
require_once("./src/produto.php");

describe("RepositorioProdutoEmPDO", function(){
    beforeAll(function(){
        $this->pdo = conexaoPDO('cefet-shop');
        $this->repProdPDO = new RepositorioProdutoEmPDO( $this->pdo );
        $this->limite = 10;
        $this->deslocamento = 0;
    });

    it("deve retornar um array de produtos", function() {
       $produtos = $this->repProdPDO->obterPagina($this->limite, $this->deslocamento);
        expect( $produtos )->toBeAn('Array');
    });

    it("deve retornar um array contendo objetos do tipo Produto", function() {
        $produtos = $this->repProdPDO->obterPagina($this->limite, $this->deslocamento);
        $produto = reset( $produtos );
         expect( $produto )->toBeAnInstanceOf('Produto');
     });

     it("deve retornar um array que não esteja vazio", function() {
        $produtos = $this->repProdPDO->obterPagina($this->limite, $this->deslocamento);
         expect( count( $produtos ) )->not->toBe(0);
     });

     it("deve retornar registros 11 ao 20 quando o limite e deslocamento for igual a 10", function() {
        $produtos = $this->repProdPDO->obterPagina(10,10);
        $primeiroProduto = reset($produtos);
        $ultimoProduto = end($produtos);
         expect( count( $produtos ) )->toBe(10);
         expect($primeiroProduto->getId())->toBe(11);
         expect($ultimoProduto->getId())->toBe(20);
     });

});


?>