<?php

require_once("./src/util/conexao-pdo.php");
require_once("./src/usuario.php");
require_once("./src/usuario-service.php");
require_once("./src/exceptions/repositorio-usuario-exception.php");
require_once("./src/repositorios/repositorio-usuario-em-pdo.php");
require_once("./src/visoes/visao-usuario.php");

class ControladoraUsuario {
    private $repUsuario;
    private $visaoUsuario;
    private $servicoUsuario;
    public function __construct() {
        $pdo = conexaoPDO('cefet-shop');
        $this->repUsuario = new RepositorioUsuarioEmPDO($pdo);
        $this->visaoUsuario = new VisaoUsuario();
        $this->servicoUsuario = new ServicoUsuario();
    }
    public function login() {
        try{
            $usuario = $this->visaoUsuario->obterDadosLogin();
            if($usuario === null) {
                $this->visaoUsuario->exibirErro("Os dados de login não foram informados corretamente.", 400);
            }
            $usuario = $this->repUsuario->login($usuario);
            if($usuario === null || $usuario === false) {
                $this->visaoUsuario->exibirErro("As credenciais são inválidas.", 401);
            }
            $this->servicoUsuario->ajustarObjetoParaLogin($usuario);
            $this->servicoUsuario->iniciarSessaoLogin();
            $this->servicoUsuario->salvarIdUsuario($usuario->getId());
            $this->visaoUsuario->exibirSucesso(200);
            $this->visaoUsuario->usuarioEmJson($usuario);
        }catch(RepositorioUsuarioException $e) {
            $this->visaoUsuario->exibirErro("Não foi possível obter o login.", 500);
        }
    }
    public function logout() {
            $this->servicoUsuario->destruirSessao();
            $this->visaoUsuario->exibirSucesso(200);
    }
}

?>