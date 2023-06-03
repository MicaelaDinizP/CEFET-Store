<?php

require_once("vendor/autoload.php");
require_once("./src/modelos/produto.php");

describe("Produto", function(){
    beforeAll(function(){
        $this->produto = new Produto('descricao',100.00,'22-02-2023','detalhes',1,0,'categoria','imagem',null,1);
    });

    it("deve settar o precoDesconto igual ao precoVenda", function() {
        expect( $this->produto->getPrecoDesconto() )->toBe($this->produto->getPrecoDeVenda() );
    });

    it("deve calcular novamente o precoDesconto ao alterar a taxaDesconto", function() {
        $this->produto->setTaxaDesconto(10);
        expect( $this->produto->getPrecoDesconto() )->toBe( floatval(number_format(90.00, 2)) );
        $this->produto->setTaxaDesconto(0);
    });

    it("deve calcular novamente o precoDesconto ao alterar o precoVenda", function() {
        $this->produto->setPrecoDeVenda(300.0);
        expect( $this->produto->getPrecoDesconto() )->toBe( 300.00 );
        $this->produto->setPrecoDeVenda(100.0);
    });

    it("deve manter inalterado o precoComDesconto caso a taxaDesconto seja zero", function() {
        $this->produto->setTaxaDesconto(0);
        expect( $this->produto->getPrecoDesconto() )->toBe( 100.00 );
        $this->produto->setTaxaDesconto(0);
    });

    it("deve manter inalterado o precoComDesconto caso a taxaDesconto seja negativa", function() {
        $this->produto->setTaxaDesconto(-1);
        expect( $this->produto->getPrecoDesconto() )->toBe( 100.00 );
        $this->produto->setTaxaDesconto(0);
    });

    it("deve setar a taxaDesconto em zero caso seja passado um valor negativo", function() {
        $this->produto->setTaxaDesconto(-1);
        expect( $this->produto->getTaxaDesconto() )->toBe( 0 );
        $this->produto->setTaxaDesconto(0);
    });

});
    
//testar function de encoding
?>