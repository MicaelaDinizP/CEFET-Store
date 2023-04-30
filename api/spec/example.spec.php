<?php
describe("Exemplo de teste com Kahlan", function () {
    it("deve retornar a soma de dois números", function () {
        $a = 2;
        $b = 3;
        $soma = $a + $b;
        expect($soma)->toBe(5);
    });
});
?>
