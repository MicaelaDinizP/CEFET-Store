<?php
require_once("./src/exceptions/repositorio-venda-exception.php");
require_once("repositorio-venda.php");
require_once("./src/modelos/venda.php");
class RepositorioVendaEmPDO /*implements RepositorioVenda*/{
    private PDO $pdo;

    public function __construct( $pdo ){
        $this->pdo = $pdo;
    }
    public function cadastrarVenda( Venda $venda, $idUsuario ) {
        $sqlVenda = 'INSERT INTO venda(dataVenda, valorTotal, usuario_id) VALUES(CURRENT_TIMESTAMP(), :valorTotal,:idUsuario)';
        $sqlItemVenda = 'INSERT INTO item_venda(quantidade,precoUnitario,descontoAplicado,produto_id,venda_id) VALUES(:qtd,:precoUnitario,:taxaDesc,:idProduto,:idVenda)';
        $sqlUsuario = 'UPDATE usuario SET saldo=saldo-:valorCompra WHERE id=:idUsuario';
        $sqlProduto = 'UPDATE produto SET quantidade=quantidade-:qtd WHERE id=:idProduto';
        $foiExecutadoAteAqui = 0;
        try{
            $this->pdo->beginTransaction();
            $ps = $this->pdo->prepare( $sqlVenda );
            $ps->execute([
                'valorTotal' => $venda->getValorTotal(),
                'idUsuario' => $idUsuario
            ]);
            $venda->setId( $this->pdo->lastInsertId() );
            $foiExecutadoAteAqui = 1;

            $arrayItensVenda = $venda->getItensVenda();
            foreach( $arrayItensVenda as $itemVenda ) {
                $ps = $this->pdo->prepare( $sqlItemVenda );
                $ps->execute([
                    'qtd'=>$itemVenda->getQuantidade(),
                    'precoUnitario'=>$itemVenda->getPrecoDeVenda(),/*deve ser o preco desconto na verdade*/
                    'taxaDesc'=>$itemVenda->getTaxaDesconto(),
                    'idProduto'=>$itemVenda->getId(),
                    'idVenda'=>$venda->getId()
                ]);
                $ps = $this->pdo->prepare( $sqlProduto );
                $ps->execute([
                    'qtd' => $itemVenda->getQuantidade(),
                    'idProduto' => $itemVenda->getId()
                ]);
            }
            $foiExecutadoAteAqui = 2;
            $ps = $this->pdo->prepare( $sqlUsuario );
            $ps->execute([
                'valorCompra'=> $venda->getValorTotal(),
                'idUsuario'=> $idUsuario
            ]);
            $foiExecutadoAteAqui = 3;
            $this->pdo->commit();

        }catch( PDOException $e ){
            $this->pdo->rollBack();
            throw new RepositorioVendaException("Não foi possível efetivar a venda -${foiExecutadoAteAqui}-.".$e->getMessage() );
        }
    }    
}

?>