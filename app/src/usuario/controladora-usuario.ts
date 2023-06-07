import { ProdutoRepositorio } from "./../produto/produto-repositorio";
import { UsuarioRepositorio } from "./usuario-repositorio";
import { VisaoUsuario } from "./visao-usuario";
import { ControladoraUsuarioEmAutenticacao } from "../autenticacao/controladora-usuario-em-autenticacao.js";

export class ControladoraUsuario {
  usuarioRepositorio: UsuarioRepositorio;
  visaoUsuario: VisaoUsuario;
  controladoraUsuarioEmAutenticacao: ControladoraUsuarioEmAutenticacao;
  produtoRepositorio: ProdutoRepositorio;

  constructor() {
    this.usuarioRepositorio = new UsuarioRepositorio();
    this.visaoUsuario = new VisaoUsuario();
    this.controladoraUsuarioEmAutenticacao =
      new ControladoraUsuarioEmAutenticacao();
    this.produtoRepositorio = new ProdutoRepositorio();
  }

  iniciar = () => {
    console.log(this.controladoraUsuarioEmAutenticacao.estaLogado());
    if (this.controladoraUsuarioEmAutenticacao.estaLogado()) {
      this.carregarUsuario();
      this.carregarCompras();
      this.atualizarBadgeCarrinho();
      this.visaoUsuario.mostrarUsuarioLogado();
      this.carregarGrafico();
    } else {
      console.log("nao logado");
      this.visaoUsuario.mostrarUsuarioDeslogado();
      this.atualizarBadgeCarrinho();
      this.visaoUsuario.mostrarMensagemDeErroUsuarioDeslogado();
    }
  };

  carregarUsuario = () => {
    const usuario = this.usuarioRepositorio.pegarUsuarioDaLocalStorage();
    this.visaoUsuario.mostrarInformacoesUsuario(usuario);
  };

  carregarCompras = async () => {
    try {
      const compras = await this.usuarioRepositorio.retornaComprasDoUsuario();
      this.visaoUsuario.mostrarCompras(compras);
    } catch (erro) {}
  };

  carregarGrafico = async () => {
    try {
      const compras = await this.usuarioRepositorio.retornaComprasDoUsuario();
      this.visaoUsuario.criarGraficoCompras(compras);
    } catch (erro) {}
  };

  atualizarBadgeCarrinho = () => {
    const quantidadeProdutos =
      this.produtoRepositorio.obterQuantidadeProdutos();
    this.visaoUsuario.atualizarBadgeCarrinho(quantidadeProdutos);
  };
}

const controladoraUsuario = new ControladoraUsuario();
controladoraUsuario.iniciar();
