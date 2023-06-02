<?php

class Usuario implements JsonSerializable {
    private $id;
    private $matricula;
    private $nome;
    private $email;
    private $senha;
    private $saldo;
    public function __construct($matricula, $nome, $email, $senha, $saldo, $id = 0) {
        $this->id = $id;
        $this->matricula = $matricula;
        $this->nome = $nome;
        $this->email = $email;
        $this->senha = $senha;
        $this->saldo = $saldo;
    }
    public function jsonSerialize() {
        $json = [];
        if(isset($this->id) || $this->id !== 0 ) {
            $json['id'] = $this->id;
        }
        if(isset($this->matricula)) {
            $json['matricula'] = $this->matricula;
        }
        if(isset($this->nome)) {
            $json['nome'] = $this->nome;
        }
        if(isset($this->email)) {
            $json['email'] = $this->email;
        }
        if(isset($this->senha)) {
            $json['senha'] = $this->senha;
        }
        if(isset($this->saldo)) {
            $json['saldo'] = $this->saldo;
        }
        return $json;
    }
    public function getMatricula() {
        return $this->matricula;
    }    
    public function setMatricula($matricula) {
        $this->matricula = $matricula;
    }    
    public function getNome() {
        return $this->nome;
    }    
    public function setNome($nome) {
        $this->nome = $nome;
    }    
    public function getEmail() {
        return $this->email;
    }    
    public function setEmail($email) {
        $this->email = $email;
    }    
    public function getSenha() {
        return $this->senha;
    }    
    public function setSenha($senha) {
        $this->senha = $senha;
    }    
    public function getSaldo() {
        return $this->saldo;
    }    
    public function setSaldo($saldo) {
        $this->saldo = $saldo;
    }
    public function getId() {
        return $this->id;
    }    
    public function setId($id) {
        $this->id = $id;
    }
}

?>