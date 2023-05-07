<?php
class Produto implements JsonSerializable{
    private $id;
    private $descricao;
    private $precoDeVenda;
    private $lancamento;
    private $detalhes;
    private $quantidade;
    private $taxaDesconto;
    private $categoria;
    
    public function __construct( $descricao, $precoDeVenda, $lancamento, $detalhes, $quantidade,
                                     $taxaDesconto, $categoria, $id = 0) {
        $this->id = $id;
        $this->descricao = $descricao;
        $this->precoDeVenda = $precoDeVenda;
        $this->lancamento = $lancamento;
        $this->detalhes = $detalhes;
        $this->quantidade = $quantidade;
        $this->taxaDesconto = $taxaDesconto;
        $this->categoria = $categoria;
    }
    
    public function getId() {
        return $this->id;
    }
    
    public function setId($id) {
        $this->id = $id;
    }
    
    public function getDescricao() {
        return $this->descricao;
    }
    
    public function setDescricao($descricao) {
        $this->descricao = $descricao;
    }
    
    public function getPrecoDeVenda() {
        return $this->precoDeVenda;
    }
    
    public function setPrecoDeVenda($precoDeVenda) {
        $this->precoDeVenda = $precoDeVenda;
    }
    
    public function getLancamento() {
        return $this->lancamento;
    }
    
    public function setLancamento($lancamento) {
        $this->lancamento = $lancamento;
    }
    
    public function getDetalhes() {
        return $this->detalhes;
    }
    
    public function setDetalhes($detalhes) {
        $this->detalhes = $detalhes;
    }
    
    public function getQuantidade() {
        return $this->quantidade;
    }
    
    public function setQuantidade($quantidade) {
        $this->quantidade = $quantidade;
    }
    
    public function getTaxaDesconto() {
        return $this->taxaDesconto;
    }
    
    public function setTaxaDesconto($taxaDesconto) {
        $this->taxaDesconto = $taxaDesconto;
    }
    
    public function getCategoria() {
        return $this->categoria;
    }
    
    public function setCategoria($categoria) {
        $this->categoria = $categoria;
    }

    public function jsonSerialize() {
        return get_object_vars( $this );
    }
}

?>
