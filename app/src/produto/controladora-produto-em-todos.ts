import { VisaoProdutoEmTodos } from "./visao-produto-em-todos.js";
import { ProdutoRepositorio } from "./produto-repositorio.js";
//import { ControladoraProdutoEmDetalhes } from "./controladora-produto-em-detalhes.js";
//import { Util } from "../util/util";

export class ControladoraProdutoEmHome {
  visaoProdutoEmTodos: VisaoProdutoEmTodos;
  produtoRepositorio: ProdutoRepositorio;

  constructor() {
    this.visaoProdutoEmTodos = new VisaoProdutoEmTodos();
    this.produtoRepositorio = new ProdutoRepositorio();
  }

  iniciarListagem() {
    this.carregarTodos();
    //Util.aoClicarEmDeslogar(Util.deslogar);
  }

  carregarTodos = async () => {
    try {
      let produtos = await this.produtoRepositorio.obterTodos();
      this.visaoProdutoEmTodos.montarListagemProdutos(produtos);
    } catch (erro) {
      //Util.mostrarMensagem("Erro ao carregar os produtos. " + erro);
    }
  };
}

const controladoraProdutoEmHome = new ControladoraProdutoEmHome();
controladoraProdutoEmHome.iniciarListagem();
