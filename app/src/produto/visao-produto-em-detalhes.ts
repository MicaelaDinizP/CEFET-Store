import { ControladoraProdutoEmDetalhes } from "./controladora-produto-em-detalhes.js";
import { Produto } from "./produto.js";

export class VisaoProdutoEmDetalhes {
  montarDetalhamento = (produto: Produto) => {
    const controladoraProdutoEmDetalhes = new ControladoraProdutoEmDetalhes();
    const detalhesProduto = document.querySelector(".produto-detalhes");
    if (detalhesProduto) {
      let quantidadeOptions = "";
      let quantidadeInput = "";

      if (produto.quantidade === 0) {
        quantidadeInput = `<p>Esgotado</p>`;
      } else {
        const quantidadeMaxima = Math.min(10, produto.quantidade);
        for (let i = 1; i <= quantidadeMaxima; i++) {
          quantidadeOptions += `<option value="${i}">${i}</option>`;
        }

        quantidadeInput = `
        <div class="mdl-textfield mdl-js-textfield quantidade-produto">
          <label for="quantidade">Quantidade:</label>
          <select class="mdl-textfield__input" id="quantidade">${quantidadeOptions}</select>
        </div>
        `;
      }

      detalhesProduto.innerHTML = `
        <div class="mdl-card demo-card-square mdl-shadow--2dp produto mdl-cell">
          <div class="mdl-card__media">
            <img src="data:image/jpeg;base64,${produto.imagem}" width="" height="" border="0" alt="">
          </div>
        </div>
        <div class="mdl-card demo-card-square mdl-shadow--2dp produto mdl-cell">
          <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">${produto.descricao}</h2>
          </div>
          <div class="mdl-card__supporting-text">
            <p>Data de lançamento: ${produto.lancamento}</p>
            <p>Preço de venda: C$ ${produto.precoDeVenda}</p>
            <p>Percentual de desconto: ${produto.taxaDesconto}%</p>
            <p>Preço com desconto: C$ ${produto.precoDesconto}</p>
            <p>Detalhes sobre o produto: ${produto.detalhes}</p>
            <p>Quantidade em estoque: ${produto.quantidade}</p>
          </div>
        </div>
        <div class="mdl-card demo-card-square mdl-shadow--2dp produto mdl-cell">
          <div class="mdl-card__actions">
          ${quantidadeInput}
          <div>     
            <a class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent botao-padrao" id="adicionar-ao-carrinho">
              Adicionar ao carrinho
            </a>
            <a class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent botao-padrao" href="http://localhost/2023-1-pis-g3/app/src/carrinho/carrinho.html">
              Ir para o carrinho
            </a>
          </div>
          </div>
        </div>
      `;
      const adicionarAoCarrinhoButton = document.getElementById(
        "adicionar-ao-carrinho"
      ) as HTMLButtonElement;
      adicionarAoCarrinhoButton.addEventListener(
        "click",
        controladoraProdutoEmDetalhes.adicionarAoCarrinho
      );
    }
  };

  atualizarBadgeCarrinho(quantidade: number) {
    const badgeCarrinho = document.querySelector(".mdl-badge");
    badgeCarrinho!.setAttribute("data-badge", quantidade.toString());
    if (quantidade < 1) {
      badgeCarrinho!.classList.remove("mdl-badge");
    }
  }
  realizarLogout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "http://localhost/2023-1-pis-g3/app/src/index.html";
  };

  mostrarUsuarioLogado = () => {
    const linkLogin = document.getElementById(
      "link-login"
    ) as HTMLAnchorElement;
    linkLogin.href = "#";
    const usuario = JSON.parse(localStorage.getItem("usuario")!);

    if (usuario) {
      linkLogin.innerText = `Olá, ${usuario.nome}!`;

      const dropdownButton = document.createElement("button");
      dropdownButton.id = "user-dropdown";
      dropdownButton.className = "mdl-button mdl-js-button mdl-button--icon";
      dropdownButton.innerHTML = `
        <i class="material-icons">arrow_drop_down</i>
      `;

      const dropdownMenu = document.createElement("ul");
      dropdownMenu.className =
        "mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect";
      dropdownMenu.setAttribute("for", "user-dropdown");
      dropdownMenu.innerHTML = `
        <li class="mdl-menu__item"><a href="http://localhost/2023-1-pis-g3/app/src/usuario/usuario.html">Sua conta</a></li>
        <li class="mdl-menu__item"><a href="#" id="logout-link">Sair</a></li>
      `;

      linkLogin.appendChild(dropdownButton);
      linkLogin.appendChild(dropdownMenu);

      const logoutLink = document.getElementById("logout-link");

      logoutLink!.addEventListener("click", (event) => {
        event.preventDefault();
        this.realizarLogout();
      });
    }
  };

  mostrarUsuarioDeslogado = () => {
    const linkLogin = document.getElementById(
      "link-login"
    ) as HTMLAnchorElement;
    linkLogin.innerText = "Login";
  };
}
