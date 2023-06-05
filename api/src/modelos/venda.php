<?php

require_once("produto.php");
class Venda implements JsonSerializable {
    private $id;
    private $dataVenda;
    private $valorTotal;
    private $itensVenda = [];
    public function __construct( $dataVenda, $id = 0) {
        $this->id = $id;
        $this->dataVenda = $dataVenda;
    }
    private function calcularValorTotal(){
        $valorItens = 0.0;
        foreach( $this->itensVenda as $item ){
            $valorDoProduto = floatval( $item->getPrecoDesconto() );
            $quantidade = intval( $item->getQuantidade() );
            $valorItens += floatval( $valorDoProduto * $quantidade) ;
        }
        $this->valorTotal = $valorItens;
    }
    public function adicionarItemVenda( Produto $produto ) {
        if( $produto instanceof Produto && $produto->getPrecoDesconto() > 0 ) {
            $duplicado = false;
            foreach( $this->itensVenda as $item ) {
                if( $item->getId() === $produto->getId() ){
                    $item->setQuantidade( $item->getQuantidade() + $produto->getQuantidade() );
                    $duplicado = true;
                    break;
                }
            }
            if( $duplicado === false ){
                $this->itensVenda[] = $produto;
            }
            $this->calcularValorTotal();
            return true;
        }
        return false;
    }
    public function jsonSerialize() {
        $encodar = json_encode($this->itensVenda);
        $json = [
            'id' => $this->id,
            'dataVenda' => $this->dataVenda,
            'valorTotal' => $this->valorTotal,
            'produtos' => json_decode($encodar)
        ];
        return $json;
    }
    
//getters e setters
	public function getId() {
		return $this->id;
	}
	public function setId( $id ){
		$this->id = $id;
	}
	public function getDataVenda() {
		return $this->dataVenda;
	}
	public function setDataVenda( $dataVenda ){
		$this->dataVenda = $dataVenda;
	}
	public function getValorTotal() {
		return $this->valorTotal;
	}
	public function getItensVenda(){
		return $this->itensVenda;
	}
}

?>