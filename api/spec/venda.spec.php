<?php

require_once("vendor/autoload.php");
require_once("./src/modelos/venda.php");
require_once("./src/modelos/produto.php");

describe("Venda", function(){
    beforeAll(function(){
        $this->produto = new Produto('descricao',100.00,'22-02-2023','detalhes',2,0,'categoria','imagem',null,1);
        $this->venda = new Venda('2023-01-01');
        $classeReflexao = new ReflectionClass('Venda');
        $propriedadeReflexao = $classeReflexao->getProperty('itensVenda');
        $propriedadeReflexao->setAccessible(true);
        $propriedadeReflexao->setValue($this->venda, [$this->produto] );
    });
    describe("adicionarItemVenda", function(){
        it("deve adicionar o produto ao array de itensVenda.", function(){
           $produtoParaAdicionar = new Produto( 'descricao2',250.00,'22-02-2023','detalhes',3,0,'categoria','imagem',null,2);
           $adicionado = $this->venda->adicionarItemVenda( $produtoParaAdicionar );
           expect( count($this->venda->getItensVenda()) )->toBe(2);
           expect( $adicionado )->toBeTruthy();
        });
        it("deve incrementar a quantidade do produto ao receber duplicata.", function(){
           $adicionado = $this->venda->adicionarItemVenda( $this->produto );
            expect( count($this->venda->getItensVenda()) )->toBe(2);
            expect( $this->venda->getItensVenda()[0]->getQuantidade() )->toBe(4);
            expect( $adicionado )->toBeTruthy();
         });
    });
    describe("calcularValorVenda", function(){
        it("deve retornar o atributo venda com o valor correspondente às quantidades dos itens.", function(){
            $valorTotal = 0.0;
            foreach( $this->venda->getItensVenda() as $v ){
                $valorTotal += $v->getPrecoDesconto() * $v->getQuantidade();
            }
           expect( $this->venda->getValorTotal() )->toBe( $valorTotal );
        });
        it("deve calcular corretamente o valorTotal com taxa de desconto maior que zero.", function(){
            $produto = new Produto( 'descricao3',100.00,'22-02-2023','detalhes',1,10,'categoria','imagem',null,3);
            $adicionado = $this->venda->adicionarItemVenda( $produto );
            $valorTotal = 0.0;
            foreach( $this->venda->getItensVenda() as $v ){
                $valorTotal += $v->getPrecoDesconto() * $v->getQuantidade();
            }
            expect($this->venda->getValorTotal())->toBe($valorTotal);
            expect( $adicionado )->toBeTruthy();
        });
    });
});

?>