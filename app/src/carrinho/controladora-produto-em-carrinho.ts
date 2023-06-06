import { ControladoraUsuarioEmAutenticacao } from "./../autenticacao/controladora-usuario-em-autenticacao";
import { VisaoProdutoEmCarrinho } from "./visao-produto-em-carrinho.js";
import { ProdutoRepositorio } from "../produto/produto-repositorio.js";
import { CarrinhoRepositorio } from "./carrinho-repositorio.js";

export class ControladoraProdutoEmCarrinho {
  visaoProdutoEmCarrinho: VisaoProdutoEmCarrinho;
  produtoRepositorio: ProdutoRepositorio;
  controladoraUsuarioEmAutenticacao: ControladoraUsuarioEmAutenticacao;
  carrinhoRepositorio: CarrinhoRepositorio;

  constructor() {
    this.visaoProdutoEmCarrinho = new VisaoProdutoEmCarrinho();
    this.produtoRepositorio = new ProdutoRepositorio();
    this.controladoraUsuarioEmAutenticacao =
      new ControladoraUsuarioEmAutenticacao();
    this.carrinhoRepositorio = new CarrinhoRepositorio();
  }

  passarProdutosProCarrinho() {
    const carrinho = this.pegaCarrinhoDaLocalStorage();
    this.visaoProdutoEmCarrinho.montarProdutosNoCarrinho(carrinho);
    this.visaoProdutoEmCarrinho.finalizarCompra();
    this.atualizarBadgeCarrinho();
    if (this.controladoraUsuarioEmAutenticacao.estaLogado()) {
      this.visaoProdutoEmCarrinho.mostrarUsuarioLogado();
    } else {
      this.visaoProdutoEmCarrinho.mostrarUsuarioDeslogado();
    }
  }

  pegaCarrinhoDaLocalStorage = () => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    return carrinho;
  };

  atualizarBadgeCarrinho = () => {
    const quantidadeProdutos =
      this.produtoRepositorio.obterQuantidadeProdutos();
    this.visaoProdutoEmCarrinho.atualizarBadgeCarrinho(quantidadeProdutos);
  };

  removerProdutoDoCarrinho = (id: number) => {
    const carrinho = this.pegaCarrinhoDaLocalStorage();
    const novoCarrinho = carrinho.filter((item: any) => item.id !== id);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    this.passarProdutosProCarrinho();
  };

  redirecionarParaDetalhesProduto = (id: number) => {
    window.location.href = `produto.html?id=${id}`;
  };

  finalizarCompra = async () => {
    if (this.controladoraUsuarioEmAutenticacao.estaLogado()) {
      const usuario = this.controladoraUsuarioEmAutenticacao.estaLogado();
      const cefetinsDoUsuario = usuario.saldo; // supondo que o saldo de Cefetins esteja armazenado na propriedade "cefetins" do objeto do usuário
      const valorDaCompra = this.visaoProdutoEmCarrinho.calcularValorDaCompra(); // função para calcular o valor total da compra

      if (cefetinsDoUsuario < valorDaCompra) {
        this.visaoProdutoEmCarrinho.exibirMensagemSaldoInsuficiente();
        return;
      }

      this.verificarEstoqueDosItensERemover(); // função para verificar se há estoque suficiente para os itens no carrinho

      const numeroPedido = await this.gerarNumeroPedido(); // função para gerar um número de pedido aleatório
      // Processo de finalização de compra
      this.controladoraUsuarioEmAutenticacao.debitarCefetinsDoUsuario(
        valorDaCompra
      ); // função para debitar o saldo de Cefetins do usuário pelo valor da compra
      this.visaoProdutoEmCarrinho.exibirMensagemDeSucessoNaCompra(numeroPedido);
      setTimeout(() => {
        this.visaoProdutoEmCarrinho.limparCarrinho();
      }, 5000);
    } else {
      this.controladoraUsuarioEmAutenticacao.redirecionarParaLogin();
    }
  };

  verificarEstoqueDosItensERemover = async () => {
    const carrinho = this.pegaCarrinhoDaLocalStorage();
    for (const item of carrinho) {
      const produto = await this.produtoRepositorio.obterPorId(item.id);
      if (produto.quantidade < item.quantidade) {
        this.removerProdutoDoCarrinho(item.id);
        this.visaoProdutoEmCarrinho.exibirMensagemItensRemovidos(
          item.descricao
        );
      }
    }
  };

  gerarNumeroPedido = async () => {
    const numeroPedido = await this.carrinhoRepositorio.gerarNumeroPedido();
    return numeroPedido;
  };
}

const controladoraProdutoEmCarrinho = new ControladoraProdutoEmCarrinho();
controladoraProdutoEmCarrinho.passarProdutosProCarrinho();
