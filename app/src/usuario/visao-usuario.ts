import { Usuario } from "./usuario";
import { Compra } from "./compra";

export class VisaoUsuario {
  mostrarInformacoesUsuario = (usuario: Usuario) => {
    const matricula = document.getElementById("matricula");
    const nome = document.getElementById("nome-completo");
    const saldo = document.getElementById("saldo");
    console.log(usuario);
    matricula!.innerHTML = usuario.matricula;
    nome!.innerHTML = usuario.nome;
    saldo!.innerHTML = usuario.saldo.toString();
  };

  mostrarCompras = (compras: Compra[]) => {
    const tabela = document.getElementById(
      "tabela-pedidos"
    ) as HTMLTableElement;
    const tbody = tabela.querySelector("tbody");

    tbody!.innerHTML = "";

    compras.forEach((compra) => {
      const row = document.createElement("tr");

      const idCell = document.createElement("td");
      idCell.classList.add("mdl-data-table__cell--non-numeric");
      idCell.textContent = compra.id.toString();

      const dataCell = document.createElement("td");
      dataCell.textContent = compra.dataVenda;

      const valorTotalCell = document.createElement("td");
      valorTotalCell.textContent = `C$ ${compra.valorTotal.toFixed(2)}`;

      const produtosCell = document.createElement("td");
      const produtosList = document.createElement("ul");
      produtosList.classList.add("demo-list-two", "mdl-list");

      compra.produtos.forEach((produto) => {
        console.log(produto);
        const produtoItem = document.createElement("li");
        produtoItem.classList.add("mdl-list__item", "mdl-list__item--two-line");

        const primaryContent = document.createElement("span");
        primaryContent.classList.add("mdl-list__item-primary-content");

        const img = document.createElement("img");
        img.setAttribute("src", `data:image/jpeg;base64,${produto.imagem}`);
        img.classList.add("mdl-list__item-avatar");
        img.textContent = "product";

        const nome = document.createElement("span");
        nome.textContent = produto.descricao;

        const subTitulo = document.createElement("span");
        subTitulo.classList.add("mdl-list__item-sub-title");
        subTitulo.textContent = `Quantidade comprada: ${produto.quantidade}`;

        const precoDesconto = Number(produto.precoDesconto);
        const quantidade = Number(produto.quantidade);
        const subtotal = precoDesconto * quantidade;
        const preco = document.createElement("span");
        preco.classList.add("mdl-list__item-sub-title");
        preco.textContent =
          `C$ ${produto.precoDesconto}` +
          ` - Subtotal: C$ ${subtotal.toFixed(2)}`;

        primaryContent.appendChild(img);
        primaryContent.appendChild(nome);
        primaryContent.appendChild(subTitulo);
        primaryContent.appendChild(preco);

        const secondaryContent = document.createElement("span");
        secondaryContent.classList.add("mdl-list__item-secondary-content");

        const secondaryAction = document.createElement("a");
        secondaryAction.classList.add("mdl-list__item-secondary-action");
        secondaryAction.href = "#";

        const starIcon = document.createElement("i");
        starIcon.classList.add("material-icons");
        starIcon.textContent = "shopping_bag";

        secondaryAction.appendChild(starIcon);
        secondaryContent.appendChild(secondaryAction);

        produtoItem.appendChild(primaryContent);
        produtoItem.appendChild(secondaryContent);
        produtosList.appendChild(produtoItem);
      });

      produtosCell.appendChild(produtosList);

      row.appendChild(idCell);
      row.appendChild(dataCell);
      row.appendChild(valorTotalCell);
      row.appendChild(produtosCell);

      tbody!.appendChild(row);
    });
  };

  realizarLogout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "http://localhost/2023-1-pis-g3/app/src/index.html";
  };

  criarGraficoCompras = (compras: Compra[]) => {
    const valoresTotais: { [ano: string]: number } = {};
    compras.forEach((compra) => {
      const ano = compra.dataVenda.split("-")[0];
      if (valoresTotais[ano]) {
        valoresTotais[ano] += compra.valorTotal;
      } else {
        valoresTotais[ano] = compra.valorTotal;
      }
    });

    const canvas = document.getElementById(
      "grafico-compras"
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // @ts-ignore
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(valoresTotais),
          datasets: [
            {
              label: "Valor Total Comprado (C$)",
              data: Object.values(valoresTotais),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value: number) {
                  return "C$ " + value.toFixed(2);
                }
              }
            }
            // @ts-ignore
          } as Chart.ChartScales
        }
      });
    }
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

  atualizarBadgeCarrinho(quantidade: number) {
    const badgeCarrinho = document.querySelector(".mdl-badge");
    badgeCarrinho!.setAttribute("data-badge", quantidade.toString());
    if (quantidade < 1) {
      badgeCarrinho!.classList.remove("mdl-badge");
    }
  }
}
