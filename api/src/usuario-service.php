<?php
class ServicoUsuario {
    public function __construct() {}
 
    public function iniciarSessao() {
        session_name('cefetshop');
        session_start();
    }

    public function salvarIDUsuario($id) {
        // $this->iniciarSessao();
        $_SESSION['id'] = $id;
    }

    public function destruirSessao() {
        $this->iniciarSessao();
        unset($_SESSION['id']);
        unset($_SESSION['logado']);
        session_destroy();
    }

    public function ajustarObjetoParaLogin( &$usuario ) {
        $usuario->setSenha(null);
        $usuario->setEmail(null);
    }
}

?>