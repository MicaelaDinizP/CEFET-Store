<?php

require_once("vendor/autoload.php");
require_once("./src/util/conexao-pdo.php");
require_once("./src/repositorios/repositorio-venda-em-pdo.php");
require_once("./src/modelos/venda.php");

describe("RepositorioVendaEmPDO", function() {
    beforeAll(function() {
        $this->pdo = conexaoPDO('cefet-shop');
        $this->repVendaPDO = new RepositorioVendaEmPDO($this->pdo);
        $this->idProduto = 3;
        $this->idUsuario = 1;
    });
    describe("checarEstoque", function() {
        it("deve retornar true quando a quantidade demandada for menor que a existente.", function() {
            $estoqueSuficiente = $this->repVendaPDO->checarEstoque(5, $this->idProduto);
            expect($estoqueSuficiente)->toBeTruthy();
         });
         it("deve retornar true quando a quantidade demandada for igual que a existente.", function() {
            $estoqueSuficiente = $this->repVendaPDO->checarEstoque(20, $this->idProduto);
            expect($estoqueSuficiente)->toBeTruthy();
         });
         it("deve retornar false quando a quantidade demandada for maior que a existente.", function() {
            $estoqueSuficiente = $this->repVendaPDO->checarEstoque(100, $this->idProduto);
            expect($estoqueSuficiente)->toBeFalsy();
         });
         it("deve retornar false quando a o id do produto não existir.", function() {
            $estoqueSuficiente = $this->repVendaPDO->checarEstoque(10, 70);
            expect($estoqueSuficiente)->toBeFalsy();
         });
    });
    describe("checarSaldo", function() {
        it("deve retornar true quando o saldo demandado for menor que o existente.", function() {
            $saldoSuficiente = $this->repVendaPDO->checarSaldo(100.00, $this->idUsuario);
            expect($saldoSuficiente)->toBeTruthy();
         });
         it("deve retornar true quando o saldo demandado for igual que o existente.", function() {
            $saldoSuficiente = $this->repVendaPDO->checarSaldo(400.00, $this->idUsuario);
            expect($saldoSuficiente)->toBeTruthy();
         });
         it("deve retornar false quando o saldo demandado for maior que o existente.", function() {
            $saldoSuficiente = $this->repVendaPDO->checarSaldo(600.00, $this->idUsuario);
            expect($saldoSuficiente)->toBeFalsy();
         });
         it("deve retornar false quando a o id do usuario não existir.", function() {
            $saldoSuficiente = $this->repVendaPDO->checarSaldo(10.00, 13);
            expect($saldoSuficiente)->toBeFalsy();
         });
    });
});

?>