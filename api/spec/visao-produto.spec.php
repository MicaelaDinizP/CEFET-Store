<?php

require_once("vendor/autoload.php");
require_once("./src/visoes/visao-produto.php");
require_once("./src/modelos/produto.php");

describe( "VisaoProduto", function() {
    beforeAll(function () {
        $this->visao = new VisaoProduto();
    });
    describe("obterPaginaDesejada",function(){
        it( "deve retornar 1 caso a página desejada não tenha sido informada.", function() {
            $_GET = [];
            $pagina = $this->visao->obterPaginaDesejada();
            expect($pagina)->toBe(1); 
        });
        it( "deve retornar 2 caso a página desejada tenha sido informada como 2.", function() {
            $_GET = ['pag' => 2];
            $pagina = $this->visao->obterPaginaDesejada();
            expect($pagina)->toBe(2); 
        });
        it( "deve retornar 3 caso a página desejada tenha sido informada como string '3'.", function() {
            $_GET = ['pag' => "3"];
            $pagina = $this->visao->obterPaginaDesejada();
            expect($pagina)->toBe(3); 
        });
        it( "deve retornar 1 caso um valor inválido seja recebido.", function() {
            $_GET = ['pag' => "pagina3"];
            $pagina = $this->visao->obterPaginaDesejada();
            expect($pagina)->toBe(1); 
        });
    });
    describe("obterNomeOuId",function() {
        it( "deve retornar false caso nenhum dos dois parâmetros tenha sido informado.", function() {
            $_GET = [];
            $produto = $this->visao->obterNomeOuId();
            expect($produto)->toBeFalsy(); 
        });
        it( "deve retornar uma instância de produto com o id = 2 e descricao = null.", function() {
            $_GET = ['id'=>2 ];
            $produto = $this->visao->obterNomeOuId();
            expect($produto->getId())->toBe(2);
            expect($produto->getDescricao())->toBe(null); 
        });
        it( "deve retornar uma instância de produto com o id = 0 e descricao = 'Camisa'.", function() {
            $_GET = ['descricao'=>'Camisa' ];
            $produto = $this->visao->obterNomeOuId();
            expect($produto->getId())->toBe(0);
            expect($produto->getDescricao())->toBe('Camisa'); 
        });
        it( "deve retornar uma instância de produto com o id e descricao definidos.", function() {
            $_GET = ['id'=> 2,'descricao'=>'Camisa' ];
            $produto = $this->visao->obterNomeOuId();
            expect($produto->getId())->toBe(2);
            expect($produto->getDescricao())->toBe('Camisa'); 
        });
    });

});

?>