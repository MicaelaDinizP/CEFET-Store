import { VisaoProdutoEmDetalhes } from "./visao-produto-em-detalhes.js";
import { ProdutoRepositorio } from "./produto-repositorio.js";
import { Produto } from "./produto.js";

export class ControladoraProdutoEmDetalhes {
  visaoProdutoEmDetalhes: VisaoProdutoEmDetalhes;
  produtoRepositorio: ProdutoRepositorio;

  constructor() {
    this.produtoRepositorio = new ProdutoRepositorio();
    this.visaoProdutoEmDetalhes = new VisaoProdutoEmDetalhes();
  }

  iniciarDetalhamento() {
    const params = new URLSearchParams(window.location.search);
    const idProduto = params.get("id");
    if (idProduto) this.detalharProduto(Number(idProduto));
    this.atualizarBadgeCarrinho();
    //Util.aoClicarEmDeslogar(Util.deslogar);
  }

  detalharProduto = async (id: number) => {
    try {
      const produto = await this.produtoRepositorio.obterPorId(id);
      console.log(produto);
      this.visaoProdutoEmDetalhes.montarDetalhamento(produto);
    } catch (erro) {
      //Util.mostrarMensagem("Erro ao carregar o produto. " + erro);
    }
  };

  adicionarAoCarrinho = async () => {
    const quantidadeSelect = document.getElementById(
      "quantidade"
    ) as HTMLSelectElement;
    const quantidadeSelecionada = parseInt(quantidadeSelect.value, 10);

    if (quantidadeSelecionada > 0 && quantidadeSelecionada <= 10) {
      const params = new URLSearchParams(window.location.search);
      const idProduto = Number(params.get("id"));

      try {
        const produto = await this.produtoRepositorio.obterPorId(idProduto);
        const quantidade = quantidadeSelecionada;

        const novoProduto = {
          id: produto.id,
          descricao: produto.descricao,
          precoDeVenda: produto.precoDeVenda,
          quantidadeSelecionada: quantidade,
          imagem: produto.imagem
        };

        let carrinho =
          JSON.parse(localStorage.getItem("carrinho") as string) || [];
        carrinho.push(novoProduto);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
      } catch (erro) {
        console.log("Erro buscando detalhes do produto:", erro);
        alert("Ocorreu um erro buscando detalhes do produto.");
      }
    } else {
      alert("Por favor selecione uma quantidade válida (1 a 10).");
    }
  };

  atualizarBadgeCarrinho = () => {
    const quantidadeProdutos =
      this.produtoRepositorio.obterQuantidadeProdutos();
    this.visaoProdutoEmDetalhes.atualizarBadgeCarrinho(quantidadeProdutos);
  };
}

const controladoraProdutoEmDetalhes = new ControladoraProdutoEmDetalhes();
controladoraProdutoEmDetalhes.iniciarDetalhamento();
