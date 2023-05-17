import { Produto } from "./produto.js";
import { ProdutoErro } from "./produto-erro.js";
import { type } from "os";
// import { Util } from "../util/util";

const API_PRODUTOS = "http://localhost/2023-1-pis-g3/api/produtos";
const API_MAIS_VENDIDOS = "http://localhost/2023-1-pis-g3/api/mais-vendidos";
const API_PRODUTO = "http://localhost/2023-1-pis-g3/api/produto";
export class ProdutoRepositorio {
  obterTodos = async () => {
    let resposta: any = undefined;

    await fetch(API_PRODUTOS, {
      method: "GET",
      headers: { Accept: "application/json" }
    })
      .then((response) => {
        // if (response.status == 401) Util.redirecionarParaLogin();

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
      let arrayDeObjetosDeProdutos: Produto[] = [];
      resposta.forEach((r: any) => {
        arrayDeObjetosDeProdutos.push(this.transformaEmObjeto(r));
      });

      return arrayDeObjetosDeProdutos;
    }
  };

  obterProdutosMaisVendidos = async () => {
    let resposta: any = undefined;

    await fetch(API_MAIS_VENDIDOS, {
      method: "GET",
      headers: { Accept: "application/json" }
    })
      .then((response) => {
        // if (response.status == 401) Util.redirecionarParaLogin();

        if (response.status == 403)
          throw new ProdutoErro(
            "Você não possui permissão para executar esta ação."
          );

        if (response.status == 404) return false;
        else console.log(typeof response);
        return response.json();
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
    console.log("ENTROU NO OBTERPORID");
    let resposta: any = undefined;

    await fetch(API_PRODUTO + "?id=" + id, {
      method: "GET",
      headers: { Accept: "application/json" }
    })
      .then((response) => {
        console.log(response);
        // if (response.status == 401) Util.redirecionarParaLogin();
        if (response.status == 403)
          throw new ProdutoErro(
            "Você não possui permissão para executar esta ação."
          );
        if (response.status == 404) return false;
        else return response.json();
      })
      .then((produto) => {
        console.log(produto);
        resposta = produto;
        console.log(resposta);
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
}
