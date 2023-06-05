<?php
class ServicoUsuario {
    public function __construct() {}
 
    public function iniciarSessao() {
        session_name('cefetshop');
        session_start();
    }

    function iniciarSessaoLogin() {
        $this->iniciarSessao();
        session_regenerate_id(true);
        $_SESSION['logado'] = true;
    }

    public function salvarIdUsuario($id) {
        if( session_status() === PHP_SESSION_ACTIVE )
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

    function obterIdUsuario() {
        $this->iniciarSessao();
        return intval($_SESSION['id']);
    }
    
    function verificarSessao() {
        $this->iniciarSessao();
        if (session_status() === PHP_SESSION_ACTIVE && isset($_SESSION['id'], $_SESSION['logado'])) {
            return true;
        }
    }
}

?>