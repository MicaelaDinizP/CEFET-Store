import { ControladoraProdutoEmCarrinho } from "./controladora-produto-em-carrinho.js";

export class VisaoProdutoEmCarrinho {
  montarProdutosNoCarrinho = (produtos: Array<any>) => {
    const controladoraProdutoEmCarrinho = new ControladoraProdutoEmCarrinho();
    const mensagemCarrinhoVazio = document.getElementById(
      "mensagem-carrinho-vazio"
    );

    const carrinhoContainer = document.getElementById("produto-carrinho");

    carrinhoContainer!.innerHTML = "";

    const tabela = document.createElement("table");
    tabela.classList.add(
      "mdl-data-table",
      "mdl-js-data-table",
      "mdl-shadow--2dp"
    );

    if (produtos.length === 0) {
      mensagemCarrinhoVazio!.style.display = "block";
      tabela.style.display = "none";
    } else {
      mensagemCarrinhoVazio!.style.display = "none";
      tabela.style.display = "table";
    }

    const tableHeader = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headerFoto = document.createElement("th");
    headerFoto.classList.add("mdl-data-table__cell--non-numeric");
    headerFoto.textContent = "";
    const headerNome = document.createElement("th");
    headerNome.classList.add("mdl-data-table__cell--non-numeric");
    headerNome.textContent = "Nome do Produto";
    const headerPreco = document.createElement("th");
    headerPreco.textContent = "Preço";
    const headerQuantidade = document.createElement("th");
    headerQuantidade.textContent = "Quantidade";
    const headerExcluir = document.createElement("th");
    headerExcluir.textContent = "";
    headerRow.appendChild(headerFoto);
    headerRow.appendChild(headerNome);
    headerRow.appendChild(headerPreco);
    headerRow.appendChild(headerQuantidade);
    headerRow.appendChild(headerExcluir);
    tableHeader.appendChild(headerRow);
    tabela.appendChild(tableHeader);

    const tableBody = document.createElement("tbody");
    let subtotal = 0;

    produtos.forEach((item) => {
      const linha = document.createElement("tr");

      const celulaFotoProduto = document.createElement("td");
      const imagemProduto = document.createElement("img");
      imagemProduto.addEventListener("click", (e) => {
        e.preventDefault();
        const urlDetalhes = `http://localhost/2023-1-pis-g3/app/src/web/detalhes/produto.html?id=${item.id}`;
        window.location.href = urlDetalhes;
      });
      imagemProduto.setAttribute(
        "src",
        `data:image/jpeg;base64,${item.imagem}`
      );
      imagemProduto.setAttribute("alt", item.descricao);
      imagemProduto.setAttribute("class", "imagem-produto-carrinho");
      celulaFotoProduto.appendChild(imagemProduto);

      const celulaNomeProduto = document.createElement("td");
      celulaNomeProduto.classList.add("mdl-data-table__cell--non-numeric");
      celulaNomeProduto.textContent = item.descricao;
      celulaNomeProduto.addEventListener("click", (e) => {
        e.preventDefault();
        const urlDetalhes = `http://localhost/2023-1-pis-g3/app/src/web/detalhes/produto.html?id=${item.id}`;
        window.location.href = urlDetalhes;
      });

      const celulaPrecoProduto = document.createElement("td");
      celulaPrecoProduto.textContent = `R$ ${item.precoDeVenda}`;

      const celulaQuantidadeProduto = document.createElement("td");
      celulaQuantidadeProduto.textContent = item.quantidadeSelecionada;

      const celulaBotaoExcluir = document.createElement("td");
      const botaoExcluir = document.createElement("button");
      botaoExcluir.textContent = "Excluir";
      botaoExcluir.classList.add(
        "mdl-button",
        "mdl-js-button",
        "mdl-button--raised",
        "mdl-js-ripple-effect",
        "mdl-button--accent",
        "botao-padrao"
      );
      botaoExcluir.addEventListener("click", () => {
        controladoraProdutoEmCarrinho.removerProdutoDoCarrinho(item.id);
      });
      celulaBotaoExcluir.appendChild(botaoExcluir);

      linha.appendChild(celulaFotoProduto);
      linha.appendChild(celulaNomeProduto);
      linha.appendChild(celulaPrecoProduto);
      linha.appendChild(celulaQuantidadeProduto);
      linha.appendChild(celulaBotaoExcluir);

      subtotal += item.precoDeVenda * item.quantidadeSelecionada;

      tableBody.appendChild(linha);
    });

    tabela.appendChild(tableBody);

    const tableFooter = document.createElement("tfoot");
    const footerRow = document.createElement("tr");

    const footerCelulaVazia = document.createElement("td");
    footerCelulaVazia.setAttribute("colspan", "2");
    const footerSubtotalLabel = document.createElement("td");
    footerSubtotalLabel.textContent = "Subtotal";
    const footerSubtotalValor = document.createElement("td");
    footerSubtotalValor.textContent = `R$ ${subtotal.toFixed(2)}`;

    footerRow.appendChild(footerCelulaVazia);
    footerRow.appendChild(footerSubtotalLabel);
    footerRow.appendChild(footerSubtotalValor);

    tableFooter.appendChild(footerRow);

    tabela.appendChild(tableFooter);

    carrinhoContainer!.appendChild(tabela);

    const finalizarCompraBotao = document.getElementById(
      "botao-finalizar-compra"
    ) as HTMLButtonElement;

    if (produtos.length === 0) {
      finalizarCompraBotao!.disabled = true;
      finalizarCompraBotao!.style.display = "none";
    } else {
      finalizarCompraBotao!.disabled = false;
      finalizarCompraBotao!.style.display = "block";
    }
  };

  atualizarBadgeCarrinho(quantidade: number) {
    const badgeCarrinho = document.querySelector(".mdl-badge");
    badgeCarrinho!.setAttribute("data-badge", quantidade.toString());
    if (quantidade < 1) {
      badgeCarrinho!.classList.remove("mdl-badge");
    }
  }
}
