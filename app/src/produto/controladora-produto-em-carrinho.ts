import { VisaoProdutoEmCarrinho } from "./visao-produto-em-carrinho.js";
import { ProdutoRepositorio } from "./produto-repositorio.js";

export class ControladoraProdutoEmCarrinho {
  visaoProdutoEmCarrinho: VisaoProdutoEmCarrinho;
  produtoRepositorio: ProdutoRepositorio;

  constructor() {
    this.visaoProdutoEmCarrinho = new VisaoProdutoEmCarrinho();
    this.produtoRepositorio = new ProdutoRepositorio();
  }

  passarProdutosProCarrinho() {
    const carrinho = this.pegaCarrinhoDaLocalStorage();
    this.visaoProdutoEmCarrinho.montarProdutosNoCarrinho(carrinho);
    this.atualizarBadgeCarrinho();
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
