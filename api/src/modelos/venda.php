<?php

require_once("produto.php");
class Venda{
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
            $valorDoProduto = number_format( floatval( $item->getPrecoDesconto() ),2 );
            $quantidade = intval( $item->getQuantidade() );
            $valorItens += number_format( floatval( $valorDoProduto * $quantidade),2 ) ;
        }
        $this->valorTotal = $valorItens;
    }
    public function adicionarItemVenda( Produto $produto ){
        if( $produto instanceof Produto && $produto->getPrecoDesconto() > 0 ){
            $duplicado = false;
            foreach( $this->itensVenda as $item ){
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

    // public function removerItemVenda( $id ){ 
    //     //implementar...
    // }

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