import { VisaoProdutoEmCarrinho } from "./visao-produto-em-carrinho.js";
import { ProdutoRepositorio } from "../produto/produto-repositorio.js";
import { ControladoraUsuarioEmAutenticacao } from "../autenticacao/controladora-usuario-em-autenticacao.js";

export class ControladoraProdutoEmCarrinho {
  visaoProdutoEmCarrinho: VisaoProdutoEmCarrinho;
  produtoRepositorio: ProdutoRepositorio;
  controladoraUsuarioEmAutenticacao: ControladoraUsuarioEmAutenticacao;

  constructor() {
    this.visaoProdutoEmCarrinho = new VisaoProdutoEmCarrinho();
    this.produtoRepositorio = new ProdutoRepositorio();
    this.controladoraUsuarioEmAutenticacao =
      new ControladoraUsuarioEmAutenticacao();
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
}

const controladoraProdutoEmCarrinho = new ControladoraProdutoEmCarrinho();
controladoraProdutoEmCarrinho.passarProdutosProCarrinho();
