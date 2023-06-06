import { Produto } from "../produto/produto.js";
import { ControladoraProdutoEmTodos } from "./controladora-produto-em-todos.js";

export class VisaoProdutoEmTodos {
  montarListagemProdutos(
    produtos: Produto[],
    paginaAtual: number,
    totalPaginas: number
  ) {
    const listagemProdutos = document.querySelector(".todos-produtos");
    const controladoraProdutoEmTodos = new ControladoraProdutoEmTodos();
    const divPaginacao = document.querySelector(".paginacao");

    if (!listagemProdutos) {
      console.error(
        "Elemento com a classe 'todos-produtos' não foi encontrado."
      );
      return;
    }

    listagemProdutos.innerHTML = "";

    if (!divPaginacao) {
      console.error("Element with class 'paginacao' not found.");
      return;
    }

    divPaginacao.innerHTML = "";

    for (let pagina = 1; pagina <= totalPaginas; pagina++) {
      const botaoPagina = document.createElement("button");
      botaoPagina.setAttribute(
        "class",
        "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent botao-padrao"
      );
      botaoPagina.innerText = pagina.toString();
      botaoPagina.addEventListener("click", (e) => {
        e.preventDefault();
        controladoraProdutoEmTodos.iniciarListagem(pagina);
      });
      divPaginacao?.appendChild(botaoPagina);
    }

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
        const urlDetalhes = `http://localhost/2023-1-pis-g3/app/src/produto/produto.html?id=${dataIdProduto}`;
        window.location.href = urlDetalhes;
      });
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
        const urlDetalhes = `http://localhost/2023-1-pis-g3/app/src/produto/produto.html?id=${dataIdProduto}`;
        window.location.href = urlDetalhes;
      });
      cardTitulo.setAttribute("class", "mdl-card__title-text mdl-card--expand");
      cardTituloLink.append(produto.descricao);

      if (produto.taxaDesconto !== 0) {
        let cardPreco = card.appendChild(document.createElement("div"));
        cardPreco.setAttribute(
          "class",
          "mdl-card__supporting-text preco-produto"
        );

        let precoOriginal = document.createElement("div");
        precoOriginal.setAttribute("class", "preco-original");
        precoOriginal.append(`R$ ${produto.precoDeVenda}`);
        cardPreco.appendChild(precoOriginal);

        let precoDesconto = document.createElement("div");
        precoDesconto.setAttribute("class", "preco-desconto");
        precoDesconto.append(`R$ ${produto.precoDesconto}`);
        cardPreco.appendChild(precoDesconto);

        let taxaDesconto = document.createElement("div");
        taxaDesconto.setAttribute("class", "taxa-desconto");
        taxaDesconto.append(`${produto.taxaDesconto}% OFF`);
        cardPreco.appendChild(taxaDesconto);
      } else {
        let cardPreco = card.appendChild(document.createElement("div"));
        cardPreco.setAttribute(
          "class",
          "mdl-card__supporting-text preco-produto"
        );
        cardPreco.append(`R$ ${produto.precoDeVenda}`);
      }

      let cardBotaoDiv = card.appendChild(document.createElement("div"));
      cardBotaoDiv.setAttribute(
        "class",
        "mdl-card__actions mdl-card--border botao-detalhes"
      );
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
        e.preventDefault();
        const urlDetalhes = `http://localhost/2023-1-pis-g3/app/src/produto/produto.html?id=${dataIdProduto}`;
        window.location.href = urlDetalhes;
      });
    });
  }

  atualizarBadgeCarrinho(quantidade: number) {
    const badgeCarrinho = document.querySelector(".mdl-badge");
    badgeCarrinho!.setAttribute("data-badge", quantidade.toString());
    if (quantidade < 1) {
      badgeCarrinho!.classList.remove("mdl-badge");
    }
  }
  mostrarUsuarioLogado = () => {
    const linkLogin = document.getElementById(
      "link-login"
    ) as HTMLAnchorElement;
    linkLogin.innerText = "Logout";
    linkLogin.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("usuario");
      window.location.href =
        "http://localhost/2023-1-pis-g3/app/src/index.html";
    });
  };

  mostrarUsuarioDeslogado = () => {
    const linkLogin = document.getElementById(
      "link-login"
    ) as HTMLAnchorElement;
    linkLogin.innerText = "Login";
  };
}
