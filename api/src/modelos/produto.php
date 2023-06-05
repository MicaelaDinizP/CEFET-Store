<?php
class Produto implements JsonSerializable{
    private $id;
    private $descricao = null;
    private $precoDeVenda = null;
    private $lancamento = null;
    private $detalhes = null;
    private $quantidade = null;
    private $taxaDesconto = null;
    private $categoria = null;
    private $imagem = null;
    private $precoDesconto = null;
    private $totalVendidos = null;
    
    public function __construct( $descricao, $precoDeVenda, $lancamento, $detalhes, $quantidade,
                                     $taxaDesconto, $categoria, $imagem, $totalVendidos ,$id = 0) {
        $this->id = $id;
        $this->descricao = $descricao;
        $this->precoDeVenda = $precoDeVenda;
        $this->lancamento = $lancamento;
        $this->detalhes = $detalhes;
        $this->quantidade = $quantidade;
        $this->taxaDesconto = $taxaDesconto;
        $this->categoria = $categoria;
        $this->imagem = $imagem;
        $this->totalVendidos = $totalVendidos;
       $this->calcularPrecoComDesconto();
    }
    private function calcularPrecoComDesconto(){
        if( $this->taxaDesconto == null || $this->taxaDesconto <= 0 ){
                $this->precoDesconto =  $this->precoDeVenda;
                $this->taxaDesconto = 0;
                return;
        }
        $this->precoDesconto = floatval(number_format($this->precoDeVenda * (1 - ($this->taxaDesconto / 100)), 2));
    }

//getters e setters -----
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
        $this->calcularPrecoComDesconto();
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
        $this->calcularPrecoComDesconto();
    }
    public function getCategoria() {
        return $this->categoria;
    }
    public function setCategoria($categoria) {
        $this->categoria = $categoria;
    }
	public function getImagem() {
		return $this->imagem;
	}
	public function setImagem($imagem) {
		$this->imagem = $imagem;
	}
    public function getPrecoDesconto() {
		return $this->precoDesconto;
	}
    public function getTotalVendidos() {
		return $this->totalVendidos;
	}
	public function setTotalVendidos($totalVendidos){
		$this->totalVendidos = $totalVendidos;
	}

// ... -----
    public function jsonSerialize() {
        $json = [];
        if (isset($this->id) || $this->id !== 0 ) {
            $json['id'] = $this->id;
        }
        if (isset($this->descricao)) {
            $json['descricao'] = $this->descricao;
        }
        if (isset($this->precoDeVenda) ) {
            $json['precoDeVenda'] = $this->precoDeVenda;
        }
        if (isset($this->lancamento)) {
            $json['lancamento'] = $this->lancamento;
        }
        if (isset($this->detalhes)) {
            $json['detalhes'] = $this->detalhes;
        }
        if (isset($this->quantidade)) {
            $json['quantidade'] = $this->quantidade;
        }
        if (isset($this->taxaDesconto) ) {
            $json['taxaDesconto'] = $this->taxaDesconto;
        }
        if (isset($this->categoria) ) {
            $json['categoria'] = $this->categoria;
        }
        if (isset($this->imagem) ) {
            $json['imagem'] = $this->imagem;
        }
        if ( isset($this->precoDesconto)) {
            $json['precoDesconto'] = $this->precoDesconto;
        }
        return $json;
        //return get_object_vars( $this );
    }
}

?>