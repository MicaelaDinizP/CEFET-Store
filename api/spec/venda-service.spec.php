<?php

require_once("vendor/autoload.php");
require_once("./src/venda-service.php");
require_once("./src/modelos/venda.php");
require_once("./src/modelos/produto.php");
require_once("./src/usuario-service.php");

describe("VendaService", function() {
    beforeAll(function() {
        $this->servicoVenda = new VendaService();
        $this->produtoUm = new Produto('descricao',100.00,'22-02-2023','detalhes',2,0,'categoria','imagem',null,1);
        $this->produtoDois = new Produto('descricao2',200.00,'22-03-2023','detalhes2',1,0,'categoria2','imagem2',null,2);
        $this->arrayProdutos = [];
        $this->arrayProdutos[] = $this->produtoUm;
        $this->arrayProdutos[] = $this->produtoDois;
        $this->usuario = new Usuario("123456","Meg","meg@email.com","12345",400.00,1);
        $this->idUsuario = 1;
    });
    describe("validarProdutosParaVenda", function() {
        it("deve retornar true ao enviar um array de produtos válido", function() {
            $produtosParaValidar = $this->arrayProdutos;
            $produtosValidos = $this->servicoVenda->validarProdutosParaVenda( $produtosParaValidar );
            expect($produtosValidos)->toBeTruthy();
        }); 
        it("deve retornar false ao enviar um array de produtos com quantidade null", function() {
            $produtoInvalido = $this->produtoUm;
            $produtoInvalido->setQuantidade(null);
            $arrayProdutos = $this->arrayProdutos;
            $arrayProdutos[] = $produtoInvalido;
            $produtosValidos = $this->servicoVenda->validarProdutosParaVenda($arrayProdutos);
            expect(count($arrayProdutos))->toBe(3);
            expect($produtosValidos)->toBeFalsy();
        });
        it("deve retornar false ao enviar um array de produtos com precoDeVenda null", function() {
            $produtoInvalido = $this->produtoUm;
            $produtoInvalido->setPrecoDeVenda(null);
            $arrayProdutos = $this->arrayProdutos;
            $arrayProdutos[] = $produtoInvalido;
            $produtosValidos = $this->servicoVenda->validarProdutosParaVenda($arrayProdutos);
            expect(count($arrayProdutos))->toBe(3);
            expect($produtosValidos)->toBeFalsy();
        });
        it("deve retornar false ao enviar um array de produtos com taxaDesconto null", function() {
            $produtoInvalido = $this->produtoUm;
            $produtoInvalido->setTaxaDesconto(null);
            $arrayProdutos = $this->arrayProdutos;
            $arrayProdutos[] = $produtoInvalido;
            $produtosValidos = $this->servicoVenda->validarProdutosParaVenda($arrayProdutos);
            expect(count($arrayProdutos))->toBe(3);
            expect($produtosValidos)->toBeFalsy();
        });
        it("deve retornar false ao enviar um array de produtos com id null", function() {
            $produtoInvalido = $this->produtoUm;
            $produtoInvalido->setId(null);
            $arrayProdutos = $this->arrayProdutos;
            $arrayProdutos[] = $produtoInvalido;
            $produtosValidos = $this->servicoVenda->validarProdutosParaVenda($arrayProdutos);
            expect(count($arrayProdutos))->toBe(3);
            expect($produtosValidos)->toBeFalsy();
        });
        it("deve retornar false ao enviar um array de produtos com quantidade igual a zero", function() {
            $produtoInvalido = $this->produtoUm;
            $produtoInvalido->setQuantidade(0);
            $arrayProdutos = $this->arrayProdutos;
            $arrayProdutos[] = $produtoInvalido;
            $produtosValidos = $this->servicoVenda->validarProdutosParaVenda($arrayProdutos);
            expect(count($arrayProdutos))->toBe(3);
            expect($produtosValidos)->toBeFalsy();
        });
        it("deve retornar false ao enviar um array de produtos com quantidade menor que zero", function() {
            $produtoInvalido = $this->produtoUm;
            $produtoInvalido->setQuantidade(-1);
            $arrayProdutos = $this->arrayProdutos;
            $arrayProdutos[] = $produtoInvalido;
            $produtosValidos = $this->servicoVenda->validarProdutosParaVenda($arrayProdutos);
            expect(count($arrayProdutos))->toBe(3);
            expect($produtosValidos)->toBeFalsy();
        });
        it("deve retornar false ao enviar um array de produtos com precoDeVenda igual a zero", function() {
            $produtoInvalido = $this->produtoUm;
            $produtoInvalido->setPrecoDeVenda(0.00);
            $arrayProdutos = $this->arrayProdutos;
            $arrayProdutos[] = $produtoInvalido;
            $produtosValidos = $this->servicoVenda->validarProdutosParaVenda($arrayProdutos);
            expect(count($arrayProdutos))->toBe(3);
            expect($produtosValidos)->toBeFalsy();
        });
        it("deve retornar false ao enviar um array de produtos com precoDeVenda menor que zero", function() {
            $produtoInvalido = $this->produtoUm;
            $produtoInvalido->setPrecoDeVenda(-20.00);
            $arrayProdutos = $this->arrayProdutos;
            $arrayProdutos[] = $produtoInvalido;
            $produtosValidos = $this->servicoVenda->validarProdutosParaVenda($arrayProdutos);
            expect(count($arrayProdutos))->toBe(3);
            expect($produtosValidos)->toBeFalsy();
        });
    });
    describe("montarVenda", function() {
        it("deve retornar uma instância de Venda ao enviar um array de produtos", function() {
            $this->servicoVenda->validarProdutosParaVenda( $this->arrayProdutos );
            $venda = $this->servicoVenda->montarVenda( $this->arrayProdutos );
            expect( $venda )->toBeAnInstanceOf('Venda');
        }); 
    });
}); 

?>