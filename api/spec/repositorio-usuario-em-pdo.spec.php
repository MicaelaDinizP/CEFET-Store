<?php

require_once("vendor/autoload.php");
require_once("./src/util/conexao-pdo.php");
require_once("./src/repositorios/repositorio-usuario-em-pdo.php");
require_once("./src/usuario.php");

describe("RepositorioUsuarioEmPDO", function() {
    beforeAll(function() {
        $this->pdo = conexaoPDO('cefet-shop');
        $this->repUsuarioPDO = new RepositorioUsuarioEmPDO($this->pdo);
        $this->usuario = new Usuario("123456","Meg","meg@email.com","12345",400.00,1);
        $this->idUsuario = 1;
    });
    describe("login", function(){
        it("deve retornar um objeto de usuario ao enviar uma senha válida", function() {
            $usuario = $this->repUsuarioPDO->login($this->usuario);
             expect($usuario)->toBeAnInstanceOf('Usuario');
         });
         it("deve retornar false ao enviar uma senha inválida", function() {
            $this->usuario->setSenha("111111");
            $usuario = $this->repUsuarioPDO->login($this->usuario);
             expect($usuario)->toBeFalsy();
             $this->usuario->setSenha("12345");
         });
         it("deve retornar null ao enviar uma matrícula e email inválidos", function() {
            $this->usuario->setMatricula("1");
            $this->usuario->setEmail("rrrr@rmail.com");
            $usuario = $this->repUsuarioPDO->login($this->usuario);
             expect($usuario)->toBe(null);
             $this->usuario->setMatricula("123456");
             $this->usuario->setEmail("meg@email.com");
         });
         it("deve retornar um objeto de usuario ao enviar uma matrícula inválida e email válido", function() {
            $this->usuario->setMatricula("1");
            $usuario = $this->repUsuarioPDO->login($this->usuario);
             expect($usuario)->toBeAnInstanceOf('Usuario');
             $this->usuario->setMatricula("123456");
         });
         it("deve retornar um objeto de usuario ao enviar uma matrícula válida e email inválido", function() {
            $this->usuario->setEmail("rrrr@rmail.com");
            $usuario = $this->repUsuarioPDO->login($this->usuario);
             expect($usuario)->toBeAnInstanceOf('Usuario');
             $this->usuario->setEmail("meg@email.com");
         });
         it("deve retornar um objeto de usuario com todos os campos preenchidos corretamente", function() {
            $usuarioParaLogin = new Usuario("123456", null, "123456", "12345", null, 0.00); 
            $usuarioObtido = $this->repUsuarioPDO->login($usuarioParaLogin);
            expect($usuarioObtido->getMatricula())->toBe("123456");
            expect($usuarioObtido->getNome())->toBe("Meg");
            expect($usuarioObtido->getEmail())->toBe("meg@email.com");
            expect($usuarioObtido->getSenha())->toBe("12345");
            expect($usuarioObtido->getSaldo())->toBe(400.00);
            expect($usuarioObtido->getId())->toBe(1);
         });
    });
    describe("obterPorId", function() {
        it("deve retornar um objeto de usuario ao enviar um id de usuário válido", function() {
            $usuario = $this->repUsuarioPDO->obterPorId($this->idUsuario);
             expect($usuario)->toBeAnInstanceOf('Usuario');
         });
         it("deve retornar null ao enviar um id de usuário inválido", function() {
            $usuario = $this->repUsuarioPDO->obterPorId(0);
             expect($usuario)->toBe(null);
         });
         it("deve retornar um objeto de usuario com todos os campos preenchidos corretamente", function() {
            $usuarioObtido = $this->repUsuarioPDO->obterPorId($this->idUsuario);
            expect($usuarioObtido->getMatricula())->toBe("123456");
            expect($usuarioObtido->getNome())->toBe("Meg");
            expect($usuarioObtido->getEmail())->toBe("meg@email.com");
            expect($usuarioObtido->getSenha())->toBe("\$2y\$10\$wvFSnLEh8CIou5spiT5W6.8R2j1iH1UD/ekaMGKR7hvOErYUKHkJO");
            expect($usuarioObtido->getSaldo())->toBe(400.00);
            expect($usuarioObtido->getId())->toBe(1);
         });
    });
});

?>