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
      throw new ProdutoErro("Erro ao obter os produtos.");
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
    try {
      const response = await fetch(API_MAIS_VENDIDOS, {
        method: "GET",
        headers: { Accept: "application/json" }
      });

      if (response.status === 403) {
        throw new ProdutoErro(
          "Você não possui permissão para executar esta ação."
        );
      }

      if (response.status === 404) {
        return [];
      }

      const produtos = await response.json();
      const arrayDeObjetosDeMaisVendidos: Produto[] = produtos.map(
        (produto: any) => this.transformaEmObjeto(produto)
      );

      return arrayDeObjetosDeMaisVendidos;
    } catch (erro: any) {
      throw new ProdutoErro(erro);
    }
  };

  obterPorId = async (id: number) => {
    const response = await fetch(API_PRODUTO + "?id=" + id, {
      method: "GET",
      headers: { Accept: "application/json" }
    });

    if (response.status === 403) {
      throw new ProdutoErro(
        "Você não possui permissão para executar esta ação."
      );
    }

    if (response.status === 404) {
      throw new ProdutoErro("Produto não encontrado.");
    }

    const resposta = await response.json();
    const produto = this.transformaEmObjeto(resposta[0]);

    return produto;
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
