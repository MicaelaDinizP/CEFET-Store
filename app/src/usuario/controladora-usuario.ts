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
    this.carregarUsuario();
    this.carregarCompras();
    this.atualizarBadgeCarrinho();
    if (this.controladoraUsuarioEmAutenticacao.estaLogado()) {
      this.visaoUsuario.mostrarUsuarioLogado();
    } else {
      this.visaoUsuario.mostrarUsuarioDeslogado();
    }
    this.carregarGrafico();
  };

  carregarUsuario = () => {
    const usuario = this.usuarioRepositorio.pegarUsuarioDaLocalStorage();
    this.visaoUsuario.mostrarInformacoesUsuario(usuario);
  };

  carregarCompras = async () => {
    try {
      console.log("carregarCompras");
      const compras = await this.usuarioRepositorio.retornaComprasDoUsuario();
      console.log("compras");
      console.log(compras);
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
