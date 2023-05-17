import { ControladoraProdutoEmDetalhes } from "./controladora-produto-em-detalhes";
// import { ControladoraProdutoEmHome } from "./controladora-produto-em-home.js";
//import { ControladoraProdutoEmTodos } from "./controladora-produto-em-todos.js";
import { Produto } from "./produto.js";

export class VisaoProdutoEmTodos {
  montarListagemProdutos(produtos: Produto[]) {
    const listagemProdutos = document.querySelector(".todos-produtos");
    //const controladoraProdutoEmTodos = new ControladoraProdutoEmTodos();
    const controladoraProdutoEmDetalhes = new ControladoraProdutoEmDetalhes();

    produtos.forEach((produto) => {
      const dataIdProduto = produto.id;
      let card = document.createElement("div");
      card.setAttribute("data-id-produto", dataIdProduto.toString());
      card.setAttribute("id", "card" + dataIdProduto);
      card.setAttribute(
        "class",
        "mdl-card demo-card-square mdl-shadow--2dp produto mdl-cell"
      );
      listagemProdutos?.appendChild(card);

      let cardImagem = card.appendChild(document.createElement("div"));
      cardImagem.setAttribute("class", "mdl-card__media card-imagem-container");
      let imagemLink = cardImagem.appendChild(document.createElement("a"));
      imagemLink.addEventListener("click", (e) => {
        e.preventDefault();
        controladoraProdutoEmDetalhes.detalharProduto(dataIdProduto);
      });
      // imagemLink.setAttribute("href", `produto?id=${produto.id}`);
      let imagemBanco = imagemLink.appendChild(document.createElement("img"));
      imagemBanco.setAttribute(
        "src",
        `data:image/jpeg;base64,${produto.imagem}`
      );

      let cardTituloDiv = card.appendChild(document.createElement("div"));
      cardTituloDiv.setAttribute("class", "mdl-card__title nome-produto");
      let cardTitulo = cardTituloDiv.appendChild(document.createElement("h2"));
      let cardTituloLink = cardTitulo.appendChild(document.createElement("a"));
      cardTituloLink.addEventListener("click", (e) => {
        e.preventDefault();
        controladoraProdutoEmDetalhes.detalharProduto(dataIdProduto);
      });
      // cardTituloLink.setAttribute("href", `produto?id=${produto.id}`);
      cardTitulo.setAttribute("class", "mdl-card__title-text mdl-card--expand");
      cardTituloLink.append(produto.descricao);

      let cardPreco = card.appendChild(document.createElement("div"));
      cardPreco.setAttribute(
        "class",
        "mdl-card__supporting-text preco-produto"
      );
      cardPreco.append(`R$ ${produto.precoDeVenda}`);

      let cardBotaoDiv = card.appendChild(document.createElement("div"));
      cardBotaoDiv.setAttribute(
        "class",
        "mdl-card__actions mdl-card--border botao-detalhes"
      );
      // let cardLink = cardBotaoDiv.appendChild(document.createElement("a"));
      // cardLink.setAttribute("href", `produto?id=${produto.id}`);
      // cardLink.setAttribute("class", " botao-padrao");
      // cardLink.append("Detalhes");
      let cardBotao = cardBotaoDiv.appendChild(
        document.createElement("button")
      );
      cardBotao.setAttribute(
        "class",
        "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent botao-padrao"
      );
      cardBotao.setAttribute("id", "detalhes-produto_" + dataIdProduto);
      cardBotao.append("Detalhes");
      cardBotao.addEventListener("click", (e) => {
        debugger;
        console.log("qualquer merda");
        e.preventDefault();
        controladoraProdutoEmDetalhes.detalharProduto(dataIdProduto);
      });
    });
  }
}
