import { Autenticacao } from "./autenticacao";

export class VisaoUsuarioEmAutenticacao {
  autenticacao = (): Autenticacao | undefined => {
    const login = document.getElementById("usuario") as HTMLInputElement | null;
    const senha = document.getElementById("senha") as HTMLInputElement | null;
    if (login && senha) {
      const autenticacao = new Autenticacao(login.value, senha.value);
      return autenticacao;
    }
    return undefined;
  };

  mostrarMensagemLogado = () => {
    const mensagem = document.getElementById("mensagem") as HTMLDivElement;
    if (mensagem) {
      mensagem.innerText = "Logado com sucesso!";
      mensagem.classList.remove("erro");
      mensagem.classList.add("sucesso");
    }
  };

  mostrarErro = () => {
    const mensagem = document.getElementById("mensagem") as HTMLDivElement;
    if (mensagem) {
      mensagem.innerText = "Usuário ou senha incorretos";
      mensagem.classList.remove("sucesso");
      mensagem.classList.add("erro");
    }
  };

  iniciar(callback: () => void) {
    const botaoLogin = document.getElementById("botao-login");
    if (botaoLogin) {
      botaoLogin.addEventListener("click", callback);
    }
  }
}
