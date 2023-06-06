import { VisaoProdutoEmTodos } from "./visao-produto-em-todos.js";
import { ProdutoRepositorio } from "../produto/produto-repositorio.js";
import { ControladoraUsuarioEmAutenticacao } from "../autenticacao/controladora-usuario-em-autenticacao.js";
//import { Util } from "../util/util";

export class ControladoraProdutoEmTodos {
  visaoProdutoEmTodos: VisaoProdutoEmTodos;
  produtoRepositorio: ProdutoRepositorio;
  controladoraUsuarioEmAutenticacao: ControladoraUsuarioEmAutenticacao;

  constructor() {
    this.visaoProdutoEmTodos = new VisaoProdutoEmTodos();
    this.produtoRepositorio = new ProdutoRepositorio();
    this.controladoraUsuarioEmAutenticacao =
      new ControladoraUsuarioEmAutenticacao();
  }

  iniciarListagem(paginaEscolhida: number) {
    this.carregarTodos(paginaEscolhida);
    this.atualizarBadgeCarrinho();
    if (this.controladoraUsuarioEmAutenticacao.estaLogado()) {
      this.visaoProdutoEmTodos.mostrarUsuarioLogado();
    } else {
      this.visaoProdutoEmTodos.mostrarUsuarioDeslogado();
    }
  }

  carregarTodos = async (paginaEscolhida: number) => {
    try {
      const produtos = await this.produtoRepositorio.obterTodos(
        paginaEscolhida
      );
      const paginaAtual = paginaEscolhida;
      const totalPaginas = produtos.totalPaginas;

      this.visaoProdutoEmTodos.montarListagemProdutos(
        produtos.arrayDeObjetosDeProdutos,
        paginaAtual,
        totalPaginas
      );
    } catch (erro) {
      //Util.mostrarMensagem("Erro ao carregar os produtos. " + erro);
    }
  };

  atualizarBadgeCarrinho = () => {
    const quantidadeProdutos =
      this.produtoRepositorio.obterQuantidadeProdutos();
    this.visaoProdutoEmTodos.atualizarBadgeCarrinho(quantidadeProdutos);
  };
}

const controladoraProdutoEmTodos = new ControladoraProdutoEmTodos();
const paginaEscolhida = 1; // Defina aqui o número da página escolhida
controladoraProdutoEmTodos.iniciarListagem(paginaEscolhida);
