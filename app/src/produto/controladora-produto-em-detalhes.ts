import { VisaoProdutoEmDetalhes } from "./visao-produto-em-detalhes";
import { ProdutoRepositorio } from "./produto-repositorio";
import { Produto } from "./produto";

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

  adicionarAoCarrinho = () => {
    const quantidadeSelect = document.getElementById(
      "quantidade"
    ) as HTMLSelectElement;
    const quantidadeSelecionada = parseInt(quantidadeSelect.value, 10);

    // Criar a lógica para adicionar ao Carrinho

    quantidadeSelect.style.display = "none";
    const adicionarAoCarrinhoButton = document.getElementById(
      "adicionar-ao-carrinho"
    ) as HTMLButtonElement;
    adicionarAoCarrinhoButton.style.display = "none";
  };
}

const controladoraProdutoEmDetalhes = new ControladoraProdutoEmDetalhes();
controladoraProdutoEmDetalhes.iniciarDetalhamento();
