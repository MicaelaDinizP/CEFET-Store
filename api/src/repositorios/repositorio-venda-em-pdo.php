<?php
require_once("./src/exceptions/repositorio-venda-exception.php");
require_once("repositorio-venda.php");
require_once("./src/modelos/venda.php");
class RepositorioVendaEmPDO implements RepositorioVenda {
    private PDO $pdo;

    public function __construct( $pdo ){
        $this->pdo = $pdo;
    }
    public function cadastrarVenda( Venda $venda, $idUsuario ) {
        $sqlVenda = 'INSERT INTO venda(dataVenda, valorTotal, usuario_id) VALUES(CURRENT_TIMESTAMP(), :valorTotal,:idUsuario)';
        $sqlItemVenda = 'INSERT INTO item_venda(quantidade,precoUnitario,descontoAplicado,produto_id,venda_id) VALUES(:qtd,:precoUnitario,:taxaDesc,:idProduto,:idVenda)';
        $sqlUsuario = 'UPDATE usuario SET saldo=saldo-:valorCompra WHERE id=:idUsuario';
        $sqlProduto = 'UPDATE produto SET quantidade=quantidade-:qtd WHERE id=:idProduto';
        try{
            $this->pdo->beginTransaction();
            $ps = $this->pdo->prepare( $sqlVenda );
            $ps->execute([
                'valorTotal' => $venda->getValorTotal(),
                'idUsuario' => $idUsuario
            ]);
            $venda->setId( $this->pdo->lastInsertId() );

            $arrayItensVenda = $venda->getItensVenda();
            foreach( $arrayItensVenda as $itemVenda ) {
                if( $this->checarEstoque( $itemVenda->getQuantidade(), $itemVenda->getId() ) === false ) {
                    throw new PDOException("Não há estoque suficiente.");
                }
                $ps = $this->pdo->prepare( $sqlItemVenda );
                $ps->execute([
                    'qtd'=>$itemVenda->getQuantidade(),
                    'precoUnitario'=>$itemVenda->getPrecoDesconto(),
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
            if($this->checarSaldo($venda->getValorTotal(), $idUsuario) === false) {
                throw new PDOException("Não há saldo suficiente.");
            }
            $ps = $this->pdo->prepare( $sqlUsuario );
            $ps->execute([
                'valorCompra'=> $venda->getValorTotal(),
                'idUsuario'=> $idUsuario
            ]);
            $this->pdo->commit();

        }catch( PDOException $e ){
            $this->pdo->rollBack();
            throw new RepositorioVendaException("Não foi possível efetivar a venda.".$e->getMessage() );
        }
    }    
    public function checarEstoque($quantidadeDemandada, $idProduto){
        $sqlEstoque = 'SELECT quantidade FROM produto WHERE id=:idProduto';
        $estoqueSuficiente = false;
        try{
            $ps = $this->pdo->prepare( $sqlEstoque );
            $ps->setFetchMode(PDO::FETCH_ASSOC);
            $ps->execute([
                'idProduto' => $idProduto
            ]);
            if( $ps->rowCount() <= 0 ) {
                return $estoqueSuficiente;
            }  
            $estoque = $ps->fetch();
            if( intval($estoque['quantidade']) >= intval( $quantidadeDemandada ) ) {
                $estoqueSuficiente = true;
            }
            return $estoqueSuficiente;
        }catch(PDOException $e){
            return $estoqueSuficiente;
        }
    }
    public function checarSaldo($saldoDemandado, $idUsuario){
        $sqlSaldo = 'SELECT saldo FROM usuario WHERE id=:idUsuario';
        $saldoSuficiente = false;
        try{
            $ps = $this->pdo->prepare( $sqlSaldo );
            $ps->setFetchMode(PDO::FETCH_ASSOC);
            $ps->execute([
                'idUsuario' => $idUsuario
            ]);
            if( $ps->rowCount() <= 0 ) {
                return $saldoSuficiente;
            }  
            $saldo = $ps->fetch();
            if( floatval($saldo['saldo']) >= floatval( $saldoDemandado ) ){
                $saldoSuficiente = true;
            }
            return $saldoSuficiente;
        }catch(PDOException $e){
            return $saldoSuficiente;
        }
    }
    public function obterVendasPorIdUsuario( $idUsuario ) {
        $sqlVenda = 'SELECT venda.* FROM venda JOIN usuario ON venda.usuario_id = usuario.id
            WHERE usuario.id = :idUsuario';
        $sqlItemVenda = 'SELECT iv.* FROM item_venda as iv JOIN venda ON iv.venda_id = venda.id
            WHERE venda.id = :idVenda';
        $sqlProduto = 'SELECT id,descricao,lancamento,detalhes,imagem FROM produto WHERE id=:idProduto';
        try {
            $ps = $this->pdo->prepare( $sqlVenda );
            $ps->setFetchMode(PDO::FETCH_ASSOC);
            $ps->execute([
                'idUsuario' => $idUsuario
            ]);
            if( $ps->rowCount() <= 0 ) {
                return null;
            }  
            $vendasObtidas = $ps->fetchAll();
            $arrayVendas = []; // Array de objetos de venda sem os itens
            $matrizItensDeVenda = [];//array de arrays de itens de venda
            foreach($vendasObtidas as $v){
                $arrayVendas[] = new Venda($v['dataVenda'], $v['id']);
                $ps = $this->pdo->prepare( $sqlItemVenda );
                $ps->setFetchMode(PDO::FETCH_ASSOC);
                $ps->execute([
                    'idVenda' => intval( $v['id'] )
                ]);
                if( $ps->rowCount() <= 0 ) {
                    return null;
                }  
                $matrizItensDeVenda[] = $ps->fetchAll();
            }

            $produtos = [];
            foreach( $matrizItensDeVenda as $itensV ) {
                foreach( $itensV as $iv ) {
                    $ps = $this->pdo->prepare( $sqlProduto );
                    $ps->setFetchMode(PDO::FETCH_ASSOC);
                    $ps->execute([
                        'idProduto' => intval( $iv['produto_id'] )
                    ]);
                    if( $ps->rowCount() <= 0 ) {
                        return null;
                    }  
                    $produto = $ps->fetch();
                    // vindo  do proprio produto: id,descricao,lancamento,detalhes,imagem
                    // o resto deve ser pego de item de venda iv nas posicoes:`quantidade`, 
                                                                        //`precoUnitario`, `descontoAplicado`, `venda_id`
                    $produtos[] = ["produto" => new Produto( utf8_encode($produto['descricao']),$iv['precoUnitario'],$produto['lancamento'],utf8_encode($produto['detalhes']),
                            $iv['quantidade'],$iv['descontoAplicado'],null,base64_encode($produto['imagem']),null,$produto['id']), "idVenda" => $iv['venda_id']];                 
                    }
            }
            foreach( $produtos as $p ) {
                foreach( $arrayVendas as $v ) {
                    if($v->getId() == $p['idVenda']) {
                        $v->adicionarItemVenda($p['produto']);
                    }
                }
            }
            return $arrayVendas;
        }catch(PDOException $e){
            throw new RepositorioVendaException("Não foi possível obter as vendas do usuário.".$e->getMessage() );
        }
    }
}

?>