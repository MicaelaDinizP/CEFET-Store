import { Produto } from "./produto";
import { ProdutoErro } from "./produto-erro";
import { API_MAIS_VENDIDOS, API_PRODUTOS, API_PRODUTO } from "../rotas";
export class ProdutoRepositorio {
  obterTodos = async (paginaEscolhida: number) => {
    const response = await fetch(API_PRODUTOS + `?pag=${paginaEscolhida}`, {
      method: "GET",
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error("Erro ao obter os produtos.");
    }

    const produtos: any[] = await response.json();
    const totalPaginas: number = produtos[produtos.length - 1].totalPaginas;
    const paginaAtual: number = produtos[produtos.length - 1].paginaAtual;
    const arrayDeObjetosDeProdutos: Produto[] = produtos.map((produto) =>
      this.transformaEmObjeto(produto)
    );

    return {
      arrayDeObjetosDeProdutos,
      totalPaginas,
      paginaAtual
    };
  };

  obterProdutosMaisVendidos = async () => {
    let resposta: any = undefined;

    await fetch(API_MAIS_VENDIDOS, {
      method: "GET",
      headers: { Accept: "application/json" }
    })
      .then((response) => {
        if (response.status == 403)
          throw new ProdutoErro(
            "Você não possui permissão para executar esta ação."
          );

        if (response.status == 404) return false;
        else return response.json();
      })
      .then((produtos) => {
        resposta = produtos;
      })
      .catch((erro) => {
        throw new ProdutoErro(erro);
      });

    if (!resposta) {
      return resposta;
    } else {
      let arrayDeObjetosDeMaisVendidos: Produto[] = [];
      resposta.forEach((r: any) => {
        arrayDeObjetosDeMaisVendidos.push(this.transformaEmObjeto(r));
      });

      return arrayDeObjetosDeMaisVendidos;
    }
  };

  obterPorId = async (id: number) => {
    let resposta: any = undefined;

    await fetch(API_PRODUTO + "?id=" + id, {
      method: "GET",
      headers: { Accept: "application/json" }
    })
      .then((response) => {
        if (response.status == 403)
          throw new ProdutoErro(
            "Você não possui permissão para executar esta ação."
          );
        if (response.status == 404) return false;
        else return response.json();
      })
      .then((produto) => {
        resposta = produto;
      })
      .catch((erro) => {
        throw new ProdutoErro(erro);
      });
    resposta = this.transformaEmObjeto(resposta[0]);
    return resposta;
  };

  transformaEmObjeto(prod: any) {
    const produto = new Produto(
      prod.id,
      prod.descricao,
      prod.precoDeVenda,
      prod.lancamento,
      prod.detalhes,
      prod.quantidade,
      prod.taxaDesconto,
      prod.categoria,
      prod.precoDesconto,
      prod.imagem
    );
    return produto;
  }

  obterQuantidadeProdutos() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    const quantidadeProdutos = carrinho.length;
    return quantidadeProdutos;
  }
}
