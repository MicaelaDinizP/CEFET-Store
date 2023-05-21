<?php

use Kahlan\Code\Code;

require_once("vendor/autoload.php");
require_once("./src/util/conexao-pdo.php");

describe("conexaoPDO", function(){
    it("deve criar a conexão corretamente ao enviar o nome cefet-shop.", function() {
        $pdo = conexaoPDO('cefet-shop');
        expect($pdo)->toBeAnInstanceOf('PDO');
    });
    it("deve lançar PDOException ao enviar o nome de banco de dados inválido.", function() {
        $lancaPdoException = function(){
            conexaoPDO('lazaro');
        };
        expect($lancaPdoException)->toThrow(new PDOException("SQLSTATE[HY000] [1049] Unknown database 'lazaro'", 1049));
    });

});


?>