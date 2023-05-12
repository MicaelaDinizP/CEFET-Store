<?php
require_once('repositorio-produto-exception.php');
require_once('repositorio-produto.php');
require_once('produto.php');
class RepositorioProdutoEmPDO implements RepositorioProduto{
    private $pdo;

    public function __construct( $pdo ){
        $this->pdo = $pdo;
    }

    public function obterPagina($limite, $deslocamento){
        $sql = "SELECT id, descricao, precoDeVenda, imagem, taxaDesconto FROM produto LIMIT :limite  OFFSET :deslocamento";
        $produtos = null;
        try{
            $ps = $this->pdo->prepare($sql);
            $ps->setFetchMode(PDO::FETCH_ASSOC);
            $ps->bindParam(':limite', $limite, PDO::PARAM_INT);
            $ps->bindParam(':deslocamento', $deslocamento, PDO::PARAM_INT);
            $ps->execute();
            if( $ps->rowCount()<0 ){
                return null;
            }  
            $dados = $ps->fetchAll();
            foreach( $dados as $d ){
                $produtos[] = new Produto( utf8_encode($d['descricao']), doubleval($d['precoDeVenda']), 
                    null ,null, null, intval($d['taxaDesconto']), null, base64_encode($d['imagem']), intval($d['id']) ); 
            }
            return $produtos;

        }catch( PDOException $e ){
            throw new RepositorioProdutoException("Não foi possível obter os produtos");
        }
    }
    
    public function obterPorNomeOuId( Produto $produto ){
        //SELECT * FROM `produto` WHERE id = :id OR descricao = :desc LIMIT 1;
    }
    public function obterMaisVendidos( $quantidade ) {
        $sql = "SELECT itemv.id, p.descricao,p.id as produto_id, p.precoDeVenda, p.imagem,p.taxaDesconto,SUM(itemv.quantidade) AS total_vendido
                FROM item_venda itemv
                JOIN produto p ON itemv.produto_id = p.id
                GROUP BY itemv.id
                ORDER BY total_vendido DESC LIMIT 6;";
        $produtos = null;
        try{
            $ps = $this->pdo->prepare($sql);
            $ps->setFetchMode(PDO::FETCH_ASSOC);
            $ps->execute();
            if( $ps->rowCount()<0 ){
                return null;
            }  
            $dados = $ps->fetchAll();
            foreach( $dados as $d ){
                $produtos[] = new Produto( utf8_encode($d['descricao']), doubleval($d['precoDeVenda']), 
                    null ,null, null, null, null, null,intval($d['id']) ); 
            }
            return $produtos;

        }catch( PDOException $e ){
            throw new RepositorioProdutoException("Não foi possível obter os produtos mais vendidos.");
        }
    }


}

?>