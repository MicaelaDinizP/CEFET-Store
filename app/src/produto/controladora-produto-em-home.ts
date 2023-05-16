import { VisaoProdutoEmHome } from "./visao-produto-em-home.js";
import { ProdutoRepositorio } from "./produto-repositorio.js";
import { VisaoProdutoEmDetalhes } from "./visao-produto-em-detalhes.js";
//import { Util } from "../util/util";

export class ControladoraProdutoEmHome {
  visaoProdutoEmHome: VisaoProdutoEmHome;
  produtoRepositorio: ProdutoRepositorio;
  visaoProdutoEmDetalhes: VisaoProdutoEmDetalhes;

  constructor() {
    this.visaoProdutoEmHome = new VisaoProdutoEmHome();
    this.produtoRepositorio = new ProdutoRepositorio();
    this.visaoProdutoEmDetalhes = new VisaoProdutoEmDetalhes();
  }

  iniciarListagem() {
    this.carregarTodos();
    //Util.aoClicarEmDeslogar(Util.deslogar);
  }

  carregarTodos = async () => {
    try {
      let produtos = await this.produtoRepositorio.obterProdutosMaisVendidos();
      this.visaoProdutoEmHome.montarListagemMaisVendidos(produtos);
    } catch (erro) {
      //Util.mostrarMensagem("Erro ao carregar os produtos. " + erro);
    }
  };

  detalharProduto = async (id: number) => {
    try {
      console.log("ENTROU EM DETALHAR PRODUTO NA CONTROLADORA");
      console.log(id);
      let produto = await this.produtoRepositorio.obterPorId(id);
      this.visaoProdutoEmDetalhes.montarDetalhamento(produto);
    } catch (erro) {
      //Util.mostrarMensagem("Erro ao carregar o produto. " + erro);
    }
  };
}

const controladoraProdutoEmHome = new ControladoraProdutoEmHome();
controladoraProdutoEmHome.iniciarListagem();
