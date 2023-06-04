<?php

require_once("./src/usuario.php");
class VisaoUsuario {
    private $dadosRequisicao;

    public function __construct() {
        $dadosRequisicao = file_get_contents('php://input');
        $this->dadosRequisicao = json_decode($dadosRequisicao);
    }

    public function usuarioEmJson($usuario) {
        echo json_encode($usuario);
        die();
    } 

    public function exibirSucesso($codigo) {
        http_response_code($codigo);
        header('Content-Type:application/json;charset=utf-8');
    }

    public function exibirErro($mensagem, $codigo) {
        http_response_code($codigo);
        header('Content-Type:application/json;charset=utf-8');
        echo json_encode($mensagem);
        die();
    }

    public function obterDadosLogin() {
        $usuario = null;
        $login = $this->dadosRequisicao->login;
        $senha = $this->dadosRequisicao->senha;
        if(isset($login, $senha)) {         
            $usuario = new Usuario(htmlspecialchars($login), null, htmlspecialchars($login), 
                htmlspecialchars($senha), 0, 0);
            return $usuario;
        }
        return null;
    }
}

?>