import { VisaoProdutoEmHome } from "./visao-produto-em-home.js";
import { ProdutoRepositorio } from "./produto-repositorio.js";
import { ControladoraUsuarioEmAutenticacao } from "../autenticacao/controladora-usuario-em-autenticacao.js";

export class ControladoraProdutoEmHome {
  visaoProdutoEmHome: VisaoProdutoEmHome;
  produtoRepositorio: ProdutoRepositorio;
  controladoraUsuarioEmAutenticacao: ControladoraUsuarioEmAutenticacao;

  constructor() {
    this.visaoProdutoEmHome = new VisaoProdutoEmHome();
    this.produtoRepositorio = new ProdutoRepositorio();
    this.controladoraUsuarioEmAutenticacao =
      new ControladoraUsuarioEmAutenticacao();
  }

  iniciarListagem() {
    this.carregarTodos();
    this.atualizarBadgeCarrinho();
    if (this.controladoraUsuarioEmAutenticacao.estaLogado()) {
      this.visaoProdutoEmHome.mostrarUsuarioLogado();
    } else {
      this.visaoProdutoEmHome.mostrarUsuarioDeslogado();
    }
  }

  carregarTodos = async () => {
    try {
      let produtos = await this.produtoRepositorio.obterProdutosMaisVendidos();
      this.visaoProdutoEmHome.montarListagemMaisVendidos(produtos);
    } catch (erro) {
      //Util.mostrarMensagem("Erro ao carregar os produtos. " + erro);
    }
  };

  atualizarBadgeCarrinho = () => {
    const quantidadeProdutos =
      this.produtoRepositorio.obterQuantidadeProdutos();
    this.visaoProdutoEmHome.atualizarBadgeCarrinho(quantidadeProdutos);
  };
}

const controladoraProdutoEmHome = new ControladoraProdutoEmHome();
controladoraProdutoEmHome.iniciarListagem();
