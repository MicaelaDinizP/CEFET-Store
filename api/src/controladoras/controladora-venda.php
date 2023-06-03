<?php
require_once('./src/util/conexao-pdo.php');
require_once('./src/usuario.php');
require_once('./src/venda-service.php');
require_once('./src/modelos/venda.php');
require_once('./src/exceptions/repositorio-venda-exception.php');
require_once('./src/repositorios/repositorio-venda-em-pdo.php');
require_once('./src/visoes/visao-venda.php');

class ControladoraVenda{
    private $repVenda;
    private $servicoVenda;
    private $visaoVenda;

    public function __construct(){
        $pdo = conexaoPDO('cefet-shop');
        $this->repVenda = new RepositorioVendaEmPDO( $pdo );
        $this->visaoVenda = new VisaoVenda();
        $this->servicoVenda = new VendaService();
    }
    public function cadastrarVenda(){
        $idUsuario = $this->visaoVenda->obterIdUsuarioComprador(); //informar 1 por padrão, provisoriamente
        $produtos = $this->visaoVenda->obterProdutosParaVenda();
        if( $idUsuario == null || $this->servicoVenda->validarUsuarioLogado( $idUsuario ) === false ) {
            $this->visaoVenda->exibirErro( 'O id não condiz com o usuario logado', 401 );
        }
        if( $produtos == null || $this->servicoVenda->validarProdutosParaVenda( $produtos ) === false ) {
            $this->visaoVenda->exibirErro( 'Não foram recebidos produtos válidos para realizar a venda.', 400 );
        }
        try{
            $venda = $this->servicoVenda->montarVenda( $produtos );
            $this->repVenda->cadastrarVenda( $venda, $idUsuario );
            $this->visaoVenda->exibirSucesso(201);
        }catch( RepositorioVendaException $e ){
            $this->visaoVenda->exibirErro( 'A venda não pode ser cadastrada.', 500 );
        }
    }
}
?>