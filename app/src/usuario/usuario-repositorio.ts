import { UsuarioErro } from "./usuario-erro";
import { Usuario } from "./usuario";
import { API_VENDAS_USUARIO } from "../rotas";

export class UsuarioRepositorio {
  pegarUsuarioDaLocalStorage = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const resposta = this.transformaEmObjeto(usuario);
    return resposta;
  };

  transformaEmObjeto(usuario: any) {
    const usuarioObj = new Usuario(
      usuario.id,
      usuario.matricula,
      usuario.nome,
      usuario.saldo
    );
    return usuarioObj;
  }

  retornaComprasDoUsuario = async () => {
    const resposta = await fetch(API_VENDAS_USUARIO, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const respostaJson = await resposta.json();
    console.log(respostaJson);
    if (respostaJson) {
      return respostaJson;
    } else {
      throw new UsuarioErro("Erro ao carregar compras do usuário");
    }
  };
}
