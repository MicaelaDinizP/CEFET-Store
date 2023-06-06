<?php
require_once('./src/util/conexao-pdo.php');
require_once('./src/modelos/venda.php');
require_once('./src/usuario.php');
require_once('./src/venda-service.php');
require_once("./src/usuario-service.php");
require_once('./src/exceptions/repositorio-venda-exception.php');
require_once('./src/repositorios/repositorio-venda-em-pdo.php');
require_once('./src/visoes/visao-venda.php');

class ControladoraVenda{
    private $repVenda;
    private $servicoVenda;
    private $servicoUsuario;
    private $visaoVenda;

    public function __construct(){
        $pdo = conexaoPDO('cefet-shop');
        $this->repVenda = new RepositorioVendaEmPDO( $pdo );
        $this->visaoVenda = new VisaoVenda();
        $this->servicoUsuario = new ServicoUsuario();
        $this->servicoVenda = new VendaService($this->servicoUsuario);
    }
    public function cadastrarVenda(){
        $idUsuario = $this->visaoVenda->obterIdUsuarioComprador();
        $produtos = $this->visaoVenda->obterProdutosParaVenda();
        if( $idUsuario == null || $this->servicoVenda->validarUsuarioLogado( $idUsuario ) === false ) {
            $this->visaoVenda->exibirErro( 'O id não condiz com o usuario logado', 401 );
        }
        if( $produtos == null || $this->servicoVenda->validarProdutosParaVenda( $produtos ) === false ) {
            $this->visaoVenda->exibirErro( 'Não foram recebidos produtos válidos para realizar a venda.', 400 );
        }
        try{
            $venda = $this->servicoVenda->montarVenda( $produtos );
            $numeroPedido = $this->repVenda->cadastrarVenda( $venda, $idUsuario );
            $this->visaoVenda->exibirSucesso(201);
            $this->visaoVenda->vendasEmJson(["numeroPedido"=> intval($numeroPedido)]);
        }catch( RepositorioVendaException $e ){
            $this->visaoVenda->exibirErro( 'A venda não pode ser cadastrada.', 500 );
        }
    }

    public function obterVendasPorIdUsuario() {
        $idUsuario = $this->servicoUsuario->obterIdUsuario();
        if( !isset( $idUsuario ) ) {
            $this->visaoVenda->exibirErro( 'Não há usuário logado para retornar vendas.', 401 );
        }
        try {
            $vendas = $this->repVenda->obterVendasPorIdUsuario( $idUsuario );
            if( $vendas === null ) {
                $this->visaoVenda->exibirErro( 'O usuário não possui vendas.', 404 );
            }
            $this->visaoVenda->exibirSucesso( 200 );
            $this->visaoVenda->vendasEmJson( $vendas );
        }catch( RepositorioVendaException $e ) {
            $this->visaoVenda->exibirErro( 'A vendas por usuário não podem ser obtidas.', 500 );
        }
    }
}
?>