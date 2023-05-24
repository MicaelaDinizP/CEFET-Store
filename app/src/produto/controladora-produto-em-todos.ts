import { VisaoProdutoEmTodos } from "./visao-produto-em-todos.js";
import { ProdutoRepositorio } from "./produto-repositorio.js";
//import { Util } from "../util/util";

export class ControladoraProdutoEmTodos {
  visaoProdutoEmTodos: VisaoProdutoEmTodos;
  produtoRepositorio: ProdutoRepositorio;

  constructor() {
    this.visaoProdutoEmTodos = new VisaoProdutoEmTodos();
    this.produtoRepositorio = new ProdutoRepositorio();
  }

  iniciarListagem(paginaEscolhida: number) {
    this.carregarTodos(paginaEscolhida);
    //Util.aoClicarEmDeslogar(Util.deslogar);
  }

  carregarTodos = async (paginaEscolhida: number) => {
    try {
      const produtos = await this.produtoRepositorio.obterTodos(
        paginaEscolhida
      );
      const paginaAtual = paginaEscolhida;
      const totalPaginas = produtos.totalPaginas;

      debugger;

      this.visaoProdutoEmTodos.montarListagemProdutos(
        produtos.arrayDeObjetosDeProdutos,
        paginaAtual,
        totalPaginas
      );
    } catch (erro) {
      //Util.mostrarMensagem("Erro ao carregar os produtos. " + erro);
    }
  };
}

const controladoraProdutoEmTodos = new ControladoraProdutoEmTodos();
const paginaEscolhida = 1; // Defina aqui o número da página escolhida
controladoraProdutoEmTodos.iniciarListagem(paginaEscolhida);
