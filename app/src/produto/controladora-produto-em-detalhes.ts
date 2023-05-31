import { VisaoProdutoEmDetalhes } from "./visao-produto-em-detalhes.js";
import { ProdutoRepositorio } from "./produto-repositorio.js";
import { CarrinhoItem } from "../carrinho/carrinhoItem.js";

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

        const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
        const index = carrinho.findIndex(
          (item: CarrinhoItem) => item.id === produto.id
        );

        if (index !== -1) {
          const produtoExistente = carrinho[index];
          let novaQuantidade = Math.min(
            quantidade + produtoExistente.quantidadeSelecionada,
            10
          );
          if (novaQuantidade > produto.quantidade)
            novaQuantidade = produto.quantidade;
          produtoExistente.quantidadeSelecionada = novaQuantidade;
        } else {
          const novoProduto = {
            id: produto.id,
            descricao: produto.descricao,
            precoDeVenda: produto.precoDeVenda,
            quantidadeSelecionada: quantidade,
            imagem: produto.imagem
          };
          carrinho.push(novoProduto);
        }

        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        this.atualizarBadgeCarrinho();
      } catch (erro) {
        alert(
          "Ocorreu um erro buscando detalhes do produto. Por favor, tente novamente."
        );
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
