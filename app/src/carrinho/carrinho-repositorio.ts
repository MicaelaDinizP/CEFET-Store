import { API_FINALIZAR_VENDA } from "../rotas";
import { CarrinhoErro } from "./carrinho-erro";

export class CarrinhoRepositorio {
  gerarNumeroPedido = async () => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "[]");
    const produtos = JSON.parse(localStorage.getItem("carrinho") || "[]");
    const idUsuario = usuario.id;
    const response = await fetch(API_FINALIZAR_VENDA, {
      method: "POST",
      body: JSON.stringify({ idUsuario, produtos }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new CarrinhoErro(
        "Erro ao obter finalizar venda e obter número do pedido."
      );
    }
    const numeroPedido = await response.json();
    return numeroPedido.numeroPedido;
  };
}
