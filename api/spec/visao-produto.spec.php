<?php

require_once("vendor/autoload.php");
require_once("./src/visao-produto.php");
require_once("./src/produto.php");

describe( "VisaoProduto", function() {
    xit( "deve retornar uma string em JSON ao receber um array de objetos da classe produto", function() {
        $p = new Produto('Bone Turismo',24.99,'2022-01-01','produto em formato de bone', 10, 0, 'Bone','img',0,0);
        $produtos = [$p, $p, $p];        
        $produtosEmJson = new VisaoProduto();
        $produtosEmJson = $produtosEmJson->produtosEmJson( $produtos );
        expect( $produtosEmJson )->not->toBeFalsy();
        expect( json_decode( $produtosEmJson ) )->not->toBeNull();
    });
});


?>