<?php

require_once("./src/exceptions/repositorio-produto-exception.php");
require_once("repositorio-produto.php");
require_once("./src/modelos/produto.php");
class RepositorioProdutoEmPDO implements RepositorioProduto{
    private $pdo;

    public function __construct( $pdo ){
        $this->pdo = $pdo;
    }

    public function obterPagina($limite, $deslocamento){
        $sql = "SELECT id, descricao, precoDeVenda, imagem, taxaDesconto FROM produto 
            LIMIT :limite  OFFSET :deslocamento";
        $produtos = null;
        try{
            $ps = $this->pdo->prepare($sql);
            $ps->setFetchMode(PDO::FETCH_ASSOC);
            $ps->bindParam(':limite', $limite, PDO::PARAM_INT);
            $ps->bindParam(':deslocamento', $deslocamento, PDO::PARAM_INT);
            $ps->execute();
            if( $ps->rowCount()<=0 ){
                return null;
            }  
            $dados = $ps->fetchAll();
            foreach( $dados as $d ){
                $produtos[] = new Produto( utf8_encode($d['descricao']), doubleval($d['precoDeVenda']), 
                    null ,null, null, intval($d['taxaDesconto']), null, base64_encode($d['imagem']), null, 
                    intval($d['id']) ); 
            }
            return $produtos;

        }catch( PDOException $e ){
            throw new RepositorioProdutoException("Não foi possível obter os produtos");
        }
    }
    
    public function obterPorNomeOuId( Produto $produto ){
        $sql = "SELECT * FROM `produto` WHERE id = :id OR descricao = :descricao LIMIT 1";
        $produtoBuscado = null;
        try{
            $ps = $this->pdo->prepare($sql);
            $ps->setFetchMode(PDO::FETCH_ASSOC);
            $ps->execute([
                'id' => $produto->getId(),
                'descricao' => $produto->getDescricao()
            ]);
            if( $ps->rowCount()<=0 ){
                return null;
            }  
            $dados = $ps->fetchAll();
            foreach( $dados as $d ){
                $produtoBuscado[] = new Produto( utf8_encode($d['descricao']), doubleval($d['precoDeVenda']), 
                    utf8_encode($d['lancamento']), utf8_encode($d['detalhes']), intval($d['quantidade']), 
                    intval($d['taxaDesconto']), utf8_encode($d['categoria']), base64_encode($d['imagem']), null, intval($d['id']) ); 
            }
            return $produtoBuscado;

        }catch( PDOException $e ) {
            throw new RepositorioProdutoException( "Não foi possível obter o produto" );
        }
    }
    public function obterMaisVendidos() {
        $sql = "SELECT itemv.id, p.descricao as descricao,p.id as produto_id, p.precoDeVenda as precoDeVenda, 
                p.imagem as imagem,p.taxaDesconto as taxaDesconto,SUM(itemv.quantidade) AS total_vendido
                FROM item_venda itemv
                JOIN produto p ON itemv.produto_id = p.id
                GROUP BY p.id
                ORDER BY total_vendido DESC LIMIT 6";
        $produtos = null;
        //o groupBy foi trocado para agrupar pelo id do produto e nao duplicar
        try{
            $ps = $this->pdo->prepare($sql);
            $ps->setFetchMode(PDO::FETCH_ASSOC);
            $ps->execute();
            if( $ps->rowCount()<=0 ){
                return null;
            }  
            $dados = $ps->fetchAll();
            foreach( $dados as $d ){
                $produtos[] = new Produto( utf8_encode($d['descricao']), doubleval($d['precoDeVenda']), 
                    null ,null, null, intval($d['taxaDesconto']), null, base64_encode($d['imagem']), 
                    intval($d['total_vendido']), intval($d['produto_id']) ); 
            }
            return $produtos;

        }catch( PDOException $e ) {
            throw new RepositorioProdutoException( "Não foi possível obter os produtos mais vendidos." );
        }
    }

    public function obterTotalProdutos(){
        $total = 0;
        $sql = "SELECT COUNT(*) as total FROM produto";
        try{
            $ps = $this->pdo->prepare($sql);
            $ps->setFetchMode(PDO::FETCH_ASSOC);
            $ps->execute();
            if( $ps->rowCount()<0 ){
                return null;
            }  
            $dado = $ps->fetchAll();
            $total = $dado[0]['total'];
            return $total;
    
        } catch(PDOException $e) {
            throw new RepositorioProdutoException("Não foi possível obter o total de produtos.");
        }
    }
    


}

?>