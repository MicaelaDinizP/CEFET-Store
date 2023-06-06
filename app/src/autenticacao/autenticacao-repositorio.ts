import { API_AUTENTICACAO, API_DESLOGAR } from "../rotas";
import { AutenticacaoErro } from "./autenticacao-erro";

export class AutenticacaoRepositorio {
  logar = async (autenticacao: object) => {
    // criar na controladora
    const response = await fetch(API_AUTENTICACAO, {
      method: "POST",
      body: JSON.stringify(autenticacao),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new AutenticacaoErro("Erro ao obter o usuário.");
    }
    const usuario = await response.json();
    return usuario;
  };

  deslogar = async () => {
    const response = await fetch(API_DESLOGAR, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new AutenticacaoErro("Erro ao deslogar.");
    }

    return true;
  };

  existeUsuarioLogado = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "[]");
    if (usuario && usuario.id) {
      return usuario;
    }
    return false;
  };
}
