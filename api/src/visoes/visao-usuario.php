<?php

require_once("./src/usuario.php");
class VisaoUsuario {
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
        if(isset($_POST['login']) && isset($_POST['senha'])) {
            $login = htmlspecialchars($_POST['login']);
            $senha = htmlspecialchars($_POST['senha']);
            $usuario = new Usuario($login,null,$login,$senha,0,0);
            return $usuario;
        }
        return null;
    }
}

?>