import { VisaoUsuarioEmAutenticacao } from "./visao-usuario-em-autenticacao.js";
import { AutenticacaoRepositorio } from "../autenticacao/autenticacao-repositorio.js";

export class ControladoraUsuarioEmAutenticacao {
  visaoUsuarioEmAutenticacao: VisaoUsuarioEmAutenticacao;
  autenticacaoRepositorio: AutenticacaoRepositorio;

  constructor() {
    this.visaoUsuarioEmAutenticacao = new VisaoUsuarioEmAutenticacao();
    this.autenticacaoRepositorio = new AutenticacaoRepositorio();
  }

  iniciar = () => {
    this.visaoUsuarioEmAutenticacao.iniciar(this.realizarLogin);
  };

  realizarLogin = async () => {
    const autenticacao = this.visaoUsuarioEmAutenticacao.autenticacao();

    if (autenticacao) {
      const obj = { login: autenticacao.login, senha: autenticacao.senha };

      try {
        const usuario = await this.autenticacaoRepositorio.logar(obj);
        console.log(usuario);
        if (usuario) {
          localStorage.setItem("usuario", JSON.stringify(usuario));
          this.visaoUsuarioEmAutenticacao.mostrarMensagemLogado();
          setTimeout(() => {
            this.redirecionarParaCarrinho();
          }, 1500);
        } else {
          this.visaoUsuarioEmAutenticacao.mostrarErro();
        }
      } catch (error) {
        this.visaoUsuarioEmAutenticacao.mostrarErro();
        console.error(error);
      }
    }
  };

  realizarLogout = () => {
    this.autenticacaoRepositorio.deslogar();
    this.visaoUsuarioEmAutenticacao.mostrarUsuarioDeslogado();
  };

  estaLogado = () => {
    const usuario = this.autenticacaoRepositorio.existeUsuarioLogado();
    if (usuario) {
      return usuario;
    } else {
      return false;
    }
  };

  redirecionarParaLogin = () => {
    window.location.href = "./login.html";
  };

  redirecionarParaCarrinho = () => {
    window.location.href = "../carrinho/carrinho.html";
  };
}

const controladoraUsuarioEmAutenticacao =
  new ControladoraUsuarioEmAutenticacao();
controladoraUsuarioEmAutenticacao.iniciar();
