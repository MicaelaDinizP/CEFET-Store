<?php

require_once("./src/usuario.php");
interface RepositorioUsuario {
    public function login(Usuario $usuario);
}

?>