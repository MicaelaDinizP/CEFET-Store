<?php

require_once("usuario.php");
require_once("./src/modelos/venda.php");
require_once("./src/modelos/produto.php");
require_once("./src/usuario-service.php");
class VendaService {
    private $servicoUsuario;
    public function __construct( $servicoUsuario ) {
        $this->servicoUsuario = $servicoUsuario;
    }
    public function validarUsuarioLogado( $idUsuario ) {
        $usuarioValido = false;
        if( $idUsuario === $this->servicoUsuario->obterIdUsuario() ) {
            $usuarioValido = true;
        }
        return $usuarioValido;
    }
    public function validarProdutosParaVenda( &$produtos ) {
        $produtosValidos = true;
        foreach( $produtos as $p ){
            $id = $p->getId();
            $qtd = $p->getQuantidade();
            $precoDeVenda = $p->getPrecoDeVenda();
            $taxaDesconto = $p->getTaxaDesconto();
            if( !isset( $id, $qtd, $precoDeVenda, $taxaDesconto ) ){
                $produtosValidos = false;
                break;
            }else{
                if( $qtd <= 0 && $precoDeVenda <= 0.00) {
                    $produtosValidos = false;
                    break;
                }
                $p->setId( intval( $id ) );
                $p->setQuantidade( intval( $qtd ) );
                $p->setPrecoDeVenda(floatval($precoDeVenda),2 );
                $p->setTaxaDesconto( intval( $taxaDesconto ) );
            }
        }
        return $produtosValidos;
    }
    public function montarVenda( $produtos ){
        $data = new DateTime();
        $data = $data->format('Y-m-d H:i:s');
        $venda = new Venda( $data );
        foreach( $produtos as $p ){
            $venda->adicionarItemVenda( $p );
        }
        return $venda;
    }
}

?>